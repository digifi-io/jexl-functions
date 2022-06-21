import { ExecutionError } from '@digifi/jexl';
import { createModule } from '../utils/module';

export default createModule(({
  evalCriteriaParseResult,
  parseCriteriaExpression,
  validateCriteriaMaxLength,
  safeFlatten,
  coerceToNumber,
}) => {
  const AVERAGE = (...args: unknown[]) => {
    const flattenArgs = safeFlatten(args);

    const sum = flattenArgs.reduce((previousSum: number, arg) => {
      return typeof arg === 'number' ? previousSum + coerceToNumber(arg) : previousSum;
    }, 0);

    return sum / flattenArgs.length;
  };

  const AVERAGEA = (...args: unknown[]) => {
    const flattenArgs = safeFlatten(args);

    const { sum, items } = flattenArgs.reduce((previousResult: { items: number; sum: number; }, arg) => {
      if (typeof arg === 'number' || arg === true) {
        return {
          sum: previousResult.sum + Number(arg),
          items: previousResult.items + 1,
        };
      }

      if (arg !== null) {
        return {
          ...previousResult,
          items: previousResult.items + 1,
        };
      }

      return previousResult;
    }, { items: 0, sum: 0 });

    return sum / items;
  };

  const AVERAGEIF = (range: unknown[], criteria: unknown, averageRange: unknown[]) => {
    const flattenRange = safeFlatten(range);
    const flattenAverageRange = averageRange ? safeFlatten(averageRange) : flattenRange;

    if (typeof criteria !== 'string') {
      throw new ExecutionError('Criteria should be a string.');
    }

    validateCriteriaMaxLength(criteria);

    const parseResult = parseCriteriaExpression(criteria);

    const { count, result } = flattenRange.reduce((data: { count: number; result: number; }, valueInRange, index) => {
      const evaluationResult = evalCriteriaParseResult(parseResult, valueInRange);

      return evaluationResult
        ? { result: data.result + coerceToNumber(flattenAverageRange[index]), count: data.count + 1 }
        : data;
    }, { count: 0, result: 0 });

    return result / count;
  };

  const COUNTIF = (range: unknown[], criteria: unknown) => {
    const flattenRange = safeFlatten(range);

    if (typeof criteria !== 'string') {
      throw new ExecutionError('Criteria should be a string.');
    }

    validateCriteriaMaxLength(criteria);

    const parseResult = parseCriteriaExpression(criteria);

    return flattenRange.reduce((previousCount: number, valueInRange) => {
      const evaluationResult = evalCriteriaParseResult(parseResult, valueInRange);

      return evaluationResult
        ? previousCount + 1
        : previousCount;
    }, 0);
  };

  const MAX = (...args: unknown[]) => {
    const flattenArg = safeFlatten(args);

    const filteredArgs = flattenArg.filter((arg) => typeof arg === 'number') as number[];

    return Math.max(...filteredArgs);
  };

  const MAXA = (...args: unknown[]) => {
    const coercedArgs = safeFlatten(args).map((arg) => {
      const coercedValue = coerceToNumber(arg);

      if (Number.isNaN(coercedValue)) {
        return 0;
      }

      return coercedValue;
    });

    return Math.max(...coercedArgs);
  };

  const MIN = (...args: unknown[]) => {
    const flattenArg = safeFlatten(args);

    const filteredArgs = flattenArg.filter((arg) => typeof arg === 'number') as number[];

    return Math.min(...filteredArgs);
  };

  const MINA = (...args: unknown[]) => {
    const coercedArgs = safeFlatten(args).map((arg) => {
      const coercedValue = coerceToNumber(arg);

      if (Number.isNaN(coercedValue)) {
        return 0;
      }

      return coercedValue;
    });

    return Math.min(...coercedArgs);
  };

  const MODE = (...args: unknown[]) => {
    const countsByValues: Record<number, number> = {};
    let currentMostCommonValue;

    for (const arg of safeFlatten(args)) {
      const coercedArg = coerceToNumber(arg);
      const newCount = countsByValues[coercedArg] + 1;

      countsByValues[coercedArg] = newCount;

      if (currentMostCommonValue === undefined || countsByValues[currentMostCommonValue] < newCount) {
        currentMostCommonValue = coercedArg;
      }
    }

    return currentMostCommonValue;
  };

  const STANDARDIZE = (value: unknown, mean: unknown, sd: unknown) => {
    return (coerceToNumber(value) - coerceToNumber(mean)) / coerceToNumber(sd);
  };

  const SMALL = (array: unknown[], k: unknown) => {
    const numberArray = safeFlatten(array).map((item) => coerceToNumber(item));

    return numberArray.sort((firstItem, secondItem) => firstItem - secondItem)[coerceToNumber(k) - 1];
  };

  const LARGE = (array: unknown[], k: unknown) => {
    const numberArray = safeFlatten(array).map((item) => coerceToNumber(item));

    return numberArray.sort((firstItem, secondItem) => secondItem - firstItem)[coerceToNumber(k) - 1];
  };

  const COUNT = (...args: unknown[]) => {
    return safeFlatten(args).filter((arg) => typeof arg === 'number').length;
  };

  const COUNTA = (...args: unknown[]) => {
    return args.length;
  };

  const COUNTBLANK = (...args: unknown[]) => {
    return safeFlatten(args).filter((arg) => arg === null || arg === undefined || arg === '').length;
  };

  const COUNTUNIQUE = (...args: unknown[]) => {
    const visitedElements: Record<string, boolean> = {};
    let count = 0;

    for (const arg of safeFlatten(args)) {
      if ((typeof arg === 'object' && arg !== null) || typeof arg === 'function') {
        continue;
      }

      const identifier = `${typeof arg}-${arg}`;
      const wasVisited = visitedElements[identifier];

      if (!wasVisited) {
        count++;

        visitedElements[identifier] = true;
      }
    }
  };

  const MEDIAN = (...args: unknown[]) => {
    const numberArray = safeFlatten(args).map((item) => coerceToNumber(item));

    const half = Math.floor(numberArray.length / 2);

    const sortedArray = numberArray.sort((firstArg, secondArg) => firstArg - secondArg);

    if (sortedArray.length % 2) {
      return sortedArray[half];
    }

    return (sortedArray[half - 1] + sortedArray[half]) / 2.0;
  };

  return {
    AVERAGE,
    AVERAGEA,
    MAX,
    MAXA,
    MIN,
    MINA,
    MODE,
    STANDARDIZE,
    SMALL,
    LARGE,
    COUNT,
    COUNTA,
    COUNTBLANK,
    MEDIAN,
    AVERAGEIF,
    COUNTIF,
    COUNTUNIQUE,
  };
});
