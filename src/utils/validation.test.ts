import {
  createValidateArrayLikeValueMaxSizeFunction,
  createValidateCriteria,
  createValidateTextLengthFunction,
} from './validation';
import { JexlFunctionExecutionError } from '../errors';

describe('Validation', () => {
  const mockArray = [1, 2, 3];

  describe('createValidateArrayMaxSizeFunction function', () => {
    const defaultMaxSize = 10;
    const validateArrayMaxSizeFunction = createValidateArrayLikeValueMaxSizeFunction(defaultMaxSize);

    test('should not throw error when array length is within defaultMaxSize', () => {
      expect(() => validateArrayMaxSizeFunction(mockArray)).not.toThrow();
    });

    test('should not throw error when array length is equal to defaultMaxSize', () => {
      const largeArray = new Array(defaultMaxSize).fill(0);
      expect(() => validateArrayMaxSizeFunction(largeArray)).not.toThrow();
    });

    test('should throw error when array length exceeds defaultMaxSize', () => {
      const largeArray = new Array(defaultMaxSize + 1).fill(0);
      expect(() => validateArrayMaxSizeFunction(largeArray)).toThrow(
        new JexlFunctionExecutionError(`Items size exceeded. Provided ${defaultMaxSize + 1}, maximum ${defaultMaxSize}`)
      );
    });

    test('should use maxSizeOverride if provided', () => {
      const maxSizeOverride = 2;
      const validateArrayMaxSizeFunctionWithOverride = createValidateArrayLikeValueMaxSizeFunction(defaultMaxSize);
      expect(() => validateArrayMaxSizeFunctionWithOverride(mockArray, maxSizeOverride)).toThrow(
        new JexlFunctionExecutionError(`Items size exceeded. Provided ${mockArray.length}, maximum ${maxSizeOverride}`)
      );
    });
  });

  describe('createValidateTextLengthFunction function', () => {
    const defaultMaxTextLength = 10;
    const validateTextLengthFunction = createValidateTextLengthFunction(defaultMaxTextLength);

    test('should not throw error when text length is within defaultMaxTextLength', () => {
      const text = '123456';
      expect(() => validateTextLengthFunction(text)).not.toThrow();
    });

    test('should not throw error when text length is equal to defaultMaxTextLength', () => {
      const text = '1234567890';
      expect(() => validateTextLengthFunction(text)).not.toThrow();
    });

    test('should throw error when text length exceeds defaultMaxTextLength', () => {
      const text = '12345678901';
      expect(() => validateTextLengthFunction(text)).toThrow(
        new JexlFunctionExecutionError(`Argument max length exceeded. Provided ${text.length}, maximum ${defaultMaxTextLength}`)
      );
    });

    test('should use maxTextLengthOverride if provided', () => {
      const maxTextLengthOverride = 5;
      const validateTextLengthFunctionWithOverride = createValidateTextLengthFunction(defaultMaxTextLength);
      expect(() => validateTextLengthFunctionWithOverride('12345678901', maxTextLengthOverride)).toThrow(
        new JexlFunctionExecutionError(`Argument max length exceeded. Provided 11, maximum ${maxTextLengthOverride}`)
      );
    });
  });

  describe('createValidateCriteria function', () => {
    const maxStringCriteriaLength = 10;
    const validateCriteriaFunction = createValidateCriteria(maxStringCriteriaLength);

    test('should not throw error when criteria is a string within maxStringCriteriaLength', () => {
      const criteria = 'criteria';
      expect(() => validateCriteriaFunction(criteria)).not.toThrow();
    });

    test('should not throw error when criteria is a string equal to maxStringCriteriaLength', () => {
      const criteria = '1234567890';
      expect(() => validateCriteriaFunction(criteria)).not.toThrow();
    });

    test('should throw error when criteria is a string exceeding maxStringCriteriaLength', () => {
      const criteria = '12345678901';
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError(`Argument max length exceeded. Provided ${criteria.length}, maximum ${maxStringCriteriaLength}`)
      );
    });

    test('should throw error when criteria is neither string nor array', () => {
      const criteria = 123; // not a string or array
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError(`Criteria must be a string or array. Provided number`)
      );
    });

    test('should throw error when criteria array length exceeds 3', () => {
      const criteria = ['operation', 'value', { date_value: true }, 'extra']; // array length exceeds 3
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError(`Items size exceeded. Provided 4, maximum 3`)
      );
    });

    test('should throw error when criteria operation is invalid', () => {
      const criteria = ['invalid_operation', 'value']; // invalid operation
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError('Criteria operation is invalid.')
      );
    });

    test('should not throw error when criteria array length is 2 and operations are valid', () => {
      const criteria = ['>', '<']; // valid operation
      expect(() => validateCriteriaFunction(criteria)).not.toThrow();
    });

    test('should not throw error when criteria options are valid', () => {
      const criteria = ['>', '2026-03-19', { date_value: true, date_format: 'YYYY-MM-DD' }];
      expect(() => validateCriteriaFunction(criteria)).not.toThrow();
    });

    test('should throw error when criteria options are invalid', () => {
      const criteria = ['>', '2026-03-19', 'not-an-object'];
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError('Criteria options should be an object.')
      );
    });

    test('should throw error when "date_value" option is not a boolean', () => {
      const criteria = ['>', '2026-03-19', { date_value: 'true' }];
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError('Criteria option "date_value" should be a boolean.')
      );
    });

    test('should throw error when "date_format" option is not a string', () => {
      const criteria = ['>', '2026-03-19', { date_format: 20260319 }];
      expect(() => validateCriteriaFunction(criteria)).toThrow(
        new JexlFunctionExecutionError('Criteria option "date_format" should be a string.')
      );
    });
  });
});
