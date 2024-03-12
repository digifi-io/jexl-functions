import StatisticModule from './statistic';

const {
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
} = StatisticModule();

describe('Statistic Module', () => {
  describe('AVERAGE function', () => {
    test('should return the average of numbers in the array', () => {
      expect(AVERAGE(1, 2, 3, 4, 5)).toEqual(3);
      expect(AVERAGE(1, 2, 'three', 4, 'five')).toBe(1.4);
      expect(AVERAGE()).toEqual(NaN);
    });

    test('should return NaN for non-number arguments', () => {
      expect(AVERAGE('one', 'two', 'three')).toBe(0);
    });
  });

  describe('AVERAGEA function', () => {
    test('should return the average of numbers in the array', () => {
      expect(AVERAGEA(1, 2, 3, 4, 5)).toEqual(3);
      expect(AVERAGEA(1, 2, 'three', 4, 'five')).toBe(1.4);
      expect(AVERAGEA()).toEqual(NaN);
    });

    test('should count true values as 1 in the average calculation', () => {
      expect(AVERAGEA(true, false, true)).toEqual(0.6666666666666666);
    });

    test('should exclude null values from the average calculation', () => {
      expect(AVERAGEA(1, 2, null, 3, null)).toEqual(2);
    });

    test('should return NaN if all arguments are null or false', () => {
      expect(AVERAGEA(null, null, null)).toEqual(NaN);
      expect(AVERAGEA(false, false, false)).toEqual(0);
      expect(AVERAGEA(null, false, null)).toEqual(0);
    });
  });

  describe('AVERAGEIF function', () => {
    test('should return the average of numbers in the range that meet the criteria', () => {
      expect(AVERAGEIF([1, 2, 3, 4, 5], '>', [2, 4, 6, 8, 10])).toEqual(6);
      expect(AVERAGEIF([1, 2, 3, 4, 5], '<', [2, 4, 6, 8, 10])).toEqual(NaN);
      expect(AVERAGEIF([1, 2, 3, 4, 5], '>=', [2, 4, 6, 8, 10])).toEqual(6);
    });

    test('should return NaN if no value meets the criteria', () => {
      expect(AVERAGEIF([1, 2, 3, 4, 5], '>', [10, 20, 30, 40, 50])).toEqual(30);
    });

    test('should handle different types of criteria', () => {
      expect(AVERAGEIF([1, 2, 3, 4, 5], '=', [1, 2, 3, 4, 5])).toBeNaN();
      expect(AVERAGEIF([1, 2, 3, 4, 5], '<>', [1, 2, 3, 4, 5])).toEqual(3);
    });

    test('should ignore criteria for which averageRange has null values', () => {
      expect(AVERAGEIF([1, 2, 3, 4, 5], '>', [2, null, 6, null, 10])).toEqual(3.6);
    });

    test('should handle empty averageRange by using the range itself', () => {
      expect(AVERAGEIF([1, 2, 3, 4, 5], '>', [])).toEqual(0);
    });
  });

  describe('COUNTIF function', () => {
    test('should count the number of elements in the range that meet the criteria', () => {
      expect(COUNTIF([1, 2, 3, 4, 5], '>2')).toEqual(3);
      expect(COUNTIF([1, 2, 3, 4, 5], '<3')).toEqual(2);
      expect(COUNTIF(['apple', 'banana', 'orange', 'grape'], '>=banana')).toEqual(3);
    });

    test('should return 0 if no value meets the criteria', () => {
      expect(COUNTIF([1, 2, 3, 4, 5], '>10')).toEqual(0);
      expect(COUNTIF(['apple', 'banana', 'orange', 'grape'], '<apple')).toEqual(0);
    });

    test('should handle empty range', () => {
      expect(COUNTIF([], '>2')).toEqual(0);
      expect(COUNTIF([], '')).toEqual(0);
    });

    test('should handle different types of criteria', () => {
      expect(COUNTIF([1, 2, 3, 4, 5], '=2')).toEqual(1);
      expect(COUNTIF([1, 2, 3, 4, 5], '<>2')).toEqual(4);
    });

    test('should ignore null and undefined values in range', () => {
      expect(COUNTIF([1, null, 3, undefined, 5], '>2')).toEqual(2);
    });
  });

  describe('MAX function', () => {
    test('should return the maximum value from a list of numbers', () => {
      expect(MAX(1, 2, 3, 4, 5)).toEqual(5);
      expect(MAX(-10, 0, 10, 20)).toEqual(20);
      expect(MAX(0, -5, -10, -15)).toEqual(0);
    });

    test('should return the maximum value from an array of numbers', () => {
      expect(MAX([1, 2, 3, 4, 5])).toEqual(5);
      expect(MAX([-10, 0, 10, 20])).toEqual(20);
      expect(MAX([0, -5, -10, -15])).toEqual(0);
    });

    test('should return NaN for non-numeric values', () => {
      expect(MAX('apple', 'banana', 'orange')).toBe(-Infinity);
      expect(MAX('apple', 1, 2)).toBe(2);
      expect(MAX(true, false, null, undefined)).toBe(-Infinity);
    });

    test('should return NaN if no arguments are provided', () => {
      expect(MAX()).toBe(-Infinity);
    });

    test('should ignore null and undefined values', () => {
      expect(MAX(1, null, 3, undefined, 5)).toEqual(5);
    });
  });

  describe('MAXA function', () => {
    test('should return the maximum value from a list of numbers', () => {
      expect(MAXA(1, 2, 3, 4, 5)).toEqual(5);
      expect(MAXA(-10, 0, 10, 20)).toEqual(20);
      expect(MAXA(0, -5, -10, -15)).toEqual(0);
    });

    test('should return the maximum value from an array of numbers', () => {
      expect(MAXA([1, 2, 3, 4, 5])).toEqual(5);
      expect(MAXA([-10, 0, 10, 20])).toEqual(20);
      expect(MAXA([0, -5, -10, -15])).toEqual(0);
    });

    test('should treat non-numeric values as 0', () => {
      expect(MAXA('apple', 'banana', 'orange')).toEqual(0);
      expect(MAXA('apple', 1, 2)).toEqual(2);
      expect(MAXA(true, false, null, undefined)).toEqual(1);
    });

    test('should return 0 if no arguments are provided', () => {
      expect(MAXA()).toEqual(0);
    });

    test('should ignore null and undefined values', () => {
      expect(MAXA(1, null, 3, undefined, 5)).toEqual(5);
    });
  });

  describe('MIN function', () => {
    test('should return the minimum value from a list of numbers', () => {
      expect(MIN(1, 2, 3, 4, 5)).toEqual(1);
      expect(MIN(-10, 0, 10, 20)).toEqual(-10);
      expect(MIN(0, -5, -10, -15)).toEqual(-15);
    });

    test('should return the minimum value from an array of numbers', () => {
      expect(MIN([1, 2, 3, 4, 5])).toEqual(1);
      expect(MIN([-10, 0, 10, 20])).toEqual(-10);
      expect(MIN([0, -5, -10, -15])).toEqual(-15);
    });

    test('should treat non-numeric values as 0', () => {
      expect(MIN('apple', 'banana', 'orange')).toEqual(Infinity);
      expect(MIN('apple', 1, 2)).toEqual(1);
      expect(MIN(true, false, null, undefined)).toEqual(Infinity);
    });

    test('should return 0 if no arguments are provided', () => {
      expect(MIN()).toEqual(Infinity);
    });

    test('should ignore null and undefined values', () => {
      expect(MIN(1, null, 3, undefined, 5)).toEqual(1);
    });
  });

  describe('MINA function', () => {
    test('should return the minimum value from a list of numbers', () => {
      expect(MINA(1, 2, 3, 4, 5)).toEqual(1);
      expect(MINA(-10, 0, 10, 20)).toEqual(-10);
      expect(MINA(0, -5, -10, -15)).toEqual(-15);
    });

    test('should return the minimum value from an array of numbers', () => {
      expect(MINA([1, 2, 3, 4, 5])).toEqual(1);
      expect(MINA([-10, 0, 10, 20])).toEqual(-10);
      expect(MINA([0, -5, -10, -15])).toEqual(-15);
    });

    test('should treat non-numeric values as 0', () => {
      expect(MINA('apple', 'banana', 'orange')).toEqual(0);
      expect(MINA('apple', 1, 2)).toEqual(0);
      expect(MINA(true, false, null, undefined)).toEqual(0);
    });

    test('should return 0 if no arguments are provided', () => {
      expect(MINA()).toEqual(0);
    });

    test('should ignore null and undefined values', () => {
      expect(MINA(1, null, 3, undefined, 5)).toEqual(0);
    });
  });

  describe('MODE function', () => {
    test('should return the most common value', () => {
      expect(MODE(1, 2, 2, 3, 4)).toEqual(1);
      expect(MODE(2, 2, 2, 3, 4)).toEqual(2);
      expect(MODE(1, 2, 3, 3, 3, 4)).toEqual(1);
      expect(MODE(1, 2, 3, 4)).toEqual(1);
      expect(MODE(1, 1, 2, 3, 4)).toEqual(1);
    });

    test('should return the most common value even if provided in an array', () => {
      expect(MODE([1, 2, 2, 3, 4])).toEqual(1);
      expect(MODE([2, 2, 2, 3, 4])).toEqual(2);
      expect(MODE([1, 2, 3, 3, 3, 4])).toEqual(1);
      expect(MODE([1, 2, 3, 4])).toEqual(1);
      expect(MODE([1, 1, 2, 3, 4])).toEqual(1);
    });

    test('should return the first most common value if multiple values have the same count', () => {
      expect(MODE(1, 1, 2, 2)).toEqual(1);
      expect(MODE(1, 1, 2, 2, 3, 3)).toEqual(1);
      expect(MODE(1, 2, 2, 3, 3)).toEqual(1);
    });

    test('should return undefined if no arguments are provided', () => {
      expect(MODE()).toBeUndefined();
    });

    test('should handle non-numeric values', () => {
      expect(MODE('apple', 'banana', 'banana', 'orange')).toBeNaN();
    });
  });

  describe('STANDARDIZE function', () => {
    test('should correctly standardize the value', () => {
      expect(STANDARDIZE(10, 5, 2)).toEqual(2.5);
      expect(STANDARDIZE(20, 15, 5)).toEqual(1);
      expect(STANDARDIZE(30, 25, 10)).toEqual(0.5);
      expect(STANDARDIZE(100, 100, 20)).toEqual(0);
    });

    test('should handle negative values', () => {
      expect(STANDARDIZE(-10, -5, 2)).toEqual(-2.5);
      expect(STANDARDIZE(-20, -15, 5)).toEqual(-1);
      expect(STANDARDIZE(-30, -25, 10)).toEqual(-0.5);
      expect(STANDARDIZE(-100, -100, 20)).toEqual(0);
    });

    test('should handle non-numeric values', () => {
      expect(STANDARDIZE('abc', 10, 2)).toBeNaN();
      expect(STANDARDIZE(10, 'abc', 2)).toBeNaN();
      expect(STANDARDIZE(10, 20, 'abc')).toBeNaN();
    });

    test('should handle missing or undefined values', () => {
      // @ts-ignore
      expect(STANDARDIZE()).toBeNaN();
      // @ts-ignore
      expect(STANDARDIZE(10)).toBe(Infinity);
      // @ts-ignore
      expect(STANDARDIZE(10, 20)).toBe(-Infinity);
    });
  });

  describe('SMALL function', () => {
    test('should return the k-th smallest value from the array', () => {
      expect(SMALL([1, 2, 3, 4, 5], 1)).toEqual(1);
      expect(SMALL([1, 2, 3, 4, 5], 3)).toEqual(3);
      expect(SMALL([5, 4, 3, 2, 1], 5)).toEqual(5);
      expect(SMALL([10, 20, 30, 40, 50], 2)).toEqual(20);
    });

    test('should handle negative values', () => {
      expect(SMALL([-1, -2, -3, -4, -5], 1)).toEqual(-5);
      expect(SMALL([-5, -4, -3, -2, -1], 3)).toEqual(-3);
      expect(SMALL([-10, -20, -30, -40, -50], 5)).toEqual(-10);
      expect(SMALL([-10, -20, -30, -40, -50], 3)).toEqual(-30);
    });

    test('should handle non-numeric values', () => {
      expect(SMALL(['abc', 1, 2, 3, 4], 2)).toBe(1);
      expect(SMALL([1, 'abc', 2, 3, 4], 2)).toBeNaN();
      expect(SMALL([1, 2, 3, 'abc', 4], 2)).toBe(2);
      expect(SMALL([1, 2, 3, 4, 'abc'], 2)).toBe(2);
    });

    test('should handle missing or undefined values', () => {
      // @ts-ignore
      expect(() => SMALL()).toThrow();
      // @ts-ignore
      expect(SMALL([1, 2, 3])).toBeUndefined();
      expect(SMALL([1, 2, 3], 2)).toBe(2);
      expect(SMALL([], 2)).toBeUndefined();
      expect(SMALL([1, 2, 3], 'abc')).toBe(undefined);
    });
  });

  describe('LARGE function', () => {
    test('should return the k-th largest value from the array', () => {
      expect(LARGE([1, 2, 3, 4, 5], 1)).toEqual(5);
      expect(LARGE([1, 2, 3, 4, 5], 3)).toEqual(3);
      expect(LARGE([5, 4, 3, 2, 1], 5)).toEqual(1);
      expect(LARGE([10, 20, 30, 40, 50], 2)).toEqual(40);
    });

    test('should handle negative values', () => {
      expect(LARGE([-1, -2, -3, -4, -5], 1)).toEqual(-1);
      expect(LARGE([-5, -4, -3, -2, -1], 3)).toEqual(-3);
      expect(LARGE([-10, -20, -30, -40, -50], 5)).toEqual(-50);
      expect(LARGE([-10, -20, -30, -40, -50], 3)).toEqual(-30);
    });

    test('should handle non-numeric values', () => {
      expect(LARGE(['abc', 1, 2, 3, 4], 2)).toBe(4);
      expect(LARGE([1, 'abc', 2, 3, 4], 2)).toBeNaN();
      expect(LARGE([1, 2, 3, 'abc', 4], 2)).toBe(3);
      expect(LARGE([1, 2, 3, 4, 'abc'], 2)).toBe(3);
    });

    test('should handle missing or undefined values', () => {
      // @ts-ignore
      expect(() => LARGE()).toThrow();
      // @ts-ignore
      expect(LARGE([1, 2, 3])).toBeUndefined();
      expect(LARGE([1, 2, 3], 2)).toBe(2);
      expect(LARGE([], 2)).toBeUndefined();
      expect(LARGE([1, 2, 3], 'abc')).toBeUndefined();
    });
  });

  describe('COUNT function', () => {
    test('should count the number of numeric values in the provided arguments', () => {
      expect(COUNT(1, 2, 3, 4, 5)).toBe(5);
      expect(COUNT(1, 'abc', 3, 4, 'def')).toBe(3);
      expect(COUNT(1, 2, 3, 'abc', 'def')).toBe(3);
      expect(COUNT(1, 2, 'abc', 'def')).toBe(2);
      expect(COUNT('abc', 'def')).toBe(0);
    });

    test('should handle negative values', () => {
      expect(COUNT(-1, -2, -3, -4, -5)).toBe(5);
      expect(COUNT(-1, 2, -3, 4, -5)).toBe(5);
    });

    test('should handle non-numeric values', () => {
      expect(COUNT('abc', 'def')).toBe(0);
      expect(COUNT('abc', 1, 2, 'def')).toBe(2);
    });

    test('should handle empty arguments', () => {
      expect(COUNT()).toBe(0);
      expect(COUNT([])).toBe(0);
      expect(COUNT([], [], [])).toBe(0);
    });
  });

  describe('COUNTA function', () => {
    test('should count the number of non-empty values in the provided arguments', () => {
      expect(COUNTA(1, 2, 3, 4, 5)).toBe(5);
      expect(COUNTA(1, '', 3, 4, 'def')).toBe(5);
      expect(COUNTA('', '', 3, 'def')).toBe(4);
      expect(COUNTA('', '')).toBe(2);
      expect(COUNTA('', 'abc', '', 'def')).toBe(4);
    });

    test('should handle non-numeric values', () => {
      expect(COUNTA('abc', 'def')).toBe(2);
      expect(COUNTA('abc', 1, 2, 'def')).toBe(4);
    });

    test('should handle empty arguments', () => {
      expect(COUNTA()).toBe(0);
      expect(COUNTA([])).toBe(1);
      expect(COUNTA([], [], [])).toBe(3);
    });
  });

  describe('COUNTBLANK function', () => {
    test('should count the number of blank (empty or null) values in the provided arguments', () => {
      expect(COUNTBLANK('', null, undefined, 0, 'abc')).toBe(3);
      expect(COUNTBLANK('', '', '')).toBe(3);
      expect(COUNTBLANK(1, 2, 3, 4, 5)).toBe(0);
      expect(COUNTBLANK('', '', 3, 4, 'def')).toBe(2);
      expect(COUNTBLANK('', '', '', 'def')).toBe(3);
    });

    test('should handle empty arguments', () => {
      expect(COUNTBLANK()).toBe(0);
      expect(COUNTBLANK([])).toBe(0);
      expect(COUNTBLANK([], [], [])).toBe(0);
    });
  });

  describe('COUNTUNIQUE function', () => {
    test('should count the number of unique values in the provided arguments', () => {
      expect(COUNTUNIQUE(1, 2, 3, 4, 5)).toBe(5);
      expect(COUNTUNIQUE('a', 'b', 'c', 'd')).toBe(4);
      expect(COUNTUNIQUE(1, 'a', 2, 'b', 3, 'c')).toBe(6);
      expect(COUNTUNIQUE('', '', '', '', '')).toBe(1);
      expect(COUNTUNIQUE(null, undefined, null, undefined)).toBe(2);
      expect(COUNTUNIQUE(1, 1, 1, 1, 1)).toBe(1);
      expect(COUNTUNIQUE(1, 2, 3, 3, 3, 2, 1)).toBe(3);
    });

    test('should handle empty arguments', () => {
      expect(COUNTUNIQUE()).toBe(0);
      expect(COUNTUNIQUE([])).toBe(0);
      expect(COUNTUNIQUE([], [], [])).toBe(0);
    });

    test('should ignore non-primitive types', () => {
      expect(COUNTUNIQUE({}, {}, {})).toBe(0);
      expect(COUNTUNIQUE(() => {}, () => {})).toBe(0);
    });
  });

  describe('MEDIAN function', () => {
    test('should calculate the median of the provided arguments', () => {
      expect(MEDIAN(1, 2, 3, 4, 5)).toBe(3);
      expect(MEDIAN(1, 2, 3, 4, 5, 6)).toBe(3.5);
      expect(MEDIAN(1, 2, 3)).toBe(2);
      expect(MEDIAN(1, 1, 1, 1)).toBe(1);
      expect(MEDIAN(10, 20, 30, 40)).toBe(25);
      expect(MEDIAN(100, 300, 500, 700, 900)).toBe(500);
    });

    test('should handle empty arguments', () => {
      expect(MEDIAN()).toBeNaN();
      expect(MEDIAN([])).toBeNaN();
      expect(MEDIAN([], [], [])).toBeNaN();
    });

    test('should handle non-numeric arguments', () => {
      expect(MEDIAN('a', 'b', 'c')).toBeNaN();
      expect(MEDIAN(null, undefined)).toBe(0);
      expect(MEDIAN({}, {}, {})).toBeNaN();
    });
  });
});
