import TableModule from './table';

const {
  TABLESUM,
  TABLESUMIF,
  TABLESUMIFS,
  TABLESUMIFSOR,
  TABLECOUNT,
  TABLECOUNTIF,
  TABLECOUNTIFS,
  TABLECOUNTIFSOR,
  TABLEMAX,
  TABLEMAXIF,
  TABLEMAXIFS,
  TABLEMAXIFSOR,
  TABLEMIN,
  TABLEMINIF,
  TABLEMINIFS,
  TABLEMINIFSOR,
  TABLEAVG,
  TABLEAVGIF,
  TABLEAVGIFS,
  TABLEAVGIFSOR,
  TABLEFILTERROWSIF,
  TABLEFILTERROWSIFS,
  TABLEFILTERROWSIFSOR,
  TABLEMATCHESCONDITIONS,
  TABLECONCATROWS,
} = TableModule();

describe('Table Module', () => {
  describe('TABLESUM function', () => {
    test('should calculate the sum of the specified column in the table', () => {
      const table = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 30 },
      ];
      expect(TABLESUM(table, 'value')).toBe(60);

      const anotherTable = [
        { name: 'John', age: 25 },
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 35 },
      ];
      expect(TABLESUM(anotherTable, 'age')).toBe(90);
    });

    test('should handle empty table', () => {
      expect(TABLESUM([], 'value')).toBe(0);
    });

    test('should handle non-numeric values in the column', () => {
      const table = [
        { id: 1, value: 'abc' },
        { id: 2, value: 'def' },
      ];
      expect(TABLESUM(table, 'value')).toBeNaN();
    });

    test('should handle non-existent column', () => {
      const table = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ];
      expect(TABLESUM(table, 'nonexistent')).toBe(0);
    });
  });

  describe('TABLESUMIF function', () => {
    test('should calculate the sum of the specified column in the table based on the given criteria', () => {
      const table = [
        { id: 1, value: 10, category: 'A' },
        { id: 2, value: 20, category: 'B' },
        { id: 3, value: 30, category: 'A' },
      ];
      // Sum values where category is 'A'
      expect(TABLESUMIF(table, 'value', 'category', 'A')).toBe(40);
    });

    test('should handle empty table', () => {
      expect(TABLESUMIF([], 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non-numeric values in the column', () => {
      const table = [
        { id: 1, value: 'abc', category: 'A' },
        { id: 2, value: 'def', category: 'B' },
      ];
      expect(TABLESUMIF(table, 'value', 'category', 'A')).toBeNaN();
    });

    test('should handle non-existent column', () => {
      const table = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ];
      expect(TABLESUMIF(table, 'value', 'nonexistent', 'A')).toBe(0);
    });

    test('should handle non-existent criteria column', () => {
      const table = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ];
      expect(TABLESUMIF(table, 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non string criteria column', () => {
      const table = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ];
      expect(() => TABLESUMIF(table, 'value', 'category', 1))
        .toThrow('Criteria must be a string or array. Provided number');
    });
  });

  describe('TABLESUMIFS function', () => {
    const table = [
      { id: 1, value: 10, category: 'A' },
      { id: 2, value: 20, category: 'B' },
      { id: 3, value: 30, category: 'A' },
    ];

    test('should calculate the sum of the specified column in the table based on the given criteria', () => {
      // Sum values where category is 'A'
      expect(TABLESUMIFS(table, 'value', 'category', 'A')).toBe(40);
    });

    test('should handle empty table', () => {
      expect(TABLESUMIFS([], 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non-numeric values in the column', () => {
      const tableWithNonNumericValues = [
        { id: 1, value: 'abc', category: 'A' },
        { id: 2, value: 'def', category: 'B' },
      ];
      expect(TABLESUMIFS(tableWithNonNumericValues, 'value', 'category', 'A')).toBeNaN();
    });

    test('should handle non-existent column', () => {
      expect(TABLESUMIFS(table, 'value', 'nonexistent', 'A')).toBe(0);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLESUMIFS(table, 'value', 'nonexistent', 'A')).toBe(0);
    });
  });

  describe('TABLESUMIFSOR function', () => {
    const table = [
      { id: 1, value: 10, category: 'A' },
      { id: 2, value: 20, category: 'B' },
      { id: 3, value: 30, category: 'A' },
    ];

    test('should calculate the sum of the specified column in the table based on the given criteria', () => {
      // Sum values where category is 'A'
      expect(TABLESUMIFSOR(table, 'value', 'category', 'A')).toBe(40);
    });

    test('should handle empty table', () => {
      expect(TABLESUMIFSOR([], 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non-numeric values in the column', () => {
      const tableWithNonNumericValues = [
        { id: 1, value: 'abc', category: 'A' },
        { id: 2, value: 'def', category: 'B' },
      ];
      expect(TABLESUMIFSOR(tableWithNonNumericValues, 'value', 'category', 'A')).toBeNaN();
    });

    test('should handle non-existent column', () => {
      expect(TABLESUMIFSOR(table, 'value', 'nonexistent', 'A')).toBe(0);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLESUMIFSOR(table, 'value', 'nonexistent', 'A')).toBe(0);
    });
  });

  describe('TABLECOUNT function', () => {
    const table = [
      { id: 1, value: 10, category: 'A' },
      { id: 2, value: null, category: 'B' },
      { id: 3, value: 30, category: 'A' },
      { id: 4, category: 'C' },
      { id: 5, value: undefined, category: 'D' },
    ];

    test('should count non-null and non-undefined values in the specified column', () => {
      expect(TABLECOUNT(table, 'value')).toBe(2); // Only 10 and 30 are non-null, non-undefined
      expect(TABLECOUNT(table, 'category')).toBe(5); // All values in 'category' are defined
    });

    test('should handle empty table', () => {
      expect(TABLECOUNT([], 'value')).toBe(0);
    });

    test('should handle non-existent column', () => {
      expect(TABLECOUNT(table, 'nonexistent')).toBe(0);
    });
  });

  describe('TABLECOUNTIF function', () => {
    const table = [
      { id: 1, value: 10, category: 'A' },
      { id: 2, value: null, category: 'B' },
      { id: 3, value: 30, category: 'A' },
      { id: 4, category: 'C' },
      { id: 5, value: undefined, category: 'D' },
    ];

    test('should count values in the specified column based on the criteria', () => {
      expect(TABLECOUNTIF(table, 'value', 'category', 'A')).toBe(2); // 10 and 30 in category 'A'
      expect(TABLECOUNTIF(table, 'value', 'category', 'B')).toBe(0); // No value in category 'B'
    });

    test('should handle empty table', () => {
      expect(TABLECOUNTIF([], 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non-existent column', () => {
      expect(TABLECOUNTIF(table, 'nonexistent', 'category', 'A')).toBe(0);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLECOUNTIF(table, 'value', 'nonexistent', 'A')).toBe(0);
    });

    test('should handle non-existent criteria', () => {
      expect(TABLECOUNTIF(table, 'value', 'category', 'E')).toBe(0); // No category 'E'
    });
  });

  describe('TABLECOUNTIFS function', () => {
    const table = [
      { id: 1, value: 10, category: 'A' },
      { id: 2, value: 20, category: 'B' },
      { id: 3, value: 30, category: 'A' },
      { id: 4, value: 40, category: 'B' },
      { id: 5, value: 50, category: 'A' },
    ];

    test('should count values in the specified column based on multiple criteria', () => {
      // Count values where category is 'A' and value is greater than 20
      expect(TABLECOUNTIFS(table, 'value', 'category', 'A', 'value', '>20')).toBe(2); // Only 50 matches the criteria

      // Count values where category is 'B' and value is less than or equal to 30
      expect(TABLECOUNTIFS(table, 'value', 'category', 'B', 'value', '<=30')).toBe(1); // Only 20 matches the criteria
    });

    test('should handle empty table', () => {
      expect(TABLECOUNTIFS([], 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non-existent column', () => {
      expect(TABLECOUNTIFS(table, 'nonexistent', 'category', 'A')).toBe(0);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLECOUNTIFS(table, 'value', 'nonexistent', 'A')).toBe(0);
    });

    test('should handle non-existent criteria', () => {
      expect(TABLECOUNTIFS(table, 'value', 'category', 'E')).toBe(0); // No category 'E'
    });
  });

  describe('TABLECOUNTIFSOR function', () => {
    const table = [
      { id: 1, value: 10, category: 'A' },
      { id: 2, value: 20, category: 'B' },
      { id: 3, value: 30, category: 'A' },
      { id: 4, value: 40, category: 'B' },
      { id: 5, value: 50, category: 'A' },
    ];

    test('should count values in the specified column based on multiple OR criteria', () => {
      // Count values where category is 'A' or value is greater than 20
      expect(TABLECOUNTIFSOR(table, 'value', 'category', 'A', 'value', '>20')).toBe(4); // 10, 30, and 50 match the criteria

      // Count values where category is 'B' or value is less than or equal to 30
      expect(TABLECOUNTIFSOR(table, 'value', 'category', 'B', 'value', '<=30')).toBe(4); // 10, 20, and 30 match the criteria
    });

    test('should handle empty table', () => {
      expect(TABLECOUNTIFSOR([], 'value', 'category', 'A')).toBe(0);
    });

    test('should handle non-existent column', () => {
      expect(TABLECOUNTIFSOR(table, 'nonexistent', 'category', 'A')).toBe(0);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLECOUNTIFSOR(table, 'value', 'nonexistent', 'A')).toBe(0);
    });

    test('should handle non-existent criteria', () => {
      expect(TABLECOUNTIFSOR(table, 'value', 'category', 'E')).toBe(0); // No category 'E'
    });
  });

  describe('TABLEMAX function', () => {
    const table = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
      { id: 5, value: 50 },
    ];

    test('should return the maximum value in the specified column', () => {
      expect(TABLEMAX(table, 'value')).toBe(50);
    });

    test('should handle empty table', () => {
      expect(TABLEMAX([], 'value')).toBe(-Infinity);
    });

    test('should handle non-existent column', () => {
      expect(TABLEMAX(table, 'nonexistent')).toBe(-Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, value: 'a' },
        { id: 2, value: 'b' },
        { id: 3, value: 'c' },
      ];
      expect(TABLEMAX(tableWithNonNumericValues, 'value')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, value: null },
        { id: 2, value: undefined },
        { id: 3, value: 'abc' },
      ];
      expect(TABLEMAX(tableWithNoValidNumbers, 'value')).toBe(NaN);
    });
  });

  describe('TABLEMAXIF function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should return the maximum value in the specified column with the given criteria', () => {
      expect(TABLEMAXIF(table, 'value', 'category', 'A')).toBe(50);
      expect(TABLEMAXIF(table, 'value', 'category', 'B')).toBe(40);
    });

    test('should handle empty table', () => {
      expect(TABLEMAXIF([], 'value', 'category', 'A')).toBe(-Infinity);
    });

    test('should handle non-existent column', () => {
      expect(TABLEMAXIF(table, 'nonexistent', 'category', 'A')).toBe(-Infinity);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLEMAXIF(table, 'value', 'nonexistent', 'A')).toBe(-Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMAXIF(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMAXIF(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(-Infinity);
    });
  });

  describe('TABLEMAXIFS function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should return the maximum value in the specified column with all criteria passing', () => {
      expect(TABLEMAXIFS(table, 'value', 'category', 'A')).toBe(50);
      expect(TABLEMAXIFS(table, 'value', 'category', 'B')).toBe(40);
    });

    test('should return 0 for no matching rows', () => {
      expect(TABLEMAXIFS(table, 'value', 'category', 'C')).toBe(-Infinity);
    });

    test('should handle empty table', () => {
      expect(TABLEMAXIFS([], 'value', 'category', 'A')).toBe(-Infinity);
    });

    test('should handle non-existent column', () => {
      expect(TABLEMAXIFS(table, 'nonexistent', 'category', 'A')).toBe(-Infinity);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLEMAXIFS(table, 'value', 'nonexistent', 'A')).toBe(-Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMAXIFS(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMAXIFS(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(-Infinity);
    });
  });

  describe('TABLEMAXIFSOR function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should return the maximum value in the specified column with some criteria passing', () => {
      expect(TABLEMAXIFSOR(table, 'value', 'category', 'A')).toBe(50);
      expect(TABLEMAXIFSOR(table, 'value', 'category', 'B')).toBe(40);
    });

    test('should return 0 for no matching rows', () => {
      expect(TABLEMAXIFSOR(table, 'value', 'category', 'C')).toBe(-Infinity);
    });

    test('should handle empty table', () => {
      expect(TABLEMAXIFSOR([], 'value', 'category', 'A')).toBe(-Infinity);
    });

    test('should handle non-existent column', () => {
      expect(TABLEMAXIFSOR(table, 'nonexistent', 'category', 'A')).toBe(-Infinity);
    });

    test('should handle non-existent criteria column', () => {
      expect(TABLEMAXIFSOR(table, 'value', 'nonexistent', 'A')).toBe(-Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMAXIFSOR(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMAXIFSOR(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(-Infinity);
    });
  });

  describe('TABLEMIN function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should return the minimum value in the specified column', () => {
      expect(TABLEMIN(table, 'value')).toBe(10);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEMIN([], 'value')).toBe(Infinity);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEMIN(table, 'nonexistent')).toBe(Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMIN(tableWithNonNumericValues, 'value')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMIN(tableWithNoValidNumbers, 'value')).toBe(Infinity);
    });
  });

  describe('TABLEMINIF function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should return the minimum value in the specified column for the given criteria', () => {
      expect(TABLEMINIF(table, 'value', 'category', 'A')).toBe(10);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEMINIF([], 'value', 'category', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEMINIF(table, 'nonexistent', 'category', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent criteria column', () => {
      expect(TABLEMINIF(table, 'value', 'nonexistent', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent criteria', () => {
      expect(TABLEMINIF(table, 'value', 'category', 'C')).toBe(Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMINIF(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMINIF(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(Infinity);
    });
  });

  describe('TABLEMINIFS function', () => {
    const table = [
      { id: 1, category: 'A', value1: 10, value2: 20 },
      { id: 2, category: 'B', value1: 20, value2: 30 },
      { id: 3, category: 'A', value1: 30, value2: 40 },
      { id: 4, category: 'B', value1: 40, value2: 50 },
      { id: 5, category: 'A', value1: 50, value2: 60 },
    ];

    test('should return the minimum value in the specified column for the given criteria', () => {
      expect(TABLEMINIFS(table, 'value1', 'category', 'A')).toBe(10);
      expect(TABLEMINIFS(table, 'value2', 'category', 'A')).toBe(20);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEMINIFS([], 'value', 'category', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEMINIFS(table, 'nonexistent', 'category', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent criteria column', () => {
      expect(TABLEMINIFS(table, 'value', 'nonexistent', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent criteria', () => {
      expect(TABLEMINIFS(table, 'value', 'category', 'C')).toBe(Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMINIFS(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMINIFS(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(Infinity);
    });

    test('should return the minimum value for multiple criteria', () => {
      expect(TABLEMINIFS(table, 'value1', 'category', 'A', 'value2', '20')).toBe(10);
      expect(TABLEMINIFS(table, 'value2', 'category', 'A', 'value1', '40')).toBe(Infinity);
    });
  });

  describe('TABLEMINIFSOR function', () => {
    const table = [
      { id: 1, category: 'A', value1: 10, value2: 20 },
      { id: 2, category: 'B', value1: 20, value2: 30 },
      { id: 3, category: 'A', value1: 30, value2: 40 },
      { id: 4, category: 'B', value1: 40, value2: 50 },
      { id: 5, category: 'A', value1: 50, value2: 60 },
    ];

    test('should return the minimum value in the specified column for the given criteria', () => {
      expect(TABLEMINIFSOR(table, 'value1', 'category', 'A')).toBe(10);
      expect(TABLEMINIFSOR(table, 'value2', 'category', 'A')).toBe(20);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEMINIFSOR([], 'value', 'category', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEMINIFSOR(table, 'nonexistent', 'category', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent criteria column', () => {
      expect(TABLEMINIFSOR(table, 'value', 'nonexistent', 'A')).toBe(Infinity);
    });

    test('should return 0 for non-existent criteria', () => {
      expect(TABLEMINIFSOR(table, 'value', 'category', 'C')).toBe(Infinity);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEMINIFSOR(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEMINIFSOR(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(Infinity);
    });

    test('should return the minimum value for some criteria', () => {
      expect(TABLEMINIFSOR(table, 'value1', 'category', 'A', 'value2', '20')).toBe(10);
      expect(TABLEMINIFSOR(table, 'value2', 'category', 'A', 'value1', '40')).toBe(20);
    });
  });

  describe('TABLEAVG function', () => {
    const table = [
      { id: 1, category: 'A', value1: 10, value2: 20 },
      { id: 2, category: 'B', value1: 20, value2: 30 },
      { id: 3, category: 'A', value1: 30, value2: 40 },
      { id: 4, category: 'B', value1: 40, value2: 50 },
      { id: 5, category: 'A', value1: 50, value2: 60 },
    ];

    test('should return the average value in the specified column', () => {
      expect(TABLEAVG(table, 'value1')).toBe(30);
      expect(TABLEAVG(table, 'value2')).toBe(40);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEAVG([], 'value')).toBe(NaN);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEAVG(table, 'nonexistent')).toBe(NaN);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEAVG(tableWithNonNumericValues, 'value')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEAVG(tableWithNoValidNumbers, 'value')).toBe(NaN);
    });
  });

  describe('TABLEAVGIF function', () => {
    const table = [
      { id: 1, category: 'A', value1: 10, value2: 20 },
      { id: 2, category: 'B', value1: 20, value2: 30 },
      { id: 3, category: 'A', value1: 30, value2: 40 },
      { id: 4, category: 'B', value1: 40, value2: 50 },
      { id: 5, category: 'A', value1: 50, value2: 60 },
    ];

    test('should return the average value in the specified column with given criteria', () => {
      // Average of value1 where category is 'A'
      expect(TABLEAVGIF(table, 'value1', 'category', 'A')).toBe(30);
      // Average of value2 where category is 'B'
      expect(TABLEAVGIF(table, 'value2', 'category', 'B')).toBe(40);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEAVGIF([], 'value', 'category', 'A')).toBe(NaN);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEAVGIF(table, 'nonexistent', 'category', 'A')).toBe(NaN);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEAVGIF(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEAVGIF(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should return 0 when criteria does not match any rows', () => {
      // No rows match the criteria 'C'
      expect(TABLEAVGIF(table, 'value1', 'category', 'C')).toBe(NaN);
    });
  });

  describe('TABLEAVGIFS function', () => {
    const table = [
      { id: 1, category: 'A', value1: 10, value2: 20 },
      { id: 2, category: 'B', value1: 20, value2: 30 },
      { id: 3, category: 'A', value1: 30, value2: 40 },
      { id: 4, category: 'B', value1: 40, value2: 50 },
      { id: 5, category: 'A', value1: 50, value2: 60 },
    ];

    test('should return the average value in the specified column with given criteria', () => {
      // Average of value1 where category is 'A'
      expect(TABLEAVGIFS(table, 'value1', 'category', 'A')).toBe(30);
      // Average of value2 where category is 'B'
      expect(TABLEAVGIFS(table, 'value2', 'category', 'B')).toBe(40);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEAVGIFS([], 'value', 'category', 'A')).toBe(NaN);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEAVGIFS(table, 'nonexistent', 'category', 'A')).toBe(NaN);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEAVGIFS(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEAVGIFS(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should return 0 when criteria does not match any rows', () => {
      // No rows match the criteria 'C'
      expect(TABLEAVGIFS(table, 'value1', 'category', 'C')).toBe(NaN);
    });
  });

  describe('TABLEAVGIFSOR function', () => {
    const table = [
      { id: 1, category: 'A', value1: 10, value2: 20 },
      { id: 2, category: 'B', value1: 20, value2: 30 },
      { id: 3, category: 'A', value1: 30, value2: 40 },
      { id: 4, category: 'B', value1: 40, value2: 50 },
      { id: 5, category: 'A', value1: 50, value2: 60 },
    ];

    test('should return the average value in the specified column with given criteria', () => {
      // Average of value1 where category is 'A'
      expect(TABLEAVGIFSOR(table, 'value1', 'category', 'A')).toBe(30);
      // Average of value2 where category is 'B'
      expect(TABLEAVGIFSOR(table, 'value2', 'category', 'B')).toBe(40);
    });

    test('should return 0 for an empty table', () => {
      expect(TABLEAVGIFSOR([], 'value', 'category', 'A')).toBe(NaN);
    });

    test('should return 0 for non-existent column', () => {
      expect(TABLEAVGIFSOR(table, 'nonexistent', 'category', 'A')).toBe(NaN);
    });

    test('should handle non-numeric values in column', () => {
      const tableWithNonNumericValues = [
        { id: 1, category: 'A', value: 'a' },
        { id: 2, category: 'B', value: 'b' },
      ];
      expect(TABLEAVGIFSOR(tableWithNonNumericValues, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should handle table with no valid numbers in column', () => {
      const tableWithNoValidNumbers = [
        { id: 1, category: 'A', value: null },
        { id: 2, category: 'B', value: undefined },
      ];
      expect(TABLEAVGIFSOR(tableWithNoValidNumbers, 'value', 'category', 'A')).toBe(NaN);
    });

    test('should return 0 when criteria does not match any rows', () => {
      // No rows match the criteria 'C'
      expect(TABLEAVGIFSOR(table, 'value1', 'category', 'C')).toBe(NaN);
    });
  });

  describe('TABLEFILTERROWSIF function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should filter rows based on the given criteria', () => {
      // Filter rows where category is 'A'
      expect(TABLEFILTERROWSIF(table, 'category', 'A')).toEqual([
        { id: 1, category: 'A', value: 10 },
        { id: 3, category: 'A', value: 30 },
        { id: 5, category: 'A', value: 50 },
      ]);
    });

    test('should return an empty array when no rows match the criteria', () => {
      // No rows match the criteria 'Z'
      expect(TABLEFILTERROWSIF(table, 'category', 'Z')).toEqual([]);
    });

    test('should handle empty table', () => {
      expect(TABLEFILTERROWSIF([], 'category', 'A')).toEqual([]);
    });

    test('should handle non-existent column', () => {
      expect(TABLEFILTERROWSIF(table, 'nonexistent', 'A')).toEqual([]);
    });

    test('filters rows by boolean value - not true', () => {
      const table = [
        { id: 5, category: 'A', value: 50 },
        { id: 5, category: 'A', value: 0 },
        { id: 1, category: 'C', value: true },
        { id: 2, category: 'B', value: false },
        { id: 2, category: 'B', value: null },
        { id: 2, category: 'B', value: undefined },
      ];

      expect(TABLEFILTERROWSIF(table, 'value', ['<>', true])).toEqual([
        { id: 5, category: 'A', value: 50 },
        { id: 5, category: 'A', value: 0 },
        { id: 2, category: 'B', value: false },
        { id: 2, category: 'B', value: null },
        { id: 2, category: 'B', value: undefined },
      ]);
    });

    test('filters rows by boolean value - not false', () => {
      const table = [
        { id: 5, category: 'A', value: 50 },
        { id: 5, category: 'A', value: 0 },
        { id: 1, category: 'C', value: true },
        { id: 2, category: 'B', value: false },
        { id: 2, category: 'B', value: null },
        { id: 2, category: 'B', value: undefined },
      ];

      expect(TABLEFILTERROWSIF(table, 'value', ['<>', false])).toEqual([
        { id: 5, category: 'A', value: 50 },
        { id: 5, category: 'A', value: 0 },
        { id: 1, category: 'C', value: true },
        { id: 2, category: 'B', value: null },
        { id: 2, category: 'B', value: undefined },
      ]);
    });
  });

  describe('TABLEFILTERROWSIFS function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should filter rows based on multiple criteria', () => {
      expect(TABLEFILTERROWSIFS(table, 'category', 'A', 'value', '30')).toEqual([
        { id: 3, category: 'A', value: 30 },
      ]);
    });

    test('should return an empty array when no rows match the criteria', () => {
      expect(TABLEFILTERROWSIFS(table, 'category', 'C')).toEqual([]);
    });

    test('should handle empty table', () => {
      expect(TABLEFILTERROWSIFS([], 'category', 'A')).toEqual([]);
    });

    test('should handle non-existent column', () => {
      expect(TABLEFILTERROWSIFS(table, 'nonexistent', 'A')).toEqual([]);
    });

    test('should handle criteria for non-existent column', () => {
      expect(TABLEFILTERROWSIFS(table, 'category', 'A', 'nonexistent', 'criteria')).toEqual([]);
    });
  });

  describe('TABLEFILTERROWSIFSOR function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should filter rows based on at least one criteria', () => {
      // Filter rows where category is 'A' or value is greater than 20
      expect(TABLEFILTERROWSIFSOR(table, 'category', 'A', 'value', '20')).toEqual([
        { id: 1, category: 'A', value: 10 },
        { id: 2, category: 'B', value: 20 },
        { id: 3, category: 'A', value: 30 },
        { id: 5, category: 'A', value: 50 },
      ]);
    });

    test('should return an empty array when no rows match any of the criteria', () => {
      // No rows match the criteria 'C'
      expect(TABLEFILTERROWSIFSOR(table, 'category', 'C', 'value', '60')).toEqual([]);
    });

    test('should handle empty table', () => {
      expect(TABLEFILTERROWSIFSOR([], 'category', 'A')).toEqual([]);
    });

    test('should handle non-existent column', () => {
      expect(TABLEFILTERROWSIFSOR(table, 'nonexistent', 'A')).toEqual([]);
    });

    test('should handle criteria for non-existent column value', () => {
      expect(TABLEFILTERROWSIFSOR(table, 'category', 'A', 'value', 'criteria')).toEqual([
        { id: 1, category: 'A', value: 10 },
        { id: 3, category: 'A', value: 30 },
        { id: 5, category: 'A', value: 50 },
      ]);
    });
  });


  describe('TABLEMATCHESCONDITIONS function', () => {
    const table = [
      { id: 1, category: 'A', value: 10 },
      { id: 2, category: 'B', value: 20 },
      { id: 3, category: 'A', value: 30 },
      { id: 4, category: 'B', value: 40 },
      { id: 5, category: 'A', value: 50 },
    ];

    test('should return false when at least one row does not match any condition', () => {
      expect(TABLEMATCHESCONDITIONS(table, 'category', 'A', 'value', '60')).toBe(false);
    });

    test('should return true when table is empty', () => {
      expect(TABLEMATCHESCONDITIONS([], 'category', 'A')).toBe(true);
    });

    test('should handle non-existent column', () => {
      expect(TABLEMATCHESCONDITIONS(table, 'nonexistent', 'A')).toBe(false);
    });

    test('should handle criteria for non-existent column', () => {
      // No rows match the criteria for the non-existent column
      expect(TABLEMATCHESCONDITIONS(table, 'category', 'A', 'nonexistent', 'criteria')).toBe(false);
    });
  });

  describe('TABLECONCATROWS function', () => {
    const table = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];

    const rowsToAdd = [
      { id: 3, name: 'Doe' },
      { id: 4, name: 'Smith' },
    ];

    test('should concatenate rows to the table', () => {
      const result = TABLECONCATROWS(table, rowsToAdd);
      expect(result).toHaveLength(4); // Combined length should be 4
      expect(result).toEqual([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
        { id: 4, name: 'Smith' },
      ]); // Result should be the concatenated table
    });

    test('should handle empty table', () => {
      const result = TABLECONCATROWS([], rowsToAdd);
      expect(result).toHaveLength(2); // Length should be same as rowsToAdd
      expect(result).toEqual(rowsToAdd); // Result should be equal to rowsToAdd
    });

    test('should handle empty rowsToAdd', () => {
      const result = TABLECONCATROWS(table, []);
      expect(result).toHaveLength(2); // Length should be same as table
      expect(result).toEqual(table); // Result should be equal to table
    });

    test('should handle empty table and rowsToAdd', () => {
      const result = TABLECONCATROWS([], []);
      expect(result).toHaveLength(0); // Length should be 0
      expect(result).toEqual([]); // Result should be an empty array
    });

    test('should handle non-existent columns in rowsToAdd', () => {
      const rowsToAddWithNonExistentColumn = [
        { id: 5, name: 'Harry', age: 25 }, // 'age' column does not exist in table
      ];
      const result = TABLECONCATROWS(table, rowsToAddWithNonExistentColumn);
      expect(result).toHaveLength(3); // Length should be 3 (including the row with non-existent column)
      expect(result).toEqual([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 5, name: 'Harry', age: 25 },
      ]);
    });
  });
});
