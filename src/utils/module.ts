import {
  createValidateTextLengthFunction,
  createValidateArrayMaxSizeFunction,
  createValidateCriteria,
} from './validation';
import { createSaveFlattenFunction } from './array';
import { evalCriteriaParseResult, parseCriteriaExpression } from './criteria';
import { coerceToString, coerceToNumber, coerceNullableArrayToArray } from './coerceUtils';

export interface ModuleUtils {
  validateTextLength: ReturnType<typeof createValidateTextLengthFunction>;
  validateArrayMaxSize: ReturnType<typeof createValidateArrayMaxSizeFunction>;
  safeFlatten: ReturnType<typeof createSaveFlattenFunction>;
  validateCriteria: ReturnType<typeof createValidateCriteria>;
  evalCriteriaParseResult: typeof evalCriteriaParseResult;
  parseCriteriaExpression: typeof parseCriteriaExpression;
  coerceToNumber: typeof coerceToNumber;
  coerceToString: typeof coerceToString;
  coerceToStringWithValidation: (text: unknown, maxTextLengthOverride?: number) => string;
  coerceToArray: typeof coerceNullableArrayToArray;
}

export interface IBaseCreateModuleOptions {
  defaultMaxTextLength: number;
  defaultMaxArraySize: number;
  defaultMaxCriteriaLength: number;
}

const DEFAULT_BASE_CREATE_MODULE_OPTIONS: IBaseCreateModuleOptions = {
  defaultMaxTextLength: 10000,
  defaultMaxArraySize: 200,
  defaultMaxCriteriaLength: 255,
};

export function createModule<ReturnType>(
  callback: (utils: ModuleUtils, currentOptions: IBaseCreateModuleOptions) => ReturnType,
): (options?: Partial<IBaseCreateModuleOptions>) => ReturnType;

export function createModule<ModuleOptions, ReturnType>(
  callback: (utils: ModuleUtils, currentOptions: IBaseCreateModuleOptions & ModuleOptions) => ReturnType,
  defaultOptions: ModuleOptions & Partial<IBaseCreateModuleOptions>,
): (options?: Partial<IBaseCreateModuleOptions & ModuleOptions>) => ReturnType;

export function createModule<ReturnType>(
  callback: (utils: ModuleUtils, currentOptions: IBaseCreateModuleOptions) => ReturnType,
  defaultOptions?: Partial<IBaseCreateModuleOptions>,
) {
  return (options?: Partial<IBaseCreateModuleOptions>) => {
    const currentOptions = {
      ...DEFAULT_BASE_CREATE_MODULE_OPTIONS,
      ...(defaultOptions || {}),
      ...(options || {}),
    };

    const validateTextLength = createValidateTextLengthFunction(currentOptions.defaultMaxTextLength);
    const validateArrayMaxSize = createValidateArrayMaxSizeFunction(currentOptions.defaultMaxArraySize);
    const safeFlatten = createSaveFlattenFunction(currentOptions.defaultMaxArraySize);
    const validateCriteria = createValidateCriteria(currentOptions.defaultMaxCriteriaLength);

    const coerceToStringWithValidation = (text: unknown, maxTextLengthOverride?: number) => {
      const coercedValue = coerceToString(text);

      validateTextLength(coercedValue, maxTextLengthOverride);

      return coercedValue;
    };

    return callback({
      validateTextLength,
      validateArrayMaxSize,
      safeFlatten,
      validateCriteria,
      coerceToStringWithValidation,
      evalCriteriaParseResult,
      parseCriteriaExpression,
      coerceToNumber,
      coerceToString,
      coerceToArray: coerceNullableArrayToArray,
    }, currentOptions);
  };
}
