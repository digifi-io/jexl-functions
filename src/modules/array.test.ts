import ArrayModule from './array';
import { JexlFunctionExecutionError } from '../errors';

const MAX_ARRAY_SIZE = 3;
const { UNIQUE } = ArrayModule({ defaultMaxArraySize: MAX_ARRAY_SIZE });

describe('Array module', () => {
  describe('UNIQUE method', () => {
    test('should return unique items', () => {
      expect(UNIQUE([1, 2, 1])).toStrictEqual([1, 2]);
    });

    test('should return empty array if number is passed', () => {
      expect(UNIQUE(1 as any)).toStrictEqual([]);
    });

    test('should return array if string is passed', () => {
      expect(UNIQUE('1' as any)).toStrictEqual(['1']);
    });

    test('should return empty array if boolean is passed', () => {
      expect(UNIQUE(false as any)).toStrictEqual([]);
    });

    test('should an error if null is passed', async () => {
      expect(() => UNIQUE(null as any)).toThrow('Cannot read properties of null (reading \'length\')');
    });

    test('should return an error if undefined is passed', () => {
      expect(() => UNIQUE(null as any))
        .toThrow('Cannot read properties of null (reading \'length\')');
    });

    test('should throw an error if array length is too big', () => {
      const testArray = [1, 2, 1, 4];

      expect(() => UNIQUE(testArray))
        .toThrow(new JexlFunctionExecutionError(`Items size exceeded. Provided ${testArray.length}, maximum 3`));
    });
  });
});
