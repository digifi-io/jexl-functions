import InformationModule from './information';

const {
  ISEVEN,
  ISTEXT,
  ISNONTEXT,
  ISNULL,
  ISNOTNULL,
  ISUNDEFINED,
  ISNOTUNDEFINED,
  ISEMPTY,
  ISNOTEMPTY,
  ISODD,
  ISNUMBER,
  ISFINITE,
  ISNAN,
  ISDATESTRING,
  ISBLANK,
  ISEMPTYORBLANK,
  ISNOTEMPTYORBLANK,
  ISEMPTYARRAY,
  ISNOTEMPTYARRAY,
} = InformationModule();

describe('Information Module', () => {
  describe('ISEVEN function', () => {
    test('should return true for even numbers', () => {
      expect(ISEVEN(2)).toBe(true);
      expect(ISEVEN(0)).toBe(true);
      expect(ISEVEN(-4)).toBe(true);
    });

    test('should return false for odd numbers', () => {
      expect(ISEVEN(3)).toBe(false);
      expect(ISEVEN(-5)).toBe(false);
      expect(ISEVEN(17)).toBe(false);
    });

    test('should return true for even strings representing numbers', () => {
      expect(ISEVEN('6')).toBe(true);
      expect(ISEVEN('-8')).toBe(true);
    });

    test('should return false for odd strings representing numbers', () => {
      expect(ISEVEN('9')).toBe(false);
      expect(ISEVEN('-3')).toBe(false);
    });

    test('should return false for string and empty object values', () => {
      expect(ISEVEN('hello')).toBe(false);
      expect(ISEVEN({})).toBe(false);
    });

    test('should return true for an empty array, null and undefined values', () => {
      expect(ISEVEN([])).toBe(true);
      expect(ISEVEN(null)).toBe(true);
      expect(ISEVEN(undefined)).toBe(true);
    });
  });

  describe('ISTEXT function', () => {
    test('should return true for text values', () => {
      expect(ISTEXT('hello')).toBe(true);
      expect(ISTEXT('123')).toBe(true);
      expect(ISTEXT('true')).toBe(true);
    });

    test('should return false for non-text values', () => {
      expect(ISTEXT(123)).toBe(false);
      expect(ISTEXT(true)).toBe(false);
      expect(ISTEXT(null)).toBe(false);
      expect(ISTEXT(undefined)).toBe(false);
      expect(ISTEXT([])).toBe(false);
      expect(ISTEXT({})).toBe(false);
    });
  });

  describe('ISNONTEXT function', () => {
    test('should return true for non-text values', () => {
      expect(ISNONTEXT(123)).toBe(true);
      expect(ISNONTEXT(true)).toBe(true);
      expect(ISNONTEXT(null)).toBe(true);
      expect(ISNONTEXT(undefined)).toBe(true);
      expect(ISNONTEXT([])).toBe(true);
      expect(ISNONTEXT({})).toBe(true);
    });

    test('should return false for text values', () => {
      expect(ISNONTEXT('hello')).toBe(false);
      expect(ISNONTEXT('123')).toBe(false);
      expect(ISNONTEXT('true')).toBe(false);
    });
  });

  describe('ISNULL function', () => {
    test('should return true for null values', () => {
      expect(ISNULL(null)).toBe(true);
    });

    test('should return false for non-null values', () => {
      expect(ISNULL(undefined)).toBe(false);
      expect(ISNULL(0)).toBe(false);
      expect(ISNULL('')).toBe(false);
      expect(ISNULL(false)).toBe(false);
      expect(ISNULL([])).toBe(false);
      expect(ISNULL({})).toBe(false);
    });
  });

  describe('ISNOTNULL function', () => {
    test('should return true for non-null values', () => {
      expect(ISNOTNULL(undefined)).toBe(true);
      expect(ISNOTNULL(0)).toBe(true);
      expect(ISNOTNULL('')).toBe(true);
      expect(ISNOTNULL(false)).toBe(true);
      expect(ISNOTNULL([])).toBe(true);
      expect(ISNOTNULL({})).toBe(true);
    });

    test('should return false for null values', () => {
      expect(ISNOTNULL(null)).toBe(false);
    });
  });

  describe('ISUNDEFINED function', () => {
    test('should return true for undefined values', () => {
      expect(ISUNDEFINED(undefined)).toBe(true);
    });

    test('should return false for defined values', () => {
      expect(ISUNDEFINED(null)).toBe(false);
      expect(ISUNDEFINED(0)).toBe(false);
      expect(ISUNDEFINED('')).toBe(false);
      expect(ISUNDEFINED(false)).toBe(false);
      expect(ISUNDEFINED([])).toBe(false);
      expect(ISUNDEFINED({})).toBe(false);
    });
  });

  describe('ISNOTUNDEFINED function', () => {
    test('should return true for defined values', () => {
      expect(ISNOTUNDEFINED(null)).toBe(true);
      expect(ISNOTUNDEFINED(0)).toBe(true);
      expect(ISNOTUNDEFINED('')).toBe(true);
      expect(ISNOTUNDEFINED(false)).toBe(true);
      expect(ISNOTUNDEFINED([])).toBe(true);
      expect(ISNOTUNDEFINED({})).toBe(true);
    });

    test('should return false for undefined values', () => {
      expect(ISNOTUNDEFINED(undefined)).toBe(false);
    });
  });

  describe('ISEMPTY function', () => {
    test('should return true for null and undefined values', () => {
      expect(ISEMPTY(null)).toBe(true);
      expect(ISEMPTY(undefined)).toBe(true);
    });

    test('should return true when checkForEmptyString is true and value is an empty string', () => {
      expect(ISEMPTY('', true)).toBe(true);
    });

    test('should return false for non-empty values', () => {
      expect(ISEMPTY(0)).toBe(false);
      expect(ISEMPTY(false)).toBe(false);
      expect(ISEMPTY([])).toBe(false);
      expect(ISEMPTY({})).toBe(false);
      expect(ISEMPTY('')).toBe(false);
    });

    test('should return false when checkForEmptyString is false and value is an empty string', () => {
      expect(ISEMPTY('')).toBe(false);
      expect(ISEMPTY('', false)).toBe(false);
    });
  });

  describe('ISNOTEMPTY function', () => {
    test('should return false for null and undefined values', () => {
      expect(ISNOTEMPTY(null)).toBe(false);
      expect(ISNOTEMPTY(undefined)).toBe(false);
    });

    test('should return false when checkForEmptyString is true and value is an empty string', () => {
      expect(ISNOTEMPTY('', true)).toBe(false);
    });

    test('should return true for non-empty values', () => {
      expect(ISNOTEMPTY(0)).toBe(true);
      expect(ISNOTEMPTY(false)).toBe(true);
      expect(ISNOTEMPTY([])).toBe(true);
      expect(ISNOTEMPTY({})).toBe(true);
      expect(ISNOTEMPTY('')).toBe(true); // Empty string is considered non-empty when checkForEmptyString is false
    });

    test('should return true when checkForEmptyString is false and value is an empty string', () => {
      expect(ISNOTEMPTY('')).toBe(true);
      expect(ISNOTEMPTY('', false)).toBe(true);
    });
  });

  describe('ISODD function', () => {
    test('should return true for odd numbers', () => {
      expect(ISODD(1)).toBe(true);
      expect(ISODD(-1)).toBe(true);
      expect(ISODD(3)).toBe(true);
    });

    test('should return false for even numbers', () => {
      expect(ISODD(0)).toBe(false);
      expect(ISODD(2)).toBe(false);
      expect(ISODD(-4)).toBe(false);
    });

    test('should return false for non-numeric values', () => {
      expect(ISODD('')).toBe(false);
      expect(ISODD(null)).toBe(false);
      expect(ISODD(undefined)).toBe(false);
      expect(ISODD([])).toBe(false);
    });

    test('should return true for true and for an empty object value', () => {
      expect(ISODD(true)).toBe(true);
      expect(ISODD({})).toBe(true);
    })
  });

  describe('ISNUMBER function', () => {
    test('should return true for numbers', () => {
      expect(ISNUMBER(5)).toBe(true);
      expect(ISNUMBER(-10)).toBe(true);
      expect(ISNUMBER(0)).toBe(true);
      expect(ISNUMBER(3.14)).toBe(true);
      expect(ISNUMBER(Number.MAX_VALUE)).toBe(true);
      expect(ISNUMBER(Number.MIN_VALUE)).toBe(true);
      expect(ISNUMBER(NaN)).toBe(true);
    });

    test('should return false for non-numbers', () => {
      expect(ISNUMBER('5')).toBe(false);
      expect(ISNUMBER(null)).toBe(false);
      expect(ISNUMBER(undefined)).toBe(false);
      expect(ISNUMBER(true)).toBe(false);
      expect(ISNUMBER([])).toBe(false);
      expect(ISNUMBER({})).toBe(false);
    });
  });

  describe('ISFINITE function', () => {
    test('should return true for finite numbers', () => {
      expect(ISFINITE(5)).toBe(true);
      expect(ISFINITE(-10)).toBe(true);
      expect(ISFINITE(0)).toBe(true);
      expect(ISFINITE(3.14)).toBe(true);
      expect(ISFINITE(Number.MAX_VALUE)).toBe(true);
      expect(ISFINITE(Number.MIN_VALUE)).toBe(true);
    });

    test('should return false for non-finite numbers', () => {
      expect(ISFINITE(Infinity)).toBe(false);
      expect(ISFINITE(-Infinity)).toBe(false);
      expect(ISFINITE(NaN)).toBe(false);
      expect(ISFINITE(null)).toBe(false);
      expect(ISFINITE(undefined)).toBe(false);
      expect(ISFINITE('5')).toBe(false);
      expect(ISFINITE(true)).toBe(false);
      expect(ISFINITE([])).toBe(false);
      expect(ISFINITE({})).toBe(false);
    });
  });

  describe('ISNAN function', () => {
    test('should return true for NaN', () => {
      expect(ISNAN(NaN)).toBe(true);
      expect(ISNAN(Number.NaN)).toBe(true); // Same as NaN
    });

    test('should return false for non-NaN values', () => {
      expect(ISNAN(5)).toBe(false);
      expect(ISNAN(-10)).toBe(false);
      expect(ISNAN(0)).toBe(false);
      expect(ISNAN(3.14)).toBe(false);
      expect(ISNAN(Number.MAX_VALUE)).toBe(false);
      expect(ISNAN(Number.MIN_VALUE)).toBe(false);
      expect(ISNAN(Infinity)).toBe(false);
      expect(ISNAN(-Infinity)).toBe(false);
      expect(ISNAN(null)).toBe(false);
      expect(ISNAN('5')).toBe(false);
      expect(ISNAN(true)).toBe(false);
      expect(ISNAN([])).toBe(false);
    });

    test('should return true for non NaN values', () => {
      expect(ISNAN(undefined)).toBe(true);
      expect(ISNAN({})).toBe(true);
    });
  });

  describe('ISDATESTRING function', () => {
    test('should return true for valid date strings', () => {
      expect(ISDATESTRING('2024-03-12')).toBe(true);
      expect(ISDATESTRING('March 12, 2024')).toBe(true);
      expect(ISDATESTRING('03/12/2024', 'MM/DD/YYYY')).toBe(true);
      expect(ISDATESTRING('12/03/2024', 'DD/MM/YYYY')).toBe(true);
    });

    test('should return true for invalid date strings', () => {
      expect(ISDATESTRING('2024-13-32')).toBe(true); // Invalid month and day
    });

    test('should return false for invalid values', () => {
      expect(ISDATESTRING('invalid date')).toBe(false);
      expect(ISDATESTRING('2024.03.12', 'YYYY-MM-DD')).toBe(false); // Invalid format
      expect(ISDATESTRING('March 12, 2024', 'YYYY-MM-DD')).toBe(false); // Invalid format
    });

    test('should return false for numeric values', () => {
      expect(ISDATESTRING(2024)).toBe(false);
      expect(ISDATESTRING(3.14)).toBe(false);
      expect(ISDATESTRING(NaN)).toBe(false);
    });

    test('should return false for non-string values', () => {
      expect(ISDATESTRING(null)).toBe(false);
      expect(ISDATESTRING(undefined)).toBe(false);
      expect(ISDATESTRING(true)).toBe(false);
      expect(ISDATESTRING([])).toBe(false);
      expect(ISDATESTRING({})).toBe(false);
    });
  });

  describe('ISBLANK function', () => {
    test('should return true for an empty string', () => {
      expect(ISBLANK('')).toBe(true);
    });

    test('should return false for non-empty strings', () => {
      expect(ISBLANK('Hello')).toBe(false);
      expect(ISBLANK('   ')).toBe(false); // Non-empty string with whitespace
    });

    test('should return false for non-string values', () => {
      expect(ISBLANK(null)).toBe(false);
      expect(ISBLANK(undefined)).toBe(false);
      expect(ISBLANK(true)).toBe(false);
      expect(ISBLANK(0)).toBe(false);
      expect(ISBLANK([])).toBe(false);
      expect(ISBLANK({})).toBe(false);
    });
  });

  describe('ISEMPTYORBLANK function', () => {
    test('should return true for an empty string', () => {
      expect(ISEMPTYORBLANK('')).toBe(true);
    });

    test('should return true for null', () => {
      expect(ISEMPTYORBLANK(null)).toBe(true);
    });

    test('should return true for undefined', () => {
      expect(ISEMPTYORBLANK(undefined)).toBe(true);
    });

    test('should return false for non-empty strings', () => {
      expect(ISEMPTYORBLANK('Hello')).toBe(false);
      expect(ISEMPTYORBLANK('   ')).toBe(false); // Non-empty string with whitespace
    });

    test('should return false for non-string values', () => {
      expect(ISEMPTYORBLANK(true)).toBe(false);
      expect(ISEMPTYORBLANK(0)).toBe(false);
      expect(ISEMPTYORBLANK([])).toBe(false);
      expect(ISEMPTYORBLANK({})).toBe(false);
    });
  });

  describe('ISNOTEMPTYORBLANK function', () => {
    test('should return false for an empty string', () => {
      expect(ISNOTEMPTYORBLANK('')).toBe(false);
    });

    test('should return false for null', () => {
      expect(ISNOTEMPTYORBLANK(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(ISNOTEMPTYORBLANK(undefined)).toBe(false);
    });

    test('should return true for non-empty strings', () => {
      expect(ISNOTEMPTYORBLANK('Hello')).toBe(true);
      expect(ISNOTEMPTYORBLANK('   ')).toBe(true); // Non-empty string with whitespace
    });

    test('should return true for non-string values', () => {
      expect(ISNOTEMPTYORBLANK(true)).toBe(true);
      expect(ISNOTEMPTYORBLANK(0)).toBe(true);
      expect(ISNOTEMPTYORBLANK([])).toBe(true);
      expect(ISNOTEMPTYORBLANK({})).toBe(true);
    });
  });

  describe('ISEMPTYARRAY function', () => {
    test('should return true for null', () => {
      expect(ISEMPTYARRAY(null)).toBe(true);
    });

    test('should return true for undefined', () => {
      expect(ISEMPTYARRAY(undefined)).toBe(true);
    });

    test('should return true for an empty array', () => {
      expect(ISEMPTYARRAY([])).toBe(true);
    });

    test('should return false for a non-empty array', () => {
      expect(ISEMPTYARRAY([1, 2, 3])).toBe(false);
    });

    test('should return false for non-array values', () => {
      expect(ISEMPTYARRAY(0)).toBe(false);
      expect(ISEMPTYARRAY('')).toBe(false);
      expect(ISEMPTYARRAY({})).toBe(false);
      expect(ISEMPTYARRAY(true)).toBe(false);
    });
  });

  describe('ISNOTEMPTYARRAY function', () => {
    test('should return false for null', () => {
      expect(ISNOTEMPTYARRAY(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(ISNOTEMPTYARRAY(undefined)).toBe(false);
    });

    test('should return false for an empty array', () => {
      expect(ISNOTEMPTYARRAY([])).toBe(false);
    });

    test('should return true for a non-empty array', () => {
      expect(ISNOTEMPTYARRAY([1, 2, 3])).toBe(true);
    });

    test('should return true for non-array values', () => {
      expect(ISNOTEMPTYARRAY(0)).toBe(true);
      expect(ISNOTEMPTYARRAY('')).toBe(true);
      expect(ISNOTEMPTYARRAY({})).toBe(true);
      expect(ISNOTEMPTYARRAY(true)).toBe(true);
    });
  });
});
