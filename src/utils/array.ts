import { JexlFunctionExecutionError } from '../errors';
import { createValidateArrayMaxSizeFunction } from './validation';

export const createSaveFlattenFunction = (maxFlattenArraySize: number) => {
  const validateArrayMaxSize = createValidateArrayMaxSizeFunction(maxFlattenArraySize);

  return (args: unknown[]) => {
    validateArrayMaxSize(args);

    return args.reduce((flattenArray: unknown[], arg) => {
      const currentFlattenArrayLength = flattenArray.length;
      const argArrayLength = Array.isArray(arg) ? arg.length : 1;

      if (currentFlattenArrayLength + argArrayLength > maxFlattenArraySize) {
        throw new JexlFunctionExecutionError(
          `Items size exceeded. Provided ${currentFlattenArrayLength + argArrayLength}, maximum ${maxFlattenArraySize}`
        );
      }

      if (Array.isArray(arg)) {
        return arg.length ? flattenArray.concat(arg) : flattenArray;
      }

      flattenArray.push(arg);

      return flattenArray;
    }, []);
  };
};
