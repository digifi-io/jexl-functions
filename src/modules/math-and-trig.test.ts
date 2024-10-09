import MathAndTrigModule from './math-and-trig';

const {
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
} = MathAndTrigModule();

describe('Math And Trig Module', () => {
  describe('QUOTIENT function', () => {
    test('should return the integer quotient of two numbers', () => {
      expect(QUOTIENT(10, 3)).toBe(3);
      expect(QUOTIENT(15, 4)).toBe(3);
      expect(QUOTIENT(20, 5)).toBe(4);
      expect(QUOTIENT(-10, 3)).toBe(-4); // Negative numerator
      expect(QUOTIENT(10, -3)).toBe(-4); // Negative denominator
      expect(QUOTIENT(-10, -3)).toBe(3); // Both numerator and denominator negative
    });

    test('should handle edge cases', () => {
      expect(QUOTIENT(0, 5)).toBe(0); // Zero numerator
      expect(QUOTIENT(10, 0)).toBe(Infinity); // Zero denominator
      expect(QUOTIENT(0, 0)).toBe(NaN); // Zero numerator and denominator
      expect(QUOTIENT(undefined, 5)).toBe(0); // Undefined numerator
      expect(QUOTIENT(10, null)).toBe(Infinity); // Null denominator
    });
  });

  describe('RADIANS function', () => {
    test('should convert degrees to radians', () => {
      expect(RADIANS(0)).toBe(0);
      expect(RADIANS(90)).toBeCloseTo(Math.PI / 2);
      expect(RADIANS(180)).toBeCloseTo(Math.PI);
      expect(RADIANS(270)).toBeCloseTo((3 * Math.PI) / 2);
      expect(RADIANS(360)).toBeCloseTo(2 * Math.PI);
      expect(RADIANS(-90)).toBeCloseTo(-Math.PI / 2);
    });

    test('should handle edge cases', () => {
      expect(RADIANS(undefined)).toBe(0);
      expect(RADIANS(null)).toBe(0);
      expect(RADIANS('')).toBe(0);
      expect(RADIANS('abc')).toBeNaN();
      expect(RADIANS(true)).toBe(0.017453292519943295);
      expect(RADIANS([])).toBe(0);
      expect(RADIANS({})).toBeNaN();
    });
  });

  describe('PRODUCT function', () => {
    test('should return the product of all numbers in the input array', () => {
      expect(PRODUCT(2, 3, 4)).toBe(24);
      expect(PRODUCT(5, 10, 2)).toBe(100);
      expect(PRODUCT(-1, 2, 3)).toBe(-6);
      expect(PRODUCT(0, 3, 5)).toBe(0);
    });

    test('should handle empty input', () => {
      expect(PRODUCT()).toBe(1); // No arguments
      expect(PRODUCT([])).toBe(1); // Empty array
    });

    test('should handle nested arrays', () => {
      expect(PRODUCT([2, 3], [4, 5])).toBe(120);
      expect(PRODUCT([2, [3, 4]], [5])).toBeNaN();
    });

    test('should handle non-numeric inputs', () => {
      expect(PRODUCT(2, 'a', 4)).toBeNaN();
      expect(PRODUCT(2, undefined, 4)).toBe(0);
      expect(PRODUCT(2, null, 4)).toBe(0);
      expect(PRODUCT(2, true, 4)).toBe(8);
      expect(PRODUCT(2, [], 4)).toBe(8);
      expect(PRODUCT(2, {}, 4)).toBeNaN();
    });
  });

  describe('ROUNDDOWN function', () => {
    test('should round down the given value to the specified number of digits', () => {
      expect(ROUNDDOWN(3.14159, 2)).toBe(3.14);
      expect(ROUNDDOWN(10.567, 2)).toBe(10.56);
      expect(ROUNDDOWN(123.456, 0)).toBe(123);
      expect(ROUNDDOWN(-3.14159, 2)).toBe(-3.14);
      expect(ROUNDDOWN(-10.567, 2)).toBe(-10.56);
      expect(ROUNDDOWN(-123.456, 0)).toBe(-123);
    });

    test('should handle negative digits', () => {
      expect(ROUNDDOWN(3.14159, -2)).toBe(0);
      expect(ROUNDDOWN(10.567, -2)).toBe(0);
      expect(ROUNDDOWN(123.456, -2)).toBe(100);
      expect(ROUNDDOWN(-3.14159, -2)).toBe(-0);
      expect(ROUNDDOWN(-10.567, -2)).toBe(-0);
      expect(ROUNDDOWN(-123.456, -2)).toBe(-100);
    });

    test('should handle non-numeric inputs', () => {
      expect(ROUNDDOWN('3.14159', 2)).toBe(3.14);
      expect(ROUNDDOWN(true, 2)).toBe(1);
      expect(ROUNDDOWN(null, 2)).toBe(-0);
      expect(ROUNDDOWN(undefined, 2)).toBe(-0);
      expect(ROUNDDOWN([], 2)).toBe(-0);
      expect(ROUNDDOWN({}, 2)).toBeNaN();
    });
  });

  describe('ROUNDUP function', () => {
    test('should round up the given value to the specified number of digits', () => {
      expect(ROUNDUP(3.14159, 2)).toBe(3.15);
      expect(ROUNDUP(10.567, 2)).toBe(10.57);
      expect(ROUNDUP(123.456, 0)).toBe(124);
      expect(ROUNDUP(-3.14159, 2)).toBe(-3.15);
      expect(ROUNDUP(-10.567, 2)).toBe(-10.57);
      expect(ROUNDUP(-123.456, 0)).toBe(-124);
    });

    test('should handle negative digits', () => {
      expect(ROUNDUP(3.14159, -2)).toBe(100);
      expect(ROUNDUP(10.567, -2)).toBe(100);
      expect(ROUNDUP(123.456, -2)).toBe(200);
      expect(ROUNDUP(-3.14159, -2)).toBe(-100);
      expect(ROUNDUP(-10.567, -2)).toBe(-100);
      expect(ROUNDUP(-123.456, -2)).toBe(-200);
    });

    test('should handle non-numeric inputs', () => {
      expect(ROUNDUP('3.14159', 2)).toBe(3.15); // String number input
      expect(ROUNDUP(true, 2)).toBe(1); // Boolean input
      expect(ROUNDUP(null, 2)).toBe(-0); // Null input
      expect(ROUNDUP(undefined, 2)).toBe(-0); // Undefined input
      expect(ROUNDUP([], 2)).toBe(-0); // Array input
      expect(ROUNDUP({}, 2)).toBeNaN(); // Object input
    });
  });

  describe('SEC function', () => {
    test('should return the secant of the given angle', () => {
      // Test with positive values
      expect(SEC(0)).toBe(1);
      expect(SEC(Math.PI / 3)).toBeCloseTo(2, 10);
      expect(SEC(Math.PI / 4)).toBeCloseTo(Math.sqrt(2), 10);
      expect(SEC(Math.PI / 6)).toBeCloseTo(2 / Math.sqrt(3), 10);
      expect(SEC(Math.PI / 2)).toBeCloseTo(16331239353195370, 10);

      // Test with negative values
      expect(SEC(-Math.PI / 3)).toBeCloseTo(2, 10);
      expect(SEC(-Math.PI / 4)).toBeCloseTo(Math.sqrt(2), 10);
      expect(SEC(-Math.PI / 6)).toBeCloseTo(2 / Math.sqrt(3), 10);
      expect(SEC(-Math.PI / 2)).toBeCloseTo(16331239353195370, 10);
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(SEC('invalid')).toBeNaN();
      expect(SEC(true)).toBe(1 / Math.cos(1));
      expect(SEC(null)).toBe(1 / Math.cos(0));
      expect(SEC(undefined)).toBe(1);
      expect(SEC([])).toBe(1 / Math.cos(0));
      expect(SEC({})).toBeNaN();
    });
  });

  describe('SECH function', () => {
    test('should return the hyperbolic secant of the given value', () => {
      // Test with positive values
      expect(SECH(0)).toBeCloseTo(1, 10);
      expect(SECH(1)).toBeCloseTo(0.648054, 6);
      expect(SECH(2)).toBeCloseTo(0.265802, 6);

      // Test with negative values
      expect(SECH(-1)).toBeCloseTo(0.648054, 6);
      expect(SECH(-2)).toBeCloseTo(0.265802, 6);
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(SECH('invalid')).toBeNaN();
      expect(SECH(true)).toBeCloseTo(0.648054, 6);
      expect(SECH(null)).toBe(1);
      expect(SECH(undefined)).toBe(1);
      expect(SECH([])).toBe(1);
      expect(SECH({})).toBeNaN();
    });
  });

  describe('SECH function', () => {
    test('should return the hyperbolic secant of the given value', () => {
      // Test with positive values
      expect(SECH(0)).toBeCloseTo(1, 10);
      expect(SECH(1)).toBeCloseTo(0.648054, 6);
      expect(SECH(2)).toBeCloseTo(0.265802, 6);

      // Test with negative values
      expect(SECH(-1)).toBeCloseTo(0.648054, 6);
      expect(SECH(-2)).toBeCloseTo(0.265802, 6);
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(SECH('invalid')).toBeNaN();
      expect(SECH(true)).toBeCloseTo(0.648054, 6);
      expect(SECH(null)).toBe(1);
      expect(SECH(undefined)).toBe(1);
      expect(SECH([])).toBe(1);
      expect(SECH({})).toBeNaN();
    });
  });

  describe('SINH function', () => {
    test('should return the hyperbolic sine of the given value', () => {
      // Test with positive values
      expect(SINH(0)).toBeCloseTo(0, 10);
      expect(SINH(1)).toBeCloseTo(1.175201, 6);
      expect(SINH(2)).toBeCloseTo(3.626860, 6);
      expect(SINH(3)).toBeCloseTo(10.017874927409903, 6);

      // Test with negative values
      expect(SINH(-1)).toBeCloseTo(-1.175201, 6);
      expect(SINH(-2)).toBeCloseTo(-3.626860, 6);
      expect(SINH(-3)).toBeCloseTo(-10.017874927409903, 6);
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(SINH('invalid')).toBeNaN();
      expect(SINH(true)).toBeCloseTo(1.175201, 6);
      expect(SINH(null)).toBe(0);
      expect(SINH(undefined)).toBe(0);
      expect(SINH([])).toBe(0);
      expect(SINH({})).toBeNaN();
    });
  });

  describe('SQRT function', () => {
    test('should return the square root of the given value', () => {
      // Test with positive values
      expect(SQRT(0)).toBe(0);
      expect(SQRT(1)).toBe(1);
      expect(SQRT(4)).toBe(2);
      expect(SQRT(9)).toBe(3);

      // Test with fractional values
      expect(SQRT(2)).toBeCloseTo(1.4142135, 6);
      expect(SQRT(3)).toBeCloseTo(1.732051, 6);
      expect(SQRT(8)).toBeCloseTo(2.828427, 6);

      // Test with negative values
      expect(SQRT(-1)).toBeNaN();
      expect(SQRT(-2)).toBeNaN();
      expect(SQRT(-3)).toBeNaN();
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(SQRT('invalid')).toBeNaN();
      expect(SQRT(true)).toBe(1);
      expect(SQRT(null)).toBe(0);
      expect(SQRT(undefined)).toBe(0);
      expect(SQRT([])).toBe(0);
      expect(SQRT({})).toBeNaN();
    });
  });

  describe('SQRTPI function', () => {
    test('should return the square root of the given value multiplied by PI', () => {
      // Test with positive values
      expect(SQRTPI(0)).toBe(0);
      expect(SQRTPI(1)).toBeCloseTo(Math.sqrt(Math.PI));
      expect(SQRTPI(4)).toBeCloseTo(2 * Math.sqrt(Math.PI));
      expect(SQRTPI(9)).toBeCloseTo(3 * Math.sqrt(Math.PI));

      // Test with fractional values
      expect(SQRTPI(2)).toBeCloseTo(Math.sqrt(2 * Math.PI));
      expect(SQRTPI(3)).toBeCloseTo(Math.sqrt(3 * Math.PI));
      expect(SQRTPI(8)).toBeCloseTo(Math.sqrt(8 * Math.PI));

      // Test with negative values
      expect(SQRTPI(-1)).toBeNaN();
      expect(SQRTPI(-2)).toBeNaN();
      expect(SQRTPI(-3)).toBeNaN();
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(SQRTPI('invalid')).toBeNaN();
      expect(SQRTPI(true)).toBe(Math.sqrt(Math.PI));
      expect(SQRTPI(null)).toBe(0);
      expect(SQRTPI(undefined)).toBe(0);
      expect(SQRTPI([])).toBe(0);
      expect(SQRTPI({})).toBeNaN();
    });
  });

  describe('TAN function', () => {
    test('should return the tangent of the given value', () => {
      // Test with positive values
      expect(TAN(0)).toBeCloseTo(0);
      expect(TAN(Math.PI / 4)).toBeCloseTo(1);
      expect(TAN(Math.PI / 3)).toBeCloseTo(Math.sqrt(3));
      expect(TAN(Math.PI / 6)).toBeCloseTo(1 / Math.sqrt(3));

      // Test with negative values
      expect(TAN(-Math.PI / 4)).toBeCloseTo(-1);
      expect(TAN(-Math.PI / 3)).toBeCloseTo(-Math.sqrt(3));
      expect(TAN(-Math.PI / 6)).toBeCloseTo(-1 / Math.sqrt(3));

      // Test with fractional values
      expect(TAN(Math.PI / 8)).toBeCloseTo(0.41421356);
      expect(TAN(Math.PI / 12)).toBeCloseTo(0.26794919);

      // Test with larger values
      expect(TAN(100)).toBeCloseTo(-0.5872139151569291);
      expect(TAN(1000)).toBeCloseTo(1.4703241557027185);
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(TAN('invalid')).toBeNaN();
      expect(TAN(true)).toBeCloseTo(Math.tan(1));
      expect(TAN(null)).toBe(0);
      expect(TAN(undefined)).toBe(0);
      expect(TAN([])).toBe(0);
      expect(TAN({})).toBeNaN();
    });
  });

  describe('TANH function', () => {
    test('should return the hyperbolic tangent of the given value', () => {
      // Test with positive values
      expect(TANH(0)).toBeCloseTo(0);
      expect(TANH(1)).toBeCloseTo(0.7615941559557649);
      expect(TANH(2)).toBeCloseTo(0.9640275800758169);
      expect(TANH(3)).toBeCloseTo(0.9950547536867305);

      // Test with negative values
      expect(TANH(-1)).toBeCloseTo(-0.7615941559557649);
      expect(TANH(-2)).toBeCloseTo(-0.9640275800758169);
      expect(TANH(-3)).toBeCloseTo(-0.9950547536867305);

      // Test with fractional values
      expect(TANH(0.5)).toBeCloseTo(0.4621171572600098);
      expect(TANH(0.25)).toBeCloseTo(0.24491866240370903);

      // Test with larger values
      expect(TANH(100)).toBeCloseTo(1);
      expect(TANH(1000)).toBeNaN();
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(TANH('invalid')).toBeNaN();
      expect(TANH(true)).toBeCloseTo(0.7615941559557649);
      expect(TANH(null)).toBe(0);
      expect(TANH(undefined)).toBe(0);
      expect(TANH([])).toBe(0);
      expect(TANH({})).toBeNaN();
    });
  });

  describe('TRUNC function', () => {
    test('should truncate the given value to the specified number of digits', () => {
      // Test with positive values
      expect(TRUNC(3.14159, 2)).toBeCloseTo(3.14);
      expect(TRUNC(123.456, 0)).toBe(123);
      expect(TRUNC(987.654, 3)).toBeCloseTo(987.654);
      expect(TRUNC(2955.95, 2)).toBe(2955.95);

      // Test with negative values
      expect(TRUNC(-3.14159, 2)).toBeCloseTo(-3.14);
      expect(TRUNC(-123.456, 0)).toBe(-123);
      expect(TRUNC(-987.654, 3)).toBeCloseTo(-987.654);

      // Test with fractional values
      expect(TRUNC(1.2345, 3)).toBeCloseTo(1.234);
      expect(TRUNC(0.987654, 4)).toBeCloseTo(0.9876);

      // Test with larger values
      expect(TRUNC(12345.6789, 2)).toBeCloseTo(12345.67);
      expect(TRUNC(0.000123456789, 6)).toBeCloseTo(0.000123);
    });

    test('should handle non-numeric inputs', () => {
      // Test with non-numeric inputs
      expect(TRUNC('invalid', 2)).toBeNaN();
      expect(TRUNC(true, 2)).toBe(1);
      expect(TRUNC(null, 2)).toBe(0);
      expect(TRUNC(undefined, 2)).toBe(0);
      expect(TRUNC([], 2)).toBe(0);
      expect(TRUNC({}, 2)).toBeNaN();
    });
  });

  describe('SUM function', () => {
    test('should return the sum of all numeric arguments', () => {
      // Test with positive values
      expect(SUM(1, 2, 3)).toBe(6);
      expect(SUM(10, 20, 30)).toBe(60);

      // Test with negative values
      expect(SUM(-1, -2, -3)).toBe(-6);
      expect(SUM(-10, -20, -30)).toBe(-60);

      // Test with mixed positive and negative values
      expect(SUM(1, -2, 3)).toBe(2);
      expect(SUM(-10, 20, -30)).toBe(-20);

      // Test with fractional values
      expect(SUM(1.5, 2.5, 3.5)).toBeCloseTo(7.5);
      expect(SUM(0.1, 0.2, 0.3)).toBeCloseTo(0.6);
    });

    test('should handle non-numeric inputs gracefully', () => {
      // Test with non-numeric inputs
      expect(SUM('invalid', 2, 3)).toBeNaN();
      expect(SUM(true, false, 3)).toBe(4);
      expect(SUM(null, undefined, 3)).toBe(3);
      expect(SUM([], {}, 3)).toBeNaN();
    });

    test('should return 0 if no arguments are provided', () => {
      expect(SUM()).toBe(0);
    });
  });

  describe('SUMSQ function', () => {
    test('should return the sum of squares of all numeric arguments', () => {
      expect(SUMSQ(1, 2, 3)).toBe(14);
      expect(SUMSQ(10, 20, 30)).toBe(1400);

      expect(SUMSQ(-1, -2, -3)).toBe(14);
      expect(SUMSQ(-10, -20, -30)).toBe(1400);

      expect(SUMSQ(1, -2, 3)).toBe(14);
      expect(SUMSQ(-10, 20, -30)).toBe(1400);

      expect(SUMSQ(1.5, 2.5, 3.5)).toBeCloseTo(20.75);
      expect(SUMSQ(0.1, 0.2, 0.3)).toBeCloseTo(0.14);
    });

    test('should handle non-numeric inputs gracefully', () => {
      // Test with non-numeric inputs
      expect(SUMSQ('invalid', 2, 3)).toBeNaN();
      expect(SUMSQ(true, false, 3)).toBe(10);
      expect(SUMSQ(null, undefined, 3)).toBe(9);
      expect(SUMSQ([], {}, 3)).toBeNaN();
    });

    test('should return 0 if no arguments are provided', () => {
      expect(SUMSQ()).toBe(0);
    });
  });

  describe('SUMX2MY2 function', () => {
    test('should return the sum of the squares of the differences between corresponding elements of two arrays', () => {
      expect(SUMX2MY2([1, 2, 3], [1, 2, 3])).toBe(0);
      expect(SUMX2MY2([1, 2, 3], [4, 5, 6])).toBe(-63);

      expect(SUMX2MY2([1, 2, 3], [1, 2])).toBe(9);
      expect(SUMX2MY2([1, 2], [1, 2, 3])).toBe(0);
    });

    test('should handle non-array inputs gracefully', () => {
      expect(SUMX2MY2('invalid', [1, 2, 3])).toBeNaN();
      expect(SUMX2MY2([1, 2, 3], 'invalid')).toBeNaN();
      expect(SUMX2MY2(true, [1, 2, 3])).toBe(0);
      expect(SUMX2MY2([1, 2, 3], false)).toBe(14);
      expect(SUMX2MY2(null, [1, 2, 3])).toBe(-1);
      expect(SUMX2MY2([1, 2, 3], undefined)).toBe(14);
    });

    test('should return 0 if either or both arrays are empty', () => {
      expect(SUMX2MY2([], [1, 2, 3])).toBe(0);
      expect(SUMX2MY2([1, 2, 3], [])).toBe(14);
      expect(SUMX2MY2([], [])).toBe(0);
    });
  });

  describe('SUMX2PY2 function', () => {
    test('should return the sum of the squares of elements of two arrays', () => {
      expect(SUMX2PY2([1, 2, 3], [1, 2, 3])).toBe(28);
      expect(SUMX2PY2([1, 2, 3], [4, 5, 6])).toBe(91);

      expect(SUMX2PY2([1, 2, 3], [1, 2])).toBe(19);
      expect(SUMX2PY2([1, 2], [1, 2, 3])).toBe(10);
    });

    test('should handle non-array inputs gracefully', () => {
      expect(SUMX2PY2('invalid', [1, 2, 3])).toBeNaN();
      expect(SUMX2PY2([1, 2, 3], 'invalid')).toBeNaN();
      expect(SUMX2PY2(true, [1, 2, 3])).toBe(2);
      expect(SUMX2PY2([1, 2, 3], false)).toBe(14);
      expect(SUMX2PY2(null, [1, 2, 3])).toBe(1);
      expect(SUMX2PY2([1, 2, 3], undefined)).toBe(14);
    });

    test('should return 0 if either or both arrays are empty', () => {
      // Test with empty arrays
      expect(SUMX2PY2([], [1, 2, 3])).toBe(0);
      expect(SUMX2PY2([1, 2, 3], [])).toBe(14);
      expect(SUMX2PY2([], [])).toBe(0);
    });
  });

  describe('SUMXMY2 function', () => {
    test('should return the sum of the squares of differences between elements of two arrays', () => {
      expect(SUMXMY2([1, 2, 3], [1, 2, 3])).toBe(0);
      expect(SUMXMY2([1, 2, 3], [4, 5, 6])).toBe(27);

      expect(SUMXMY2([1, 2, 3], [1, 2])).toBe(9);
      expect(SUMXMY2([1, 2], [1, 2, 3])).toBe(0);
    });

    test('should handle non-array inputs gracefully', () => {
      // Test with non-array inputs
      expect(SUMXMY2('invalid', [1, 2, 3])).toBeNaN();
      expect(SUMXMY2([1, 2, 3], 'invalid')).toBeNaN();
      expect(SUMXMY2(true, [1, 2, 3])).toBe(0);
      expect(SUMXMY2([1, 2, 3], false)).toBe(14);
      expect(SUMXMY2(null, [1, 2, 3])).toBe(1);
      expect(SUMXMY2([1, 2, 3], undefined)).toBe(14);
    });

    test('should return 0 if either or both arrays are empty', () => {
      expect(SUMXMY2([], [1, 2, 3])).toBe(0);
      expect(SUMXMY2([1, 2, 3], [])).toBe(14);
      expect(SUMXMY2([], [])).toBe(0);
    });
  });

  describe('SUMIF function', () => {
    test('should sum values in range based on given criteria', () => {
      expect(() => SUMIF([1, 2, 3, 4, 5], 3)).toThrow('Criteria must be a string or array. Provided number');
    });
  });

  describe('ABS function', () => {
    test('should return absolute value of a number', () => {
      expect(ABS(5)).toBe(5);
      expect(ABS(-5)).toBe(5);
      expect(ABS(0)).toBe(0);
      expect(ABS(3.14)).toBe(3.14);
      expect(ABS(-3.14)).toBe(3.14);
    });

    test('should return 0 for non-numeric or invalid values', () => {
      expect(ABS(null)).toBe(0);
      expect(ABS(undefined)).toBe(0);
      expect(ABS('')).toBe(0);
      expect(ABS('abc')).toBeNaN();
      expect(ABS([])).toBe(0);
      expect(ABS({})).toBeNaN();
      expect(ABS(true)).toBe(1);
      expect(ABS(false)).toBe(0);
    });
  });


  describe('ACOS function', () => {
    test('should return the arccosine of a number in radians', () => {
      expect(ACOS(1)).toBeCloseTo(0);
      expect(ACOS(0)).toBeCloseTo(Math.PI / 2);
      expect(ACOS(-1)).toBeCloseTo(Math.PI);
      expect(ACOS(0.5)).toBeCloseTo(Math.acos(0.5));
      expect(ACOS(0.3)).toBeCloseTo(Math.acos(0.3));
    });

    test('should return NaN for values outside the range [-1, 1]', () => {
      expect(ACOS(2)).toBe(NaN);
      expect(ACOS(-2)).toBe(NaN);
      expect(ACOS(Infinity)).toBe(NaN);
      expect(ACOS(-Infinity)).toBe(NaN);
    });

    test('should return NaN for non-numeric or invalid values', () => {
      expect(ACOS(null)).toBe(1.5707963267948966);
      expect(ACOS(undefined)).toBe(1.5707963267948966);
      expect(ACOS('')).toBe(1.5707963267948966);
      expect(ACOS('abc')).toBe(NaN);
      expect(ACOS([])).toBe(1.5707963267948966);
      expect(ACOS({})).toBe(NaN);
      expect(ACOS(true)).toBe(0);
      expect(ACOS(false)).toBe(1.5707963267948966);
    });
  });

  describe('ACOSH function', () => {
    test('should return the inverse hyperbolic cosine of a number', () => {
      // Test cases for known values
      expect(ACOSH(1)).toBeCloseTo(0);
      expect(ACOSH(2)).toBeCloseTo(Math.acosh(2));
      expect(ACOSH(5)).toBeCloseTo(Math.acosh(5));
      expect(ACOSH(10)).toBeCloseTo(Math.acosh(10));
    });

    test('should return NaN for negative input values', () => {
      expect(ACOSH(-1)).toBe(NaN);
      expect(ACOSH(-5)).toBe(NaN);
      expect(ACOSH(-10)).toBe(NaN);
    });

    test('should return NaN for non-numeric or invalid values', () => {
      expect(ACOSH(null)).toBe(NaN);
      expect(ACOSH(undefined)).toBe(NaN);
      expect(ACOSH('')).toBe(NaN);
      expect(ACOSH('abc')).toBe(NaN);
      expect(ACOSH([])).toBe(NaN);
      expect(ACOSH({})).toBe(NaN);
      expect(ACOSH(true)).toBe(0);
      expect(ACOSH(false)).toBe(NaN);
    });
  });

  describe('ACOT function', () => {
    test('should return the inverse cotangent of a number', () => {
      // Test cases for known values
      expect(ACOT(1)).toBeCloseTo(Math.PI / 4);
      expect(ACOT(2)).toBeCloseTo(Math.atan(1 / 2));
      expect(ACOT(5)).toBeCloseTo(Math.atan(1 / 5));
      expect(ACOT(10)).toBeCloseTo(Math.atan(1 / 10));
    });

    test('should return NaN for zero input value', () => {
      expect(ACOT(0)).toBe(1.5707963267948966);
    });

    test('should return NaN for non-numeric or invalid values', () => {
      expect(ACOT(null)).toBe(1.5707963267948966);
      expect(ACOT(undefined)).toBe(1.5707963267948966);
      expect(ACOT('')).toBe(1.5707963267948966);
      expect(ACOT('abc')).toBe(NaN);
      expect(ACOT([])).toBe(1.5707963267948966);
      expect(ACOT({})).toBe(NaN);
      expect(ACOT(true)).toBe(0.7853981633974483);
      expect(ACOT(false)).toBe(1.5707963267948966);
    });
  });


  describe('ACOTH function', () => {
    test('should return the inverse hyperbolic cotangent of a number', () => {
      // Test cases for known values
      expect(ACOTH(1)).toBe(Infinity);
      expect(ACOTH(2)).toBeCloseTo(0.5493061443340549);
      expect(ACOTH(5)).toBeCloseTo(0.2027325540540821);
      expect(ACOTH(10)).toBeCloseTo(0.09966865249116204);
    });

    test('should return NaN for invalid input values', () => {
      expect(ACOTH(0)).toBe(NaN);
      expect(ACOTH(1)).toBe(Infinity);
      expect(ACOTH(-1)).toBe(-Infinity);
      expect(ACOTH(null)).toBe(NaN);
      expect(ACOTH(undefined)).toBe(NaN);
      expect(ACOTH('')).toBe(NaN);
      expect(ACOTH('abc')).toBe(NaN);
      expect(ACOTH([])).toBe(NaN);
      expect(ACOTH({})).toBe(NaN);
      expect(ACOTH(true)).toBe(Infinity);
      expect(ACOTH(false)).toBe(NaN);
    });
  });

  describe('ASIN function', () => {
    test('should return the arcsine of a number', () => {
      // Test cases for known values
      expect(ASIN(0)).toBe(0);
      expect(ASIN(0.5)).toBeCloseTo(0.5235987755982988);
      expect(ASIN(1)).toBeCloseTo(1.5707963267948966);
      expect(ASIN(-0.5)).toBeCloseTo(-0.5235987755982988);
      expect(ASIN(-1)).toBeCloseTo(-1.5707963267948966);
    });

    test('should return NaN for invalid input values', () => {
      expect(ASIN(2)).toBe(NaN); // ASIN(2) is undefined
      expect(ASIN(-2)).toBe(NaN); // ASIN(-2) is undefined
      expect(ASIN(null)).toBe(0);
      expect(ASIN(undefined)).toBe(0);
      expect(ASIN('')).toBe(0);
      expect(ASIN('abc')).toBe(NaN);
      expect(ASIN([])).toBe(0);
      expect(ASIN({})).toBe(NaN);
      expect(ASIN(true)).toBe(1.5707963267948966);
      expect(ASIN(false)).toBe(0);
    });
  });

  describe('ASINH function', () => {
    test('should return the inverse hyperbolic sine of a number', () => {
      // Test cases for known values
      expect(ASINH(0)).toBe(0);
      expect(ASINH(1)).toBeCloseTo(0.881373587019543);
      expect(ASINH(-1)).toBeCloseTo(-0.881373587019543);
      expect(ASINH(2)).toBeCloseTo(1.4436354751788103);
      expect(ASINH(-2)).toBeCloseTo(-1.4436354751788103);
    });

    test('should return NaN for invalid input values', () => {
      expect(ASINH(null)).toBe(0);
      expect(ASINH(undefined)).toBe(0);
      expect(ASINH('')).toBe(0);
      expect(ASINH('abc')).toBe(NaN);
      expect(ASINH([])).toBe(0);
      expect(ASINH({})).toBe(NaN);
      expect(ASINH(true)).toBe(0.881373587019543);
      expect(ASINH(false)).toBe(0);
    });
  });

  describe('ATAN function', () => {
    test('should return the arctangent (in radians) of a number', () => {
      // Test cases for known values
      expect(ATAN(0)).toBe(0);
      expect(ATAN(1)).toBeCloseTo(0.7853981633974483);
      expect(ATAN(-1)).toBeCloseTo(-0.7853981633974483);
      expect(ATAN(Infinity)).toBeCloseTo(Math.PI / 2);
      expect(ATAN(-Infinity)).toBeCloseTo(-Math.PI / 2);
    });

    test('should return NaN for invalid input values', () => {
      expect(ATAN(null)).toBe(0);
      expect(ATAN(undefined)).toBe(0);
      expect(ATAN('')).toBe(0);
      expect(ATAN('abc')).toBe(NaN);
      expect(ATAN([])).toBe(0);
      expect(ATAN({})).toBe(NaN);
      expect(ATAN(true)).toBe(0.7853981633974483);
      expect(ATAN(false)).toBe(0);
    });
  });

  describe('ATAN2 function', () => {
    test('should return the arctangent of the quotient of its arguments', () => {
      // Test cases for known values
      expect(ATAN2(0, 1)).toBe(0);
      expect(ATAN2(1, 1)).toBeCloseTo(0.7853981633974483);
      expect(ATAN2(-1, 1)).toBeCloseTo(-0.7853981633974483);
      expect(ATAN2(0, -1)).toBeCloseTo(Math.PI);
      expect(ATAN2(1, -1)).toBeCloseTo(2.356194490192345);
      expect(ATAN2(-1, -1)).toBeCloseTo(-2.356194490192345);
      expect(ATAN2(1, 0)).toBeCloseTo(Math.PI / 2);
      expect(ATAN2(-1, 0)).toBeCloseTo(-Math.PI / 2);
    });

    test('should return NaN for invalid input values', () => {
      expect(ATAN2(null, null)).toBe(0);
      expect(ATAN2(undefined, undefined)).toBe(0);
      expect(ATAN2('', '')).toBe(0);
      expect(ATAN2('abc', 'def')).toBe(NaN);
      expect(ATAN2([], [])).toBe(0);
      expect(ATAN2({}, {})).toBe(NaN);
      expect(ATAN2(true, false)).toBe(1.5707963267948966);
      expect(ATAN2(1, null)).toBe(1.5707963267948966);
      expect(ATAN2(undefined, 2)).toBe(0);
    });
  });

  describe('ATANH function', () => {
    test('should return the inverse hyperbolic tangent of the input value', () => {
      // Test cases for known values
      expect(ATANH(0)).toBe(0);
      expect(ATANH(0.5)).toBeCloseTo(0.5493061443340548);
      expect(ATANH(0.9)).toBeCloseTo(1.4722194895832204);
      expect(ATANH(-0.5)).toBeCloseTo(-0.5493061443340548);
      expect(ATANH(-0.9)).toBeCloseTo(-1.4722194895832204);
      expect(ATANH(0.99)).toBeCloseTo(2.646652412362245);
      expect(ATANH(-0.99)).toBeCloseTo(-2.646652412362245);
    });

    test('should return NaN for invalid input values', () => {
      expect(ATANH(null)).toBe(0);
      expect(ATANH(undefined)).toBe(0);
      expect(ATANH('')).toBe(0);
      expect(ATANH('abc')).toBe(NaN);
      expect(ATANH([])).toBe(0);
      expect(ATANH({})).toBe(NaN);
      expect(ATANH(true)).toBe(Infinity);
    });
  });

  describe('COS function', () => {
    test('should return the cosine of the input value', () => {
      // Test cases for known values
      expect(COS(0)).toBe(1);
      expect(COS(Math.PI)).toBeCloseTo(-1);
      expect(COS(Math.PI / 2)).toBeCloseTo(0);
      expect(COS(Math.PI / 4)).toBeCloseTo(Math.sqrt(2) / 2);
      expect(COS(Math.PI * 2)).toBeCloseTo(1);
    });

    test('should return NaN for invalid input values', () => {
      expect(COS(null)).toBe(1);
      expect(COS(undefined)).toBe(1);
      expect(COS('')).toBe(1);
      expect(COS('abc')).toBe(NaN);
      expect(COS([])).toBe(1);
      expect(COS({})).toBe(NaN);
      expect(COS(true)).toBe(0.5403023058681398);
    });
  });

  describe('COSH function', () => {
    test('should return the hyperbolic cosine of the input value', () => {
      // Test cases for known values
      expect(COSH(0)).toBe(1);
      expect(COSH(1)).toBeCloseTo(1.543);
      expect(COSH(-1)).toBeCloseTo(1.543);
      expect(COSH(2)).toBeCloseTo(3.762);
      expect(COSH(-2)).toBeCloseTo(3.762);
      expect(COSH(0.5)).toBeCloseTo(1.127);
    });

    test('should return NaN for invalid input values', () => {
      expect(COSH(null)).toBe(1);
      expect(COSH(undefined)).toBe(1);
      expect(COSH('')).toBe(1);
      expect(COSH('abc')).toBe(NaN);
      expect(COSH([])).toBe(1);
      expect(COSH({})).toBe(NaN);
      expect(COSH(true)).toBe(1.5430806348152437);
    });
  });

  describe('COT function', () => {
    test('should return the cotangent of the input value', () => {
      // Test cases for known values
      expect(COT(0)).toBe(Number.POSITIVE_INFINITY);
      expect(COT(Math.PI / 4)).toBeCloseTo(1);
      expect(COT(Math.PI / 6)).toBeCloseTo(1.732);
      expect(COT(Math.PI / 3)).toBeCloseTo(0.577);
      expect(COT(-Math.PI / 4)).toBeCloseTo(-1);
      expect(COT(-Math.PI / 6)).toBeCloseTo(-1.732);
      expect(COT(-Math.PI / 3)).toBeCloseTo(-0.577);
    });

    test('should return NaN for invalid input values', () => {
      expect(COT(null)).toBe(Infinity);
      expect(COT(undefined)).toBe(Infinity);
      expect(COT('')).toBe(Infinity);
      expect(COT('abc')).toBe(NaN);
      expect(COT([])).toBe(Infinity);
      expect(COT({})).toBe(NaN);
      expect(COT(true)).toBe(0.6420926159343306);
    });
  });

  describe('COTH function', () => {
    test('should return the hyperbolic cotangent of the input value', () => {
      // Test cases for known values
      expect(COTH(0)).toBe(Number.POSITIVE_INFINITY);
      expect(COTH(1)).toBeCloseTo(1.313);
      expect(COTH(2)).toBeCloseTo(1.037);
      expect(COTH(3)).toBeCloseTo(1.004);
      expect(COTH(-1)).toBeCloseTo(-1.313);
      expect(COTH(-2)).toBeCloseTo(-1.037);
      expect(COTH(-3)).toBeCloseTo(-1.004);
    });

    test('should return NaN for invalid input values', () => {
      expect(COTH(null)).toBe(Infinity);
      expect(COTH(undefined)).toBe(Infinity);
      expect(COTH('')).toBe(Infinity);
      expect(COTH('abc')).toBe(NaN);
      expect(COTH([])).toBe(Infinity);
      expect(COTH({})).toBe(NaN);
      expect(COTH(true)).toBe(1.3130352854993312);
    });
  });

  describe('CSC function', () => {
    test('should return the cosecant of the input value', () => {
      // Test cases for known values
      expect(CSC(0)).toBe(Number.POSITIVE_INFINITY);
      expect(CSC(Math.PI / 6)).toBeCloseTo(2);
      expect(CSC(Math.PI / 4)).toBeCloseTo(Math.sqrt(2));
      expect(CSC(Math.PI / 3)).toBeCloseTo(2 / Math.sqrt(3));
      expect(CSC(Math.PI / 2)).toBe(1);
      expect(CSC(-Math.PI / 6)).toBeCloseTo(-2);
      expect(CSC(-Math.PI / 4)).toBeCloseTo(-Math.sqrt(2));
      expect(CSC(-Math.PI / 3)).toBeCloseTo(-2 / Math.sqrt(3));
      expect(CSC(-Math.PI / 2)).toBe(-1);
    });

    test('should return NaN for invalid input values', () => {
      expect(CSC(null)).toBe(Infinity);
      expect(CSC(undefined)).toBe(Infinity);
      expect(CSC('')).toBe(Infinity);
      expect(CSC('abc')).toBe(NaN);
      expect(CSC([])).toBe(Infinity);
      expect(CSC({})).toBe(NaN);
      expect(CSC(true)).toBe(1.1883951057781212);
    });
  });


  describe('CSCH function', () => {
    test('should return the hyperbolic cosecant of the input value', () => {
      // Test cases for known values
      expect(CSCH(0)).toBe(Number.POSITIVE_INFINITY);
      expect(CSCH(1)).toBeCloseTo(0.8509181282393216);
      expect(CSCH(2)).toBeCloseTo(0.2757205647717834);
      expect(CSCH(-1)).toBeCloseTo(-0.8509181282393216);
      expect(CSCH(-2)).toBeCloseTo(-0.2757205647717834);
    });

    test('should return NaN for invalid input values', () => {
      expect(CSCH(null)).toBe(Infinity);
      expect(CSCH(undefined)).toBe(Infinity);
      expect(CSCH('')).toBe(Infinity);
      expect(CSCH('abc')).toBe(NaN);
      expect(CSCH([])).toBe(Infinity);
      expect(CSCH({})).toBe(NaN);
      expect(CSCH(true)).toBe(0.8509181282393216);
    });
  });


  describe('E function', () => {
    test('should return the mathematical constant e', () => {
      expect(E()).toBe(Math.E);
    });
  });

  describe('EVEN function', () => {
    test('should return the nearest even integer greater than or equal to the given value', () => {
      expect(EVEN(3)).toBe(4);
      expect(EVEN(4)).toBe(4);
      expect(EVEN(5)).toBe(6);
      expect(EVEN(6)).toBe(6);
    });

    test('should return the input value if it is already an even integer', () => {
      expect(EVEN(2)).toBe(2);
      expect(EVEN(0)).toBe(0);
      expect(EVEN(-2)).toBe(-2);
      expect(EVEN(-4)).toBe(-4);
    });

    test('should return the nearest even integer greater than or equal to the given value if it is not an integer', () => {
      expect(EVEN(2.1)).toBe(4);
      expect(EVEN(2.5)).toBe(4);
      expect(EVEN(3.7)).toBe(4);
      expect(EVEN(-3.3)).toBe(-2);
      expect(EVEN(-2.8)).toBe(-2);
      expect(EVEN(-1.5)).toBe(0);
    });
  });

  describe('EXP function', () => {
    test('should return the exponential value of the given number', () => {
      expect(EXP(0)).toBe(1);
      expect(EXP(1)).toBeCloseTo(Math.E);
      expect(EXP(2)).toBeCloseTo(Math.exp(2));
      expect(EXP(-1)).toBeCloseTo(1 / Math.E);
      expect(EXP(-2)).toBeCloseTo(1 / Math.exp(2));
    });

    test('should return NaN if the input is not a number', () => {
      expect(EXP('hello')).toBeNaN();
      expect(EXP([])).toBe(1);
      expect(EXP({})).toBeNaN();
      expect(EXP(null)).toBe(1);
      expect(EXP(undefined)).toBe(1);
    });
  });

  describe('LN function', () => {
    test('should return the natural logarithm of the given number', () => {
      expect(LN(1)).toBeCloseTo(0);
      expect(LN(Math.E)).toBeCloseTo(1);
      expect(LN(10)).toBeCloseTo(Math.log(10));
      expect(LN(0.5)).toBeCloseTo(Math.log(0.5));
    });

    test('should return NaN if the input is not a number', () => {
      expect(LN('hello')).toBeNaN();
      expect(LN([])).toBe(-Infinity);
      expect(LN({})).toBeNaN();
      expect(LN(null)).toBe(-Infinity);
      expect(LN(undefined)).toBe(-Infinity);
    });

    test('should return NaN if the input is zero or negative', () => {
      expect(LN(0)).toBe(-Infinity);
      expect(LN(-1)).toBeNaN();
    });
  });

  describe('LOG function', () => {
    test('should return the logarithm of the given number with the specified base', () => {
      // Test some known values
      expect(LOG(10, 10)).toBeCloseTo(1);
      expect(LOG(100, 10)).toBeCloseTo(2);
      expect(LOG(1000, 10)).toBeCloseTo(3);
      expect(LOG(2, 2)).toBeCloseTo(1);
      expect(LOG(8, 2)).toBeCloseTo(3);

      // Test edge cases
      expect(LOG(1, 10)).toBeCloseTo(0);
      expect(LOG(1, 2)).toBeCloseTo(0);
    });

    test('should return NaN if the input or base is not a number or is less than or equal to 0', () => {
      expect(LOG('hello', 10)).toBeNaN();
      expect(LOG(10, 'world')).toBeNaN();
      expect(LOG([], 10)).toBe(-Infinity);
      expect(LOG(10, [])).toBe(-0);
      expect(LOG(10, 0)).toBe(-0);
      expect(LOG(10, -1)).toBeNaN();
      expect(LOG(10, 1)).toBe(Infinity);
    });
  });

  describe('MOD function', () => {
    test('should return the modulus of the given value and divisor', () => {
      // Test some known values
      expect(MOD(10, 3)).toBe(1);
      expect(MOD(10, 5)).toBe(0);
      expect(MOD(-10, 3)).toBe(2);
      expect(MOD(10, -3)).toBe(-1);
      expect(MOD(-10, -3)).toBe(4);
      expect(MOD(5.5, 2)).toBeCloseTo(1.5);
      expect(MOD(7.8, 3.2)).toBeCloseTo(1.4);

      // Test with zero divisor
      expect(MOD(10, 0)).toBeNaN();
      expect(MOD(0, 0)).toBeNaN();
      expect(MOD(-10, 0)).toBeNaN();
      expect(MOD(10, -0)).toBeNaN();
    });

    test('should return NaN if the input or divisor is not a number', () => {
      expect(MOD('hello', 3)).toBeNaN();
      expect(MOD(10, 'world')).toBeNaN();
      expect(MOD([], 3)).toBe(0);
      expect(MOD(10, [])).toBeNaN();
    });
  });

  describe('ODD function', () => {
    test('should return the nearest odd integer greater than the given value', () => {
      // Test some known values
      expect(ODD(10)).toBe(11);
      expect(ODD(5)).toBe(5);
      expect(ODD(6)).toBe(7);
      expect(ODD(-10)).toBe(-11);
      expect(ODD(-5)).toBe(-5);
      expect(ODD(-6)).toBe(-7);
      expect(ODD(5.5)).toBe(7);
      expect(ODD(7.8)).toBe(9);

      // Test with zero
      expect(ODD(0)).toBe(1);
      expect(ODD(-0)).toBe(1);

      // Test with negative values
      expect(ODD(-3)).toBe(-3);
      expect(ODD(-2)).toBe(-3);
      expect(ODD(-1)).toBe(-1);
      expect(ODD(-0.5)).toBe(-1);
      expect(ODD(-1.5)).toBe(-3);
    });

    test('should return NaN if the input value is not a number', () => {
      expect(ODD('hello')).toBeNaN();
      expect(ODD([])).toBe(1);
    });
  });

  describe('PI function', () => {
    test('should return the mathematical constant PI', () => {
      expect(PI()).toBe(Math.PI);
    });
  });

  describe('POWER function', () => {
    test('should return the value raised to the power', () => {
      expect(POWER(2, 3)).toBe(8); // 2^3 = 8
      expect(POWER(3, 2)).toBe(9); // 3^2 = 9
      expect(POWER(4, 0.5)).toBe(2); // 4^(1/2) = 2
    });

    test('should return NaN for invalid inputs', () => {
      expect(POWER('abc', 2)).toBeNaN();
      expect(POWER(2, 'abc')).toBeNaN();
    });
  });

  describe('RANDBETWEEN function', () => {
    test('should generate random integers within the specified range', () => {
      const bottom = 10;
      const top = 20;
      const randomNumber = RANDBETWEEN(bottom, top);
      expect(randomNumber).toBeGreaterThanOrEqual(bottom);
      expect(randomNumber).toBeLessThanOrEqual(top);
    });

    test('should handle negative numbers', () => {
      const bottom = -20;
      const top = -10;
      const randomNumber = RANDBETWEEN(bottom, top);
      expect(randomNumber).toBeGreaterThanOrEqual(bottom);
      expect(randomNumber).toBeLessThanOrEqual(top);
    });

    test('should handle non-integer input', () => {
      const bottom = 5.5;
      const top = 15.5;
      const randomNumber = RANDBETWEEN(bottom, top);
      expect(Number.isInteger(randomNumber)).toBe(false);
      expect(randomNumber).toBeGreaterThanOrEqual(Math.floor(bottom));
      expect(randomNumber).toBeLessThanOrEqual(Math.ceil(top));
    });
  });

  describe('ROUND function', () => {
    test('should round positive numbers to the specified number of digits', () => {
      expect(ROUND(1.234, 2)).toBe(1.23);
      expect(ROUND(1.235, 2)).toBe(1.24);
      expect(ROUND(1234.5678, -2)).toBe(1200);
    });

    test('should round negative numbers to the specified number of digits', () => {
      expect(ROUND(-1.234, 2)).toBe(-1.23);
      expect(ROUND(-1.235, 2)).toBe(-1.24);
      expect(ROUND(-1234.5678, -2)).toBe(-1200);
    });

    test('should handle rounding to zero digits', () => {
      expect(ROUND(1234.5678, 0)).toBe(1235);
      expect(ROUND(-1234.5678, 0)).toBe(-1235);
    });

    test('should handle rounding to a large number of digits', () => {
      expect(ROUND(1.234, 5)).toBe(1.234);
      expect(ROUND(-1.234, 5)).toBe(-1.234);
    });

    test('should handle non-numeric input', () => {
      expect(ROUND('abc', 2)).toBeNaN();
      expect(ROUND(null, 2)).toBe(0);
      expect(ROUND(undefined, 2)).toBe(0);
    });
  });

  describe('BASE function', () => {
    test('should convert number to string with specified radix', () => {
      expect(BASE(10, 2, 0)).toBe('1010'); // Decimal 10 is binary 1010
      expect(BASE(10, 16, 0)).toBe('a');   // Decimal 10 is hexadecimal 'a'
      expect(BASE(255, 16, 0)).toBe('ff'); // Decimal 255 is hexadecimal 'ff'
      expect(BASE(15, 2, 0)).toBe('1111'); // Decimal 15 is binary 1111
    });

    test('should pad with zeros to meet minimum length', () => {
      expect(BASE(10, 2, 8)).toBe('00001010'); // Minimum length 8
      expect(BASE(10, 16, 4)).toBe('000a');    // Minimum length 4
    });

    test('should handle non-numeric input', () => {
      expect(BASE('abc', 2, 0)).toBe('NaN');
      expect(BASE(null, 2, 0)).toBe('0');
      expect(BASE(undefined, 2, 0)).toBe('0');
    });

    test('should throw error if minimum length exceeds limit', () => {
      expect(() => BASE(10, 2, 10000)).toThrowError();
    });
  });

  describe('SIN function', () => {
    test('should return the sine of a given angle in radians', () => {
      expect(SIN(0)).toBeCloseTo(0);
      expect(SIN(Math.PI / 2)).toBeCloseTo(1);
      expect(SIN(Math.PI)).toBeCloseTo(0);
      expect(SIN(3 * Math.PI / 2)).toBeCloseTo(-1);
      expect(SIN(2 * Math.PI)).toBeCloseTo(0);
    });

    test('should return NaN for non-numeric input', () => {
      expect(SIN('abc')).toBeNaN();
      expect(SIN(null)).toBe(0);
      expect(SIN(undefined)).toBe(0);
    });
  });
});
