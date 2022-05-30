import { coerceToNumber } from '../utils/coerceUtils';
import { createModule } from '../utils/module';
import dayjs from '../dayjs';

export default createModule(() => {
  const ISEVEN = (value: unknown) => {
    return coerceToNumber(value) % 2;
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

  const ISEMPTY = (value: unknown): value is null | undefined => {
    return value === null || value === undefined;
  };

  const ISNOTEMPTY = (value: unknown) => {
    return !ISEMPTY(value);
  };

  const ISNUMBER = (value: unknown): value is number => {
    return typeof value === 'number';
  };

  const ISFINITE = (value: unknown) => {
    return Number.isFinite(value);
  };

  const ISNAN = (value: unknown) => {
    return Number.isNaN(value);
  };

  const ISDATESTRING = (value: unknown): value is string => {
    return typeof value === 'string' && dayjs(value, 'YYYY-MM-DD', true).isValid();
  };

  const ISBLANK = (value: unknown): value is string => {
    return value === '';
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
  };
});