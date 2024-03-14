// The order of operators is important (first two-symbol operators, than 1 symbol).
import { NotEmptyValue } from '../../types';

const CRITERIA_OPERATORS = ['>=', '<=', '<>', '=', '>', '<'];
export const CRITERIA_OPERATORS_SET = new Set(CRITERIA_OPERATORS);
const DEFAULT_OPERATION = '=';
const SPLIT_REGEX = new RegExp(`^(${CRITERIA_OPERATORS.join('|')})`);
const SYSTEM_CRITERIA = ['#TRUE', '#FALSE', '#UNDEFINED', '#NULL', '#EMPTY', '#NOT_EMPTY', '#BLANK', '#NOT_BLANK'];

export type ICriteria = string | [string, unknown];

export interface IOperationParseResult {
  operator: string;
  rightOperand: unknown;
  disableCoercing?: boolean;
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

export const parseCriteriaExpression = (criteria: ICriteria): ICriteriaParseResult => {
  if (Array.isArray(criteria)) {
    const [operator, rightOperand] = criteria;

    return {
      operator,
      rightOperand,
      disableCoercing: true,
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
  };
};

const evalOperationParseResult = (parseResult: IOperationParseResult, leftOperand: unknown) => {
  if (leftOperand === null || leftOperand === undefined) {
    return false;
  }

  const coercedRightOperand = (parseResult.disableCoercing || typeof leftOperand !== 'number'
    ? parseResult.rightOperand
    : coerceOperandToNumber(parseResult.rightOperand)) as NotEmptyValue;

  const typedLeftOperand = leftOperand as NotEmptyValue;

  switch (parseResult.operator) {
    case '>=': {
      return typedLeftOperand >= coercedRightOperand;
    }
    case '<=': {
      return typedLeftOperand <= coercedRightOperand;
    }
    case '<>': {
      return leftOperand !== coercedRightOperand;
    }
    case '=': {
      return leftOperand === coercedRightOperand;
    }
    case '>': {
      return typedLeftOperand > coercedRightOperand;
    }
    case '<': {
      return typedLeftOperand < coercedRightOperand;
    }
    default: {
      return leftOperand === coercedRightOperand;
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
