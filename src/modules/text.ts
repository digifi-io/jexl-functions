import { JexlFunctionExecutionError } from '../errors';
import { createModule } from '../utils/module';

export default createModule(({ coerceToStringWithValidation, validateTextLength, coerceToNumber, validateArrayMaxSize }) => {
  const SUBSTITUTE = (text: unknown, textToReplace: unknown, replacement: unknown) => {
    if (typeof text !== 'string') {
      throw new JexlFunctionExecutionError('Text argument should be a string.');
    }

    if (typeof textToReplace !== 'string') {
      throw new JexlFunctionExecutionError('Text to replace argument should be a string.');
    }

    if (typeof replacement !== 'string') {
      throw new JexlFunctionExecutionError('Replacement should be a string.');
    }

    validateTextLength(text);
    validateTextLength(textToReplace);
    validateTextLength(replacement);

    return text.replaceAll(textToReplace, replacement);
  };

  const REPLACE = (text: unknown, position: number, length: unknown, replacement: unknown) => {
    if (typeof text !== 'string') {
      throw new JexlFunctionExecutionError('Text argument should be a string.');
    }

    if (typeof replacement !== 'string') {
      throw new JexlFunctionExecutionError('Replacement should be a string.');
    }

    validateTextLength(text);
    validateTextLength(replacement);

    return text.substring(0, position - 1) + replacement + text.substring(position - 1 + coerceToNumber(length));
  };

  const CLEAN = (text: unknown) => {
    // eslint-disable-next-line no-control-regex
    const regex = /[\0-\x1F]/g;

    return coerceToStringWithValidation(text).replace(regex, '');
  };

  const CONCAT = (...args: unknown[]) => {
    validateArrayMaxSize(args);

    return args.join('');
  };

  const EXACT = (firstText: unknown, secondText: unknown) => {
    return coerceToStringWithValidation(firstText) === coerceToStringWithValidation(secondText);
  };

  const FIND = (valueToSearch: unknown, text: unknown, position: unknown = 0) => {
    return coerceToStringWithValidation(text)
      .indexOf(coerceToStringWithValidation(valueToSearch), coerceToNumber(position)) + 1;
  };

  const LEFT = (text: unknown, length: unknown = 1) => {
    return coerceToStringWithValidation(text)
      .substring(0, coerceToNumber(length));
  };

  const LEN = (text: unknown) => {
    return coerceToStringWithValidation(text).length;
  };

  const LOWER = (text: unknown) => {
    return coerceToStringWithValidation(text).toLowerCase();
  };

  const MID = (text: unknown, start: unknown, length: unknown) => {
    const begin = coerceToNumber(start) - 1;

    return coerceToStringWithValidation(text)
      .substring(begin, begin + coerceToNumber(length));
  };

  const PROPER = (text: unknown) => {
    return coerceToStringWithValidation(text)
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
      .join(' ');
  };

  const REPT = (text: unknown, times: unknown) => {
    return coerceToStringWithValidation(text).repeat(coerceToNumber(times));
  };

  const RIGHT = (text: unknown, length: unknown) => {
    const textString = coerceToStringWithValidation(text);

    return textString.substring(textString.length - coerceToNumber(length));
  };

  const SEARCH = (valueToSearch: unknown, text: unknown, position: unknown = 0) => {
    return coerceToStringWithValidation(text)
      .toLowerCase()
      .indexOf(coerceToStringWithValidation(valueToSearch).toLowerCase(), coerceToNumber(position)) + 1;
  };

  const TRIM = (text: unknown) => {
    return coerceToStringWithValidation(text).replace(/\s+/g, ' ').trim();
  };

  const UPPER = (text: unknown) => {
    return coerceToStringWithValidation(text).toUpperCase();
  };

  const VALUE = (text: unknown) => {
    return coerceToNumber(coerceToStringWithValidation(text));
  };

  return {
    CLEAN,
    CONCAT,
    EXACT,
    FIND,
    LEFT,
    LEN,
    LOWER,
    MID,
    PROPER,
    REPT,
    RIGHT,
    SEARCH,
    TRIM,
    UPPER,
    VALUE,
    REPLACE,
    SUBSTITUTE,
    CONCATENATE: CONCAT,
  };
});
