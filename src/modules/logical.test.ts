import LogicalModule from './logical';

const {
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
} = LogicalModule();

const ISEMPTY_Mock = jest.fn(() => false);
const ISDATESTRING_Mock = jest.fn(() => true);

jest.mock('./information', () => {
  return () => {
    return {
      ISDATESTRING: (...args: any) => ISDATESTRING_Mock.apply(null, args),
      ISEMPTY: (...args: any) => ISEMPTY_Mock.apply(null, args),
    };
  };
});

describe('Logical Module', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    ISDATESTRING_Mock.mockReturnValue(true);
    ISEMPTY_Mock.mockReturnValue(false);
  });

  describe('AND function', () => {
    test('should return true if all arguments are truthy', () => {
      expect(AND(true, 1, 'hello', {})).toBe(true);
      expect(AND(1, 'hello', {})).toBe(true);
      expect(AND(true, true, true)).toBe(true);
    });

    test('should return false if any argument is falsy', () => {
      expect(AND(true, 0, 'hello')).toBe(false);
      expect(AND(null, 'hello', {}, 0)).toBe(false);
      expect(AND(true, 1, false)).toBe(false);
    });

    test('should ingnore null or undefined and return true', () => {
      expect(AND(true, null, 'hello')).toBe(true);
      expect(AND(undefined, 'hello', {})).toBe(true);
      expect(AND(true, null, undefined)).toBe(true);
    });

    test('should ignore strings and return true', () => {
      expect(AND(true, 'string', 'hello')).toBe(true);
      expect(AND('', 'hello', {})).toBe(true);
      expect(AND(true, 'hello', '')).toBe(true);
    });

    test('should return true for an empty array of arguments', () => {
      expect(AND()).toBe(true);
      expect(AND([])).toBe(true);
      expect(AND('')).toBe(true);
    });
  });

  describe('OR function', () => {
    test('should return true if any argument is truthy', () => {
      expect(OR(true, 1, 'hello', {})).toBe(true);
      expect(OR(1, 'hello', {})).toBe(true);
      expect(OR(true, true, true)).toBe(true);
    });

    test('should return false if all arguments are falsy', () => {
      expect(OR(false, 0, '', null, undefined)).toBe(false);
      expect(OR(null, '', 0)).toBe(false);
      expect(OR('', '', '')).toBe(false);
    });

    test('should return true if any argument is null or undefined', () => {
      expect(OR(true, null, 'hello')).toBe(true);
      expect(OR(undefined, 'hello', {})).toBe(true);
      expect(OR(true, null, undefined)).toBe(true);
    });

    test('should return true if any argument is a string', () => {
      expect(OR(true, 'string', 'hello')).toBe(true);
      expect(OR('', 'hello', {})).toBe(true);
      expect(OR(true, 'hello', '')).toBe(true);
    });

    test('should return false for an empty array of arguments', () => {
      expect(OR()).toBe(false);
    });
  });

  describe('XOR function', () => {
    test('should return true if only one argument is truthy', () => {
      expect(XOR(true, false)).toBe(true);
      expect(XOR(false, true)).toBe(true);
      expect(XOR(true, false, false)).toBe(true);
      expect(XOR(false, true, false)).toBe(true);
      expect(XOR(false, false, true)).toBe(true);
    });

    test('should return false if no arguments are truthy', () => {
      expect(XOR(false, false)).toBe(false);
      expect(XOR(false, false, false)).toBe(false);
      expect(XOR(0, '', null, undefined, false)).toBe(false);
    });

    test('should return false if more than one argument is truthy', () => {
      expect(XOR(true, true)).toBe(false);
      expect(XOR(true, true, true, true)).toBe(false);
    });

    test('should return false if all arguments are falsy', () => {
      expect(XOR(false, false)).toBe(false);
      expect(XOR(false, false, false)).toBe(false);
      expect(XOR(0, '', null, undefined, false)).toBe(false);
    });

    test('should return true if only one argument is truthy, regardless of the number of arguments', () => {
      expect(XOR(true)).toBe(true);
      expect(XOR(true, false)).toBe(true);
      expect(XOR(true, false, false)).toBe(true);
      expect(XOR(true, false, false, false)).toBe(true);
      expect(XOR(true, false, false, false, false)).toBe(true);
    });

    test('should return false for an empty array of arguments', () => {
      expect(XOR()).toBe(false);
    });
  });

  describe('IF function', () => {
    test('should return thenValue if condition is truthy', () => {
      expect(IF(true, 'then', 'else')).toBe('then');
      expect(IF(1, 'then', 'else')).toBe('then');
      expect(IF('truthy', 'then', 'else')).toBe('then');
    });

    test('should return elseValue if condition is falsy', () => {
      expect(IF(false, 'then', 'else')).toBe('else');
      expect(IF(0, 'then', 'else')).toBe('else');
      expect(IF('', 'then', 'else')).toBe('else');
      expect(IF(null, 'then', 'else')).toBe('else');
      expect(IF(undefined, 'then', 'else')).toBe('else');
    });

    test('should return thenValue if condition is truthy, with default elseValue as false', () => {
      expect(IF(true, 'then')).toBe('then');
      expect(IF(1, 'then')).toBe('then');
      expect(IF('truthy', 'then')).toBe('then');
    });

    test('should return false if condition is falsy, with default thenValue as true', () => {
      expect(IF(false)).toBe(false);
      expect(IF(0)).toBe(false);
      expect(IF('')).toBe(false);
      expect(IF(null)).toBe(false);
      expect(IF(undefined)).toBe(false);
    });

    test('should return true if thenValue or elseValue is undefined', () => {
      expect(IF(true)).toBe(true);
    });

    test('should return elseValue if condition is falsy, with default thenValue as 0', () => {
      expect(IF(false, undefined, 'else')).toBe('else');
      expect(IF(0, undefined, 'else')).toBe('else');
      expect(IF('', undefined, 'else')).toBe('else');
      expect(IF(null, undefined, 'else')).toBe('else');
      expect(IF(undefined, undefined, 'else')).toBe('else');
    });

    test('should return thenValue if condition is truthy, with default elseValue as 0', () => {
      expect(IF(true, 'then', undefined)).toBe('then');
      expect(IF(1, 'then', undefined)).toBe('then');
      expect(IF('truthy', 'then', undefined)).toBe('then');
    });
  });

  describe('NOT function', () => {
    test('should return true if logical is false', () => {
      expect(NOT(false)).toBe(true);
      expect(NOT(0)).toBe(true);
      expect(NOT('')).toBe(true);
      expect(NOT(null)).toBe(true);
      expect(NOT(undefined)).toBe(true);
    });

    test('should return false if logical is true', () => {
      expect(NOT(true)).toBe(false);
      expect(NOT(1)).toBe(false);
      expect(NOT('string')).toBe(false);
      expect(NOT({})).toBe(false);
      expect(NOT([])).toBe(false);
    });
  });

  describe('IFS function', () => {
    test('should return correct value based on condition', () => {
      expect(IFS(true, 1, false, 2, true, 3)).toBe(1);
      expect(IFS(false, 1, true, 2, true, 3)).toBe(2);
      expect(IFS(false, 1, false, 2, true, 3)).toBe(3);
    });

    test('should throw an error if no condition is true', () => {
      expect(() => {
        IFS(false, 1, false, 2, false, 3);
      }).toThrow('Condition parameter is not defined');
    });
  });

  describe('TRUE function', () => {
    test('should return true', () => {
      expect(TRUE()).toBe(true);
    });
  });

  describe('FALSE function', () => {
    test('should return false', () => {
      expect(FALSE()).toBe(false);
    });
  });

  describe('SWITCH function', () => {
    test('should return the corresponding value for the provided case', () => {
      expect(SWITCH(2, 1, 'Case 1', 2, 'Case 2', 'Default')).toBe('Case 2');
      expect(SWITCH(3, 1, 'Case 1', 2, 'Case 2', 'Default')).toBe('Default');
    });

    test('should return default case if no match is found', () => {
      expect(SWITCH(4, 1, 'Case 1', 2, 'Case 2', 'Default')).toBe('Default');
    });

    test('should return null if no default case is provided and no match is found', () => {
      expect(SWITCH(4, 1, 'Case 1', 2, 'Case 2')).toBeNull();
    });

    test('should return null if the number of arguments is odd (no default case provided)', () => {
      expect(SWITCH(4, 1, 'Case 1', 2, 'Case 2', 3, 'Extra case')).toBeNull();
    });

    test('should return the default case if the value to switch is null or undefined', () => {
      expect(SWITCH(null, 'Case 1', 1, 'Default')).toBe('Default');
      expect(SWITCH(undefined, 'Case 1', 1, 'Default')).toBe('Default');
    });
  });

  describe('GT function', () => {
    test('should return true if value is greater than compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);
      expect(GT(2, 1)).toBe(true);
      expect(GT('b', 'a')).toBe(true);
      expect(GT(new Date('2022-01-01'), new Date('2021-01-01'))).toBe(true);
    });

    test('should return true if first date is greater than compareTo date', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(GT(new Date('2022-01-01'), new Date('2021-01-01'))).toBe(true);
    });

    test('should return false if value is not greater than compareTo', () => {
      expect(GT(1, 2)).toBe(false);
      expect(GT('a', 'b')).toBe(false);
      expect(GT(new Date('2021-01-01'), new Date('2022-01-01'))).toBe(false);
    });

    test('should handle empty values', () => {
      ISEMPTY_Mock.mockReturnValue(true);

      expect(GT('', 'b')).toBe(false);
    });

    test('should handle date strings', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(GT('2022-01-01', '2021-01-01')).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
      expect(GT('2021-01-01', '2022-01-01')).toBe(false);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2021-01-01');
    });
  });

  describe('LT function', () => {
    test('should return true if value is less than compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(LT(1, 2)).toBe(true);
      expect(LT('a', 'b')).toBe(true);
      expect(LT(new Date('2021-01-01'), new Date('2022-01-01'))).toBe(true);
    });

    test('should return true if date is less than compareTo date', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(LT(new Date('2021-01-01'), new Date('2022-01-01'))).toBe(true);
    });

    test('should return false if value is not less than compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(LT(2, 1)).toBe(false);
      expect(LT('b', 'a')).toBe(false);
    });

    test('should return false if date is NOT less than compareTo date', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(LT(new Date('2022-01-01'), new Date('2021-01-01'))).toBe(false);
    });

    test('should handle empty values', () => {
      expect(LT('', 'b')).toBe(false);
      expect(LT(1, '')).toBe(false);
      expect(LT('', '')).toBe(false);
    });

    test('should handle date strings', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(LT('2021-01-01', '2022-01-01')).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2021-01-01');
      expect(LT('2022-01-01', '2021-01-01')).toBe(false);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
    });
  });

  describe('LTE function', () => {
    test('should return true if value is less than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(LTE(1, 2)).toBe(true);
      expect(LTE(2, 2)).toBe(true);
      expect(LTE('a', 'b')).toBe(true);
      expect(LTE('b', 'b')).toBe(true);
    });

    test('should return true if date is less than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(LTE(new Date('2021-01-01'), new Date('2022-01-01'))).toBe(true);
      expect(LTE(new Date('2022-01-01'), new Date('2022-01-01'))).toBe(true);
    });

    test('should return false if value is not less than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(LTE(2, 1)).toBe(false);
      expect(LTE('b', 'a')).toBe(false);
    });

    test('should return false if date is not less than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(LTE(new Date('2022-01-01'), new Date('2021-01-01'))).toBe(false);
    });

    test('should handle empty values', () => {
      ISEMPTY_Mock.mockReturnValue(true);

      expect(LTE('', 'b')).toBe(false);
      expect(LTE(1, '')).toBe(false);
      expect(LTE('', '')).toBe(false);
      expect(LTE(1, null)).toBe(false);
      expect(LTE(1, undefined)).toBe(false);
    });

    test('should handle date strings', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(LTE('2021-01-01', '2022-01-01')).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2021-01-01');
      expect(LTE('2022-01-01', '2021-01-01')).toBe(false);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
    });
  });

  describe('GTE function', () => {
    test('should return true if value is greater than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(GTE(2, 1)).toBe(true);
      expect(GTE(2, 2)).toBe(true);
      expect(GTE('b', 'a')).toBe(true);
      expect(GTE('b', 'b')).toBe(true);
    });

    test('should return true if date is greater than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(GTE(new Date('2022-01-01'), new Date('2021-01-01'))).toBe(true);
      expect(GTE(new Date('2022-01-01'), new Date('2022-01-01'))).toBe(true);
    });

    test('should return false if value is not greater than or equal to compareTo', () => {
      expect(GTE(1, 2)).toBe(false);
      expect(GTE('a', 'b')).toBe(false);
    });

    test('should return false if date is not greater than or equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(GTE(new Date('2021-01-01'), new Date('2022-01-01'))).toBe(false);
    });

    test('should handle empty values', () => {
      expect(GTE('', 'b')).toBe(false);
      expect(GTE(1, '')).toBe(false);
      expect(GTE('', '')).toBe(false);
    });

    test('should handle undefined or null value', () => {
      expect(GTE(null, 1)).toBe(false);
      expect(GTE(undefined, 1)).toBe(false);
    });

    test('should handle date strings', () => {
      expect(GTE('2022-01-01', '2021-01-01')).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
      expect(GTE('2021-01-01', '2022-01-01')).toBe(false);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2021-01-01');
    });
  });

  describe('RANGE function', () => {
    test('should return true if value is within the range [min, max]', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(RANGE(2, 1, 3)).toBe(true);
      expect(RANGE(1, 1, 3)).toBe(true);
      expect(RANGE(3, 1, 3)).toBe(true);
      expect(RANGE('b', 'a', 'c')).toBe(true);
      expect(RANGE('a', 'a', 'c')).toBe(true);
      expect(RANGE('c', 'a', 'c')).toBe(true);
    });

    test('should return true if date is within the range [min, max]', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(RANGE(new Date('2022-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(true);
      expect(RANGE(new Date('2021-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(true);
      expect(RANGE(new Date('2023-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(true);
    });

    test('should return false if value is not within the range [min, max]', () => {
      ISDATESTRING_Mock.mockReturnValue(false);
      expect(RANGE(0, 1, 3)).toBe(false);
      expect(RANGE(4, 1, 3)).toBe(false);
      expect(RANGE('z', 'a', 'c')).toBe(false);
      expect(RANGE('d', 'a', 'c')).toBe(false);

      ISDATESTRING_Mock.mockReturnValue(true);
      expect(RANGE(new Date('2020-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(false);
      expect(RANGE(new Date('2024-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(false);
    });

    test('should return false if date is not within the range [min, max]', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(RANGE(new Date('2020-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(false);
      expect(RANGE(new Date('2024-01-01'), new Date('2021-01-01'), new Date('2023-01-01'))).toBe(false);
    });

    test('should handle empty values', () => {
      expect(RANGE('', 'a', 'c')).toBe(false);
      expect(RANGE(1, '', 'c')).toBe(false);
      expect(RANGE(1, 'a', '')).toBe(false);
      expect(RANGE('', '', 'c')).toBe(false);
      expect(RANGE('', 'a', '')).toBe(false);
      expect(RANGE(1, '', '')).toBe(false);
    });

    test('should handle undefined or null value', () => {
      expect(RANGE(null, 1, 3)).toBe(false);
      expect(RANGE(undefined, 1, 3)).toBe(false);
    });

    test('should handle date strings', () => {
      expect(RANGE('2022-01-01', '2021-01-01', '2023-01-01')).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
      expect(RANGE('2020-01-01', '2021-01-01', '2023-01-01')).toBe(false);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2020-01-01');
    });

    test('should handle min greater than max', () => {
      expect(RANGE(2, 3, 1)).toBe(true);
      expect(RANGE(1, 3, 1)).toBe(true);
      expect(RANGE(3, 3, 1)).toBe(true);
      expect(RANGE(0, 3, 1)).toBe(false);
      expect(RANGE(4, 3, 1)).toBe(false);
    });
  });

  describe('EQUAL function', () => {
    test('should return true if value is equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(EQUAL(2, 2)).toBe(true);
      expect(EQUAL('abc', 'abc')).toBe(true);
      expect(EQUAL(true, true)).toBe(true);
      expect(EQUAL(false, false)).toBe(true);
      expect(EQUAL(2, '2')).toBe(false); // Different types
    });

    test('should handle date strings', () => {
      ISDATESTRING_Mock.mockReturnValue(true);

      expect(EQUAL('2022-01-01', '2022-01-01')).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
      expect(EQUAL('2022-01-01', new Date('2022-01-01'))).toBe(true);
      expect(ISDATESTRING_Mock).toHaveBeenCalledWith('2022-01-01');
    });
  });

  describe('INCLUDES function', () => {
    test('should return true if value is included in the set', () => {
      expect(INCLUDES(2, [1, 2, 3])).toBe(true);
      expect(INCLUDES('a', ['a', 'b', 'c'])).toBe(true);
      expect(INCLUDES(true, [false, true])).toBe(true);
      expect(INCLUDES(5, [1, 2, 3])).toBe(false);
      expect(INCLUDES('d', ['a', 'b', 'c'])).toBe(false);
      expect(INCLUDES(false, [true])).toBe(false);
    });

    test('should handle empty set', () => {
      expect(INCLUDES(2, [])).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(INCLUDES(undefined, [undefined])).toBe(true);
      expect(INCLUDES(null, [null])).toBe(true);
      expect(INCLUDES(undefined, [null])).toBe(false);
      expect(INCLUDES(null, [undefined])).toBe(false);
    });
  });

  describe('NOTEQUAL function', () => {
    test('should return true if value is not equal to compareTo', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(NOTEQUAL(2, 3)).toBe(true);
      expect(NOTEQUAL('a', 'b')).toBe(true);
      expect(NOTEQUAL(true, false)).toBe(true);
      expect(NOTEQUAL(2, 2)).toBe(false);
      expect(NOTEQUAL('a', 'a')).toBe(false);
      expect(NOTEQUAL(true, true)).toBe(false);
    });

    test('should handle edge cases', () => {
      ISDATESTRING_Mock.mockReturnValue(false);

      expect(NOTEQUAL(undefined, undefined)).toBe(false);
      expect(NOTEQUAL(null, null)).toBe(false);
      expect(NOTEQUAL(undefined, null)).toBe(true);
      expect(NOTEQUAL(null, undefined)).toBe(true);
    });
  });


  describe('NINCLUDES function', () => {
    test('should return true if value is not included in notIncludesSet', () => {
      expect(NINCLUDES(2, [3, 4])).toBe(true);
      expect(NINCLUDES('a', ['b', 'c'])).toBe(true);
      expect(NINCLUDES(true, [false])).toBe(true);
      expect(NINCLUDES(2, [2])).toBe(false);
      expect(NINCLUDES('a', ['a'])).toBe(false);
      expect(NINCLUDES(true, [true])).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(NINCLUDES(undefined, [])).toBe(true);
      expect(NINCLUDES(null, [])).toBe(true);
      expect(NINCLUDES(undefined, [undefined])).toBe(false);
      expect(NINCLUDES(null, [null])).toBe(false);
    });
  });
});
