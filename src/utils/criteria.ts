// The order of operators is important (first two-symbol operators, than 1 symbol).
import { NotEmptyValue } from '../../types';

const CRITERIA_OPERATORS = ['>=', '<=', '<>', '=', '>', '<'];
const DEFAULT_OPERATION = '=';
const SPLIT_REGEX = new RegExp(`^(${CRITERIA_OPERATORS.join('|')})`);
const SYSTEM_CRITERIA = ['#TRUE', '#FALSE', '#UNDEFINED', '#NULL', '#EMPTY', '#NOT_EMPTY', '#BLANK', '#NOT_BLANK'];

export interface IOperationParseResult {
  operator: string;
  rightOperand: string | number;
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

const coerceOperand = (operand: string) => {
  const coerced = Number(operand);

  return Number.isNaN(coerced) ? operand : coerced;
};

export const parseCriteriaExpression = (expression: string): ICriteriaParseResult => {
  if (isSystemCriteria(expression)) {
    return {
      systemCriteria: expression,
    };
  }

  const tokens = expression
    .split(SPLIT_REGEX)
    .filter((token) => !!token);

  const [operation = '', operand = ''] = tokens;

  const isOperationExists = CRITERIA_OPERATORS.includes(operation);

  return {
    operator: isOperationExists ? operation : DEFAULT_OPERATION,
    rightOperand: coerceOperand(isOperationExists ? operand.trimStart() : expression.trimStart()),
  };
};

const evalOperationParseResult = (parseResult: IOperationParseResult, leftOperand: unknown) => {
  if (leftOperand === null || leftOperand === undefined) {
    return false;
  }

  const typedLeftOperand = leftOperand as NotEmptyValue;

  switch (parseResult.operator) {
    case '>=': {
      return typedLeftOperand >= parseResult.rightOperand;
    }
    case '<=': {
      return typedLeftOperand <= parseResult.rightOperand;
    }
    case '<>': {
      return leftOperand !== parseResult.rightOperand;
    }
    case '=': {
      return leftOperand === parseResult.rightOperand;
    }
    case '>': {
      return typedLeftOperand > parseResult.rightOperand;
    }
    case '<': {
      return typedLeftOperand < parseResult.rightOperand;
    }
    default: {
      return leftOperand === parseResult.rightOperand;
    }
  }
}

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
