import { createModule } from '../utils/module';
import { JexlFunctionExecutionError } from '../errors';

export default createModule(({ coerceToNumber, validateTextLength }) => {
  const MONETARY_FORMAT_MAX_CURRENCY_SYMBOL_LENGTH = 5;
  const MONETARY_FORMAT_CURRENCY_POSITIONS = ['left', 'right'];

  const MONETARYFORMAT = (
    value: unknown,
    fractionDigits: unknown = 2,
    useGrouping: unknown = true,
    currencySymbol: unknown = '$',
    currencyPosition: unknown = 'left',
  ) => {
    const coercedValue = coerceToNumber(value);

    if (typeof fractionDigits !== 'number') {
      throw new JexlFunctionExecutionError('Fraction digits must be a number');
    }

    if (typeof useGrouping !== 'boolean') {
      throw new JexlFunctionExecutionError('Use grouping must be a boolean');
    }

    if (typeof currencySymbol !== 'string') {
      throw new JexlFunctionExecutionError('Currency symbol must be a string');
    }

    validateTextLength(currencySymbol, MONETARY_FORMAT_MAX_CURRENCY_SYMBOL_LENGTH);

    if (typeof currencyPosition !== 'string') {
      throw new JexlFunctionExecutionError('Currency position must be a string');
    }

    if (!MONETARY_FORMAT_CURRENCY_POSITIONS.includes(currencyPosition)) {
      throw new JexlFunctionExecutionError('Currency position must be either "left" or "right"');
    }

    if (isNaN(coercedValue)) {
      return value;
    }

    let formattedValue = coercedValue.toLocaleString('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
      useGrouping,
    });

    if (currencyPosition === 'left') {
      formattedValue = `${currencySymbol}${formattedValue}`;
    } else {
      formattedValue = `${formattedValue}${currencySymbol}`;
    }

    return formattedValue;
  };

  return {
    MONETARYFORMAT,
  };
});
