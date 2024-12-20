import { coerceNullishValueToArray, coerceToNumber, coerceToString } from './coerceUtils';

describe('CoerceUtils', () => {
  describe('coerceToString function', () => {
    test('should return empty string when value is null', () => {
      const value = null;
      expect(coerceToString(value)).toBe('');
    });

    test('should return empty string when value is undefined', () => {
      const value = undefined;
      expect(coerceToString(value)).toBe('');
    });

    test('should return string representation of boolean true', () => {
      const value = true;
      expect(coerceToString(value)).toBe('true');
    });

    test('should return string representation of boolean false', () => {
      const value = false;
      expect(coerceToString(value)).toBe('false');
    });

    test('should return string representation of number', () => {
      const value = 123;
      expect(coerceToString(value)).toBe('123');
    });

    test('should return string representation of object', () => {
      const value = { key: 'value' };
      expect(coerceToString(value)).toBe('[object Object]');
    });

    test('should return string representation of symbol', () => {
      const value = Symbol('symbol');
      expect(coerceToString(value)).toBe('Symbol(symbol)');
    });

    test('should return string representation of string', () => {
      const value = 'string';
      expect(coerceToString(value)).toBe('string');
    });
  });


  describe('coerceToNumber function', () => {
    test('should return 0 when value is null', () => {
      const value = null;
      expect(coerceToNumber(value)).toBe(0);
    });

    test('should return 0 when value is undefined', () => {
      const value = undefined;
      expect(coerceToNumber(value)).toBe(0);
    });

    test('should return 0 when value is an empty string', () => {
      const value = '';
      expect(coerceToNumber(value)).toBe(0);
    });

    test('should return parsed number when value is a string containing a number', () => {
      const value = '123';
      expect(coerceToNumber(value)).toBe(123);
    });

    test('should return parsed number when value is a string containing a floating point number', () => {
      const value = '12.34';
      expect(coerceToNumber(value)).toBe(12.34);
    });

    test('should return parsed number when value is a number', () => {
      const value = 123;
      expect(coerceToNumber(value)).toBe(123);
    });

    test('should return parsed number when value is a boolean true', () => {
      const value = true;
      expect(coerceToNumber(value)).toBe(1);
    });

    test('should return parsed number when value is a boolean false', () => {
      const value = false;
      expect(coerceToNumber(value)).toBe(0);
    });

    test('should return parsed number when value is a numeric string with leading and trailing spaces', () => {
      const value = '  123  ';
      expect(coerceToNumber(value)).toBe(123);
    });

    test('should return NaN when value is a non-numeric string', () => {
      const value = 'abc';
      expect(coerceToNumber(value)).toBe(NaN);
    });

    test('should return NaN when value is an object', () => {
      const value = { key: 'value' };
      expect(coerceToNumber(value)).toBe(NaN);
    });

    test('should throw error when value is a symbol', () => {
      const value = Symbol('symbol');
      expect(() => coerceToNumber(value)).toThrow('Cannot convert a Symbol value to a number');
    });
  });


  describe('coerceNullishValueToArray function', () => {
    test('should return an empty array when value is null', () => {
      const value = null;
      expect(coerceNullishValueToArray(value)).toEqual([]);
    });

    test('should return an empty array when value is undefined', () => {
      const value = undefined;
      expect(coerceNullishValueToArray(value)).toEqual([]);
    });

    test('should return the same array when value is a non-empty array', () => {
      const value = [1, 2, 3];
      // @ts-ignore
      expect(coerceNullishValueToArray(value)).toEqual([1, 2, 3]);
    });

    test('should return an empty array when value is an empty array', () => {
      expect(coerceNullishValueToArray([])).toEqual([]);
    });
  });
});
