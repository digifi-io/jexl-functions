import { ExecutionError } from '@digifi/jexl';
import { NotEmptyValue } from '../../types';
import { createModule } from '../utils/module';
import createInformationModule from './information';

export default createModule(({ validateArrayMaxSize }, options) => {
  const { ISDATESTRING, ISEMPTY } = createInformationModule();

  const AND = (...args: unknown[]) => {
    validateArrayMaxSize(args);

    return args.every((arg) => !!arg);
  };

  const OR = (...args: unknown[]) => {
    validateArrayMaxSize(args);

    return args.some((arg) => !!arg);
  };

  const XOR = (...args: unknown[]) => {
    validateArrayMaxSize(args);

    const passedCount = args.reduce((previousPassedCount: number, arg) => {
      return !!arg ? previousPassedCount + 1 : previousPassedCount;
    }, 0);

    return !!(Math.floor(Math.abs(passedCount)) & 1);
  };

  const IF = (condition: unknown, thenValue: unknown, elseValue: unknown) => {
    return condition ? thenValue : elseValue;
  };

  const NOT = (logical: unknown) => {
    return !logical;
  };

  const IFS = (...args: unknown[]) => {
    validateArrayMaxSize(args, options.defaultMaxArraySize * 2);

    for (let i = 0; i < args.length / 2; i++) {
      if (args[i * 2]) {
        return args[i * 2 + 1];
      }
    }

    throw new ExecutionError('Condition parameter is not defined');
  };

  const TRUE = () => {
    return true;
  };

  const FALSE = () => {
    return false;
  };

  const SWITCH = (value: unknown, ...args: unknown[]) => {
    validateArrayMaxSize(args, options.defaultMaxArraySize * 2);

    const switchCount = args.length % 2;
    const defaultCase = switchCount === 0 ? null : args[args.length - 1];

    for (let i = 0; i < switchCount; i++) {
      if (value === args[i * 2 + 1]) {
        return args[i * 2 + 2];
      }
    }

    return defaultCase;
  };

  const GT = (value: unknown, compareTo: unknown) => {
    if (ISEMPTY(compareTo) || ISEMPTY(value)) {
      return false;
    }

    if (ISDATESTRING(compareTo)) {
      compareTo = Date.parse(compareTo);
    }

    if (ISDATESTRING(value)) {
      value = Date.parse(value);
    }

    const typedValue = value as NotEmptyValue;
    const typedCompareTo = compareTo as NotEmptyValue;

    return typedValue > typedCompareTo;
  };

  const LT = (value: unknown, compareTo: unknown) => {
    if (ISEMPTY(compareTo) || ISEMPTY(value)) {
      return false;
    }

    if (ISDATESTRING(compareTo)) {
      compareTo = Date.parse(compareTo);
    }

    if (ISDATESTRING(value)) {
      value = Date.parse(value);
    }

    const typedValue = value as NotEmptyValue;
    const typedCompareTo = compareTo as NotEmptyValue;

    return typedValue < typedCompareTo;
  };

  const LTE = (value: unknown, compareTo: unknown) => {
    if (ISEMPTY(compareTo) || ISEMPTY(value)) {
      return false;
    }

    if (ISDATESTRING(compareTo)) {
      compareTo = Date.parse(compareTo);
    }

    if (ISDATESTRING(value)) {
      value = Date.parse(value);
    }

    if (compareTo !== 0 && !compareTo) {
      return true;
    }

    const typedValue = value as NotEmptyValue;
    const typedCompareTo = compareTo as NotEmptyValue;

    return typedValue <= typedCompareTo;
  };

  const GTE = (value: unknown, compareTo: unknown) => {
    if (ISEMPTY(compareTo) || ISEMPTY(value)) {
      return false;
    }

    if (ISDATESTRING(compareTo)) {
      compareTo = Date.parse(compareTo);
    }

    if (ISDATESTRING(value)) {
      value = Date.parse(value);
    }

    if (value !== 0 && !value) {
      return false;
    }

    const typedValue = value as NotEmptyValue;
    const typedCompareTo = compareTo as NotEmptyValue;

    return typedValue >= typedCompareTo;
  };

  const RANGE = (value: unknown, min: unknown, max: unknown) => {
    if (ISEMPTY(min) || ISEMPTY(max) || ISEMPTY(value)) {
      return false;
    }

    if (ISDATESTRING(min)) {
      min = Date.parse(min);
    }

    if (ISDATESTRING(max)) {
      max = Date.parse(max);
    }

    if (ISDATESTRING(value)) {
      value = Date.parse(value);
    }

    if (value !== 0 && !value) {
      return false;
    }

    const typedValue = value as NotEmptyValue;
    const typedMin = min as NotEmptyValue;
    const typedMax = max as NotEmptyValue;

    if (typedMin > typedMax) {
      return typedValue <= typedMin && typedValue >= typedMax;
    }

    return typedValue >= typedMin && typedValue <= typedMax;
  };

  const EQUAL = (value: unknown, compareTo: unknown) => {
    if (ISDATESTRING(compareTo)) {
      compareTo = Date.parse(compareTo);
    }

    if (ISDATESTRING(value)) {
      value = Date.parse(value);
    }

    return value === compareTo;
  };

  const INCLUDES = (value: unknown, includesSet: unknown[]) => {
    validateArrayMaxSize(includesSet);

    return includesSet.includes(value);
  };

  const NOTEQUAL = (value: unknown, compareTo: unknown) => {
    return !EQUAL(value, compareTo);
  };

  const NINCLUDES = (value: unknown, notIncludesSet: unknown[]) => {
    validateArrayMaxSize(notIncludesSet);

    return !INCLUDES(value, notIncludesSet);
  };

  return {
    AND,
    OR,
    XOR,
    IF,
    NOT,
    IFS,
    TRUE,
    FALSE,
    SWITCH,
    GTE,
    LTE,
    LT,
    GT,
    EQUAL,
    NOTEQUAL,
    NINCLUDES,
    INCLUDES,
    RANGE,
  };
});
