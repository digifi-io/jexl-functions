// The order of operators is important (first two-symbol operators, than 1 symbol).
import { NotEmptyValue } from '../../types';
import dayjs from '../dayjs';

const CRITERIA_OPERATORS = ['>=', '<=', '<>', '=', '>', '<'];
const CRITERIA_OPERATORS_WITH_NULLISH_VALUE_CHECK = ['<>'];
export const CRITERIA_OPERATORS_SET = new Set(CRITERIA_OPERATORS);
const DEFAULT_OPERATION = '=';
const SPLIT_REGEX = new RegExp(`^(${CRITERIA_OPERATORS.join('|')})`);
const SYSTEM_CRITERIA = ['#TRUE', '#FALSE', '#UNDEFINED', '#NULL', '#EMPTY', '#NOT_EMPTY', '#BLANK', '#NOT_BLANK'];

export interface ICriteriaOptions {
  date_value?: boolean;
  date_format?: string;
}

export type ICriteria = string | [string, unknown, ICriteriaOptions?];

export interface IOperationParseResult {
  operator: string;
  rightOperand: unknown;
  disableRightOperandToNumberCoercing?: boolean;
  nullishValuesComparable?: boolean;
  criteriaOptions?: ICriteriaOptions;
}

export interface ISystemCriteriaParseResult {
  systemCriteria: string;
}

export type ICriteriaParseResult = IOperationParseResult | ISystemCriteriaParseResult;

const isSystemCriteria = (criteria: string) => {
  return SYSTEM_CRITERIA.includes(criteria);
};

const isSystemCriteriaParseResult = (result: ICriteriaParseResult): result is ISystemCriteriaParseResult => {
  return !!(result as ISystemCriteriaParseResult).systemCriteria;
};

const coerceOperandToNumber = (operand: unknown) => {
  const coerced = Number(operand);

  return Number.isNaN(coerced) ? operand : coerced;
};

const coerceDateOperandToComparable = (operand: unknown, format?: string) => {
  if (operand === undefined || operand === null) {
    return operand;
  }

  if (typeof operand === 'string' && operand.trim() === '') {
    return null;
  }

  const dateObject = format && typeof operand === 'string'
    ? dayjs(operand, format, true)
    : dayjs(operand as Parameters<typeof dayjs>[0]);

  return dateObject.isValid() ? dateObject.valueOf() : operand;
};

const coerceOperandForCompare = (
  operand: unknown,
  criteriaOptions?: ICriteriaOptions,
  disableToNumberCoercing?: boolean,
) => {
  if (criteriaOptions?.date_value) {
    return coerceDateOperandToComparable(operand, criteriaOptions.date_format);
  }

  return disableToNumberCoercing ? operand : coerceOperandToNumber(operand);
};

export const parseCriteriaExpression = (criteria: ICriteria): ICriteriaParseResult => {
  if (Array.isArray(criteria)) {
    const [operator, rightOperand, criteriaOptions] = criteria;

    return {
      operator,
      rightOperand,
      disableRightOperandToNumberCoercing: true,
      nullishValuesComparable: CRITERIA_OPERATORS_WITH_NULLISH_VALUE_CHECK.includes(operator),
      criteriaOptions,
    };
  }

  if (isSystemCriteria(criteria)) {
    return {
      systemCriteria: criteria as string,
    };
  }

  const tokens = criteria
    .split(SPLIT_REGEX)
    .filter((token) => !!token);

  const [operation = '', operand = ''] = tokens;

  const isOperationExists = CRITERIA_OPERATORS_SET.has(operation);

  return {
    operator: isOperationExists ? operation : DEFAULT_OPERATION,
    rightOperand: isOperationExists ? operand.trimStart() : criteria.trimStart(),
    nullishValuesComparable: CRITERIA_OPERATORS_WITH_NULLISH_VALUE_CHECK.includes(operation),
  };
};

const evalOperationParseResult = (parseResult: IOperationParseResult, leftOperand: unknown) => {
  if (!parseResult.nullishValuesComparable && (leftOperand === null || leftOperand === undefined)) {
    return false;
  }

  const disableLeftOperandToNumberCoercing = true;

  const coercedLeftOperand = coerceOperandForCompare(
    leftOperand,
    parseResult.criteriaOptions,
    disableLeftOperandToNumberCoercing,
  );

  const coercedRightOperand = coerceOperandForCompare(
    parseResult.rightOperand,
    parseResult.criteriaOptions,
    parseResult.disableRightOperandToNumberCoercing || typeof leftOperand !== 'number',
  );

  const typedLeftOperand = coercedLeftOperand as NotEmptyValue;
  const typedRightOperand = coercedRightOperand as NotEmptyValue;

  switch (parseResult.operator) {
    case '>=': {
      return typedLeftOperand >= typedRightOperand;
    }
    case '<=': {
      return typedLeftOperand <= typedRightOperand;
    }
    case '<>': {
      return typedLeftOperand !== typedRightOperand;
    }
    case '=': {
      return typedLeftOperand === typedRightOperand;
    }
    case '>': {
      return typedLeftOperand > typedRightOperand;
    }
    case '<': {
      return typedLeftOperand < typedRightOperand;
    }
    default: {
      return typedLeftOperand === typedRightOperand;
    }
  }
};

const evalSystemCriteriaParseResult = (parseResult: ISystemCriteriaParseResult, leftOperand: unknown) => {
  switch (parseResult.systemCriteria) {
    case '#TRUE': {
      return leftOperand === true;
    }
    case '#FALSE': {
      return leftOperand === false;
    }
    case '#UNDEFINED': {
      return leftOperand === undefined;
    }
    case '#NULL': {
      return leftOperand === null;
    }
    case '#EMPTY': {
      return leftOperand === null || leftOperand === undefined || leftOperand === '';
    }
    case '#NOT_EMPTY': {
      return leftOperand !== null && leftOperand !== undefined && leftOperand !== '';
    }
    case '#BLANK': {
      return leftOperand === '';
    }
    case '#NOT_BLANK': {
      return leftOperand !== '';
    }
    default: {
      return false;
    }
  }
};

export const evalCriteriaParseResult = (parseResult: ICriteriaParseResult, leftOperand: unknown) => {
  if (isSystemCriteriaParseResult(parseResult)) {
    return evalSystemCriteriaParseResult(parseResult, leftOperand);
  }

  return isSystemCriteriaParseResult(parseResult)
    ? evalSystemCriteriaParseResult(parseResult, leftOperand)
    : evalOperationParseResult(parseResult, leftOperand);
};
