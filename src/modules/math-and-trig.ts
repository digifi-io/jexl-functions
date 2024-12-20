import BigNumber from 'bignumber.js';
import { JexlFunctionExecutionError } from '../errors';
import { createModule } from '../utils/module';
import { ICriteria } from '../utils/criteria';

export default createModule(({
  safeFlatten,
  coerceToNumber,
  validateArrayLikeValueMaxSize,
  evalCriteriaParseResult,
  parseCriteriaExpression,
  validateCriteria,
}, { defaultMaxArraySize }) => {
  const QUOTIENT = (numerator: unknown, denominator: unknown) => {
    return Math.floor(coerceToNumber(numerator) / coerceToNumber(denominator));
  };

  const RADIANS = (value: unknown) => {
    return (coerceToNumber(value) * Math.PI) / 180;
  };

  const UNFLATTENPRODUCT = (...args: unknown[]) => {
    validateArrayLikeValueMaxSize(args);

    return args.reduce((product: number, arg) => product * coerceToNumber(arg), 1);
  };

  const PRODUCT = (...args: unknown[]) => {
    return UNFLATTENPRODUCT(...safeFlatten(args));
  };

  const ROUNDDOWN = (value: unknown, digits: unknown) => {
    const coercedValue = coerceToNumber(value);
    const coercedDigits = coerceToNumber(digits);
    const sign = coercedValue > 0 ? 1 : -1;

    return (sign * Math.floor(Math.abs(coercedValue) * Math.pow(10, coercedDigits))) / Math.pow(10, coercedDigits);
  };

  const ROUNDUP = (value: unknown, digits: unknown) => {
    const coercedValue = coerceToNumber(value);
    const coercedDigits = coerceToNumber(digits);

    const sign = coercedValue > 0 ? 1 : -1;

    return (sign * Math.ceil(Math.abs(coercedValue) * Math.pow(10, coercedDigits))) / Math.pow(10, coercedDigits);
  };

  const SEC = (value: unknown) => {
    return 1 / Math.cos(coerceToNumber(value));
  };

  const SECH = (value: unknown) => {
    const coercedValue = coerceToNumber(value);

    return 2 / (Math.exp(coercedValue) + Math.exp(-coercedValue));
  };

  const SIN = (value: unknown) => {
    return Math.sin(coerceToNumber(value));
  };

  const SINH = (value: unknown) => {
    const coercedValue = coerceToNumber(value);

    return (Math.exp(coercedValue) - Math.exp(-coercedValue)) / 2;
  };

  const SQRT = (value: unknown) => {
    return Math.sqrt(coerceToNumber(value));
  };

  const SQRTPI = (value: unknown) => {
    return Math.sqrt(coerceToNumber(value) * Math.PI);
  };

  const TAN = (value: unknown) => {
    return Math.tan(coerceToNumber(value));
  };

  const TANH = (value: unknown) => {
    const exp = Math.exp(2 * coerceToNumber(value));

    return (exp - 1) / (exp + 1);
  };

  const TRUNC = (value: unknown, digits: unknown) => {
    const coercedValue = coerceToNumber(value);
    const coercedDigits = coerceToNumber(digits);

    const factor = new BigNumber(10).pow(coercedDigits);

    /**
     * [TODO] Rewrite to toLocaleString('en-US', {
     *    minimumFractionDigits: 2,
     *    maximumFractionDigits: 2,
     *    useGrouping: false,
     *    roundingMode: "trunc"
     * }); after we will migrate to node.js 20
     */

    return BigNumber(coercedValue)
      .multipliedBy(factor)
      .integerValue(BigNumber.ROUND_DOWN)
      .dividedBy(factor)
      .toNumber();
  };

  const SUM = (...args: unknown[]) => {
    return safeFlatten(args).reduce((previousValue: number, arg) => {
      return previousValue + coerceToNumber(arg);
    }, 0);
  };

  const SUMSQ = (...args: unknown[]) => {
    return safeFlatten(args).reduce((previousValue: number, arg) => {
      const coercedArg = coerceToNumber(arg);

      return previousValue + (coercedArg * coercedArg);
    }, 0);
  };

  const SUMX2MY2 = (firstArray: unknown, secondArray: unknown) => {
    const transformedFirstArray = Array.isArray(firstArray) ? firstArray : [firstArray];
    const transformedSecondArray = Array.isArray(secondArray) ? secondArray : [secondArray];

    validateArrayLikeValueMaxSize(transformedFirstArray);
    validateArrayLikeValueMaxSize(transformedSecondArray);

    return transformedFirstArray.reduce((previousValue: number, arg, index) => {
      const coercedArg = coerceToNumber(arg);
      const coercedSecondArg = coerceToNumber(transformedSecondArray[index]);

      return previousValue + (coercedArg * coercedArg - coercedSecondArg * coercedSecondArg);
    }, 0);
  };

  const SUMX2PY2 = (firstArray: unknown, secondArray: unknown) => {
    const transformedFirstArray = Array.isArray(firstArray) ? firstArray : [firstArray];
    const transformedSecondArray = Array.isArray(secondArray) ? secondArray : [secondArray];

    validateArrayLikeValueMaxSize(transformedFirstArray);
    validateArrayLikeValueMaxSize(transformedSecondArray);

    return transformedFirstArray.reduce((previousValue: number, arg, index) => {
      const coercedArg = coerceToNumber(arg);
      const coercedSecondArg = coerceToNumber(transformedSecondArray[index]);

      return previousValue + (coercedArg * coercedArg + coercedSecondArg * coercedSecondArg);
    }, 0);
  };

  const SUMXMY2 = (firstArray: unknown, secondArray: unknown) => {
    const transformedFirstArray = Array.isArray(firstArray) ? firstArray : [firstArray];
    const transformedSecondArray = Array.isArray(secondArray) ? secondArray : [secondArray];

    validateArrayLikeValueMaxSize(transformedFirstArray);
    validateArrayLikeValueMaxSize(transformedSecondArray);

    return transformedFirstArray.reduce((previousValue: number, arg, index) => {
      const coercedArg = coerceToNumber(arg);
      const coercedSecondArg = coerceToNumber(transformedSecondArray[index]);

      return previousValue + Math.pow(coercedArg - coercedSecondArg, 2);
    }, 0);
  };

  const SUMIF = (range: unknown[], criteria: unknown, sumRange?: unknown[]) => {
    const flattenRange = safeFlatten(range);
    const flattenSumRange = sumRange ? safeFlatten(sumRange) : flattenRange;

    validateCriteria(criteria);

    const parseResult = parseCriteriaExpression(criteria as ICriteria);

    return flattenRange.reduce((result: number, valueInRange, index) => {
      const evaluationResult = evalCriteriaParseResult(parseResult, valueInRange);

      return evaluationResult
        ? result + coerceToNumber(flattenSumRange[index])
        : result;
    }, 0);
  };

  const ABS = (value: unknown) => {
    return Math.abs(coerceToNumber(value));
  };

  const ACOS = (value: unknown) => {
    return Math.acos(coerceToNumber(value));
  };

  const ACOSH = (value: unknown) => {
    return Math.acosh(coerceToNumber(value));
  };

  const ACOT = (value: unknown) => {
    return Math.atan(1 / coerceToNumber(value));
  };

  const ACOTH = (value: unknown) => {
    const coercedValue = coerceToNumber(value);

    return 0.5 * Math.log((coercedValue + 1) / (coercedValue - 1));
  };

  const ASIN = (value: unknown) => {
    return Math.asin(coerceToNumber(value));
  };

  const ASINH = (value: unknown) => {
    return Math.asinh(coerceToNumber(value));
  };

  const ATAN = (value: unknown) => {
    return Math.atan(coerceToNumber(value));
  };

  const ATAN2 = (firstValue: unknown, secondValue: unknown) => {
    return Math.atan2(coerceToNumber(firstValue), coerceToNumber(secondValue));
  };

  const ATANH = (value: unknown) => {
    return Math.atanh(coerceToNumber(value));
  };

  const COS = (value: unknown) => {
    return Math.cos(coerceToNumber(value));
  };

  const COSH = (value: unknown) => {
    return Math.cosh(coerceToNumber(value));
  };

  const COT = (value: unknown) => {
    return 1 / Math.tan(coerceToNumber(value));
  };

  const COTH = (value: unknown) => {
    const coercedValue = coerceToNumber(value);

    return (Math.exp(2 * coercedValue) + 1) / (Math.exp(2 * coercedValue) - 1);
  };

  const CSC = (value: unknown) => {
    return 1 / Math.sin(coerceToNumber(value));
  };

  const CSCH = (value: unknown) => {
    const coercedValue = coerceToNumber(value);

    return 2 / (Math.exp(coercedValue) - Math.exp(-coercedValue));
  };

  const E = () => {
    return Math.E;
  };

  const EVEN = (value: unknown) => {
    const flooredValue = Math.floor(coerceToNumber(value));

    const isEvenFlooredValue = flooredValue % 2 === 0;

    if (value === flooredValue && isEvenFlooredValue) {
      return value;
    }

    return isEvenFlooredValue ? flooredValue + 2 : flooredValue + 1;
  };

  const EXP = (value: unknown) => {
    return Math.exp(coerceToNumber(value));
  };

  const LN = (value: unknown) => {
    return Math.log(coerceToNumber(value));
  };

  const LOG = (value: unknown, base: unknown) => {
    return Math.log(coerceToNumber(value)) / Math.log(coerceToNumber(base));
  };

  const MOD = (value: unknown, divisor: unknown) => {
    const coercedValue = coerceToNumber(value);
    const coercedDivisor = coerceToNumber(divisor);

    const modulus = Math.abs(coercedValue % coercedDivisor);
    const result = coercedValue < 0 ? coercedDivisor - modulus : modulus;

    return coercedDivisor > 0 ? result : -result;
  };

  const ODD = (value: unknown) => {
    const coercedValue = coerceToNumber(value);

    const ceilledValue = Math.ceil(Math.abs(coercedValue));

    const result = ceilledValue & 1 ? ceilledValue : ceilledValue + 1;

    return coercedValue >= 0 ? result : -result;
  };

  const PI = () => {
    return Math.PI;
  };

  const POWER = (value: unknown, power: unknown) => {
    return Math.pow(coerceToNumber(value), coerceToNumber(power));
  };

  const RAND = () => {
    return Math.random();
  };

  const RANDBETWEEN = (bottom: unknown, top: unknown) => {
    const coercedBottom = coerceToNumber(bottom);
    const coercedTop = coerceToNumber(top);

    return coercedBottom + Math.ceil((coercedTop - coercedBottom + 1) * Math.random()) - 1;
  };

  const ROUND = (value: unknown, digits: unknown) => {
    const coercedValue = coerceToNumber(value);
    const coercedDigits = coerceToNumber(digits);

    return Math.round(coercedValue * Math.pow(10, coercedDigits)) / Math.pow(10, coercedDigits);
  };

  const BASE = (value: unknown, radix: unknown, minLength: unknown) => {
    const coercedValue = coerceToNumber(value);
    const coercedRadix = coerceToNumber(radix);
    const coercedMinLength = coerceToNumber(minLength);

    const valueInString = coercedValue.toString(coercedRadix);

    const digitsToAdd = coercedMinLength + 1 - valueInString.length;

    if (digitsToAdd > defaultMaxArraySize) {
      throw new JexlFunctionExecutionError(`Min length should be less or equal than: ${coercedMinLength - 1 + valueInString.length}`);
    }

    return new Array(Math.max(coercedMinLength + 1 - valueInString.length, 0)).join('0') + valueInString;
  };

  return {
    QUOTIENT,
    RADIANS,
    PRODUCT,
    ROUNDDOWN,
    ROUNDUP,
    SEC,
    SECH,
    SIN,
    SINH,
    SQRT,
    SQRTPI,
    TAN,
    TANH,
    TRUNC,
    SUM,
    SUMSQ,
    SUMX2MY2,
    SUMX2PY2,
    SUMXMY2,
    SUMIF,
    ABS,
    ROUND,
    RANDBETWEEN,
    RAND,
    PI,
    POWER,
    ODD,
    LOG,
    MOD,
    EVEN,
    EXP,
    LN,
    CSC,
    CSCH,
    COT,
    COTH,
    E,
    ASIN,
    ATAN,
    COS,
    COSH,
    ATAN2,
    ATANH,
    ACOS,
    ACOSH,
    ACOT,
    ACOTH,
    ASINH,
    BASE,
  };
});
