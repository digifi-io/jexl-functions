import { createSaveFlattenFunction } from './array';
import { JexlFunctionExecutionError } from '../errors';

describe('createSaveFlattenFunction function', () => {
  const maxFlattenArraySize = 10;
  const saveFlattenFunction = createSaveFlattenFunction(maxFlattenArraySize);

  test('should flatten array and return it', () => {
    const args = [1, [2, 3], 4];

    const result = saveFlattenFunction(args);

    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('should throw error if the sum of lengths exceeds maxFlattenArraySize', () => {
    const args = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 1, 1, 1, 1, 1, 1];

    expect(() => saveFlattenFunction(args)).toThrowError(
      new JexlFunctionExecutionError(
        `Items size exceeded. Provided 11, maximum 10`
      )
    );
  });

  test('should handle empty arrays', () => {
    const result = saveFlattenFunction([]);

    expect(result).toEqual([]);
  });

  test('should handle arrays with null or undefined values', () => {
    const args = [null, [undefined, 1], null];
    const result = saveFlattenFunction(args);
    expect(result).toEqual([null, undefined, 1, null]);
  });
});
