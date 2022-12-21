import { coerceToNumber } from '../utils/coerceUtils';
import { createModule } from '../utils/module';
import dayjs from '../dayjs';

export default createModule(() => {
  const ISEVEN = (value: unknown) => {
    return coerceToNumber(value) % 2 === 0;
  };

  const ISTEXT = (value: unknown): value is string => {
    return typeof value === 'string';
  }

  const ISNONTEXT = (value: unknown) => {
    return !ISTEXT(value);
  };

  const ISODD = (value: unknown) => {
    return !ISEVEN(value);
  };

  const ISNULL = (value: unknown): value is null => {
    return value === null;
  };

  const ISNOTNULL = (value: unknown) => {
    return !ISNULL(value);
  };

  const ISUNDEFINED = (value: unknown): value is undefined => {
    return value === undefined;
  };

  const ISNOTUNDEFINED = (value: unknown) => {
    return !ISUNDEFINED(value);
  }

  const ISEMPTY = (value: unknown, checkForEmptyString?: unknown) => {
    if (checkForEmptyString == true && value === '') {
      return true;
    }

    return value === null || value === undefined;
  };

  const ISNOTEMPTY = (value: unknown, checkForEmptyString?: boolean) => {
    return !ISEMPTY(value, checkForEmptyString);
  };

  const ISNUMBER = (value: unknown): value is number => {
    return typeof value === 'number';
  };

  const ISFINITE = (value: unknown) => {
    return Number.isFinite(value);
  };

  const ISNAN = (value: unknown) => {
    return isNaN(value as unknown as number);
  };

  const ISDATESTRING = (value: unknown): value is string => {
    return typeof value === 'string' && dayjs(value, 'YYYY-MM-DD', true).isValid();
  };

  const ISBLANK = (value: unknown): value is string => {
    return value === '';
  };

  const ISEMPTYORBLANK = (value: unknown): value is string | null | undefined => {
    return value === '' || value === null || value === undefined;
  };

  const ISNOTEMPTYORBLANK = (value: unknown) => {
    return !ISEMPTYORBLANK(value);
  };

  return {
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
  };
});
