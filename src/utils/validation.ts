import { JexlFunctionExecutionError } from '../errors';
import { CRITERIA_OPERATORS_SET } from './criteria';

export const createValidateArrayLikeValueMaxSizeFunction = (defaultMaxSize: number) => {
  return (arrayLikeValue: { length: number; }, maxSizeOverride?: number) => {
    const maxSize = maxSizeOverride ?? defaultMaxSize;

    const isSizeExceeded = arrayLikeValue.length > maxSize;

    if (isSizeExceeded) {
      throw new JexlFunctionExecutionError(`Items size exceeded. Provided ${arrayLikeValue.length}, maximum ${maxSize}`);
    }
  };
};

export const createValidateTextLengthFunction = (defaultMaxTextLength: number) => {
  return (text: string, maxTextLengthOverride?: number) => {
    const maxLength = maxTextLengthOverride ?? defaultMaxTextLength;

    if (text.length > maxLength) {
      throw new JexlFunctionExecutionError(`Argument max length exceeded. Provided ${text.length}, maximum ${maxLength}`);
    }
  };
};

export const createValidateCriteria = (maxStringCriteriaLength: number) => {
  const arrayCriteriaLength = 2;

  const validateStringCriteriaMaxLength = createValidateTextLengthFunction(maxStringCriteriaLength);
  const validateArrayCriteriaMaxLength = createValidateArrayLikeValueMaxSizeFunction(arrayCriteriaLength);

  return (criteria: unknown) => {
    if (typeof criteria !== 'string' && !Array.isArray(criteria)) {
      throw new JexlFunctionExecutionError(`Criteria must be a string or array. Provided ${typeof criteria}`);
    }

    if (typeof criteria === 'string') {
      validateStringCriteriaMaxLength(criteria);

      return;
    }

    validateArrayCriteriaMaxLength(criteria);

    const [operation] = criteria;

    if (!CRITERIA_OPERATORS_SET.has(operation)) {
      throw new JexlFunctionExecutionError('Criteria operation is invalid.');
    }
  };
};
