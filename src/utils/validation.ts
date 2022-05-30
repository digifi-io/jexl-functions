import { ExecutionError } from '@digifi/jexl';

export const createValidateArrayMaxSizeFunction = (defaultMaxSize: number) => {
  return (array: unknown[], maxSizeOverride?: number) => {
    const maxSize = maxSizeOverride ?? defaultMaxSize;

    const isSizeExceeded = array.length > maxSize;

    if (isSizeExceeded) {
      throw new ExecutionError(`Items size exceeded. Provided ${array.length}, maximum ${maxSize}`);
    }
  };
};

export const createValidateTextLengthFunction = (defaultMaxTextLength: number) => {
  return (text: string, maxTextLengthOverride?: number) => {
    const maxLength = maxTextLengthOverride ?? defaultMaxTextLength;

    if (text.length > maxLength) {
      throw new ExecutionError(`Argument max length exceeded. Provided ${text.length}, maximum ${maxLength}`);
    }
  };
};
