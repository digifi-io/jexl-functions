import moment from 'moment';

type Value = string | boolean | number | null | undefined;

const isDate = (value: Value): value is string => {
  return typeof value === 'string' && moment(value, moment.ISO_8601, true).isValid();
};

const isNumberInString = (value: Value): value is string => {
  return typeof value === 'string' && !Number.isNaN(value) ;
}

const checkNullValue = (value: Value): value is null | undefined => {
  return value === null || value === undefined;
};

export const GT = (value: Value, compareTo: Value) => {
  if (checkNullValue(compareTo) || checkNullValue(value)) {
    return false;
  }

  if (isNumberInString(value)) {
    value = Number.parseFloat(value);
  }

  if (isNumberInString(compareTo)) {
    compareTo = Number.parseFloat(compareTo);
  }

  if (isDate(compareTo)) {
    compareTo = Date.parse(compareTo);
  }

  if (isDate(value)) {
    value = Date.parse(value);
  }

  return value > compareTo;
};

export const LT = (value: Value, compareTo: Value) => {
  if (checkNullValue(compareTo) || checkNullValue(value)) {
    return false;
  }

  if (isNumberInString(value)) {
    value = Number.parseFloat(value);
  }

  if (isNumberInString(compareTo)) {
    compareTo = Number.parseFloat(compareTo);
  }

  if (isDate(compareTo)) {
    compareTo = Date.parse(compareTo);
  }

  if (isDate(value)) {
    value = Date.parse(value);
  }

  return value < compareTo;
};

export const LTE = (value: Value, compareTo: Value) => {
  if (checkNullValue(compareTo) || checkNullValue(value)) {
    return false;
  }

  if (isNumberInString(value)) {
    value = Number.parseFloat(value);
  }

  if (isNumberInString(compareTo)) {
    compareTo = Number.parseFloat(compareTo);
  }

  if (isDate(compareTo)) {
    compareTo = Date.parse(compareTo);
  }

  if (isDate(value)) {
    value = Date.parse(value);
  }

  if (compareTo !== 0 && !compareTo) {
    return true;
  }

  return value <= compareTo;
};

export const GTE = (value: Value, compareTo: Value) => {
  if (checkNullValue(compareTo) || checkNullValue(value)) {
    return false;
  }

  if (isNumberInString(value)) {
    value = Number.parseFloat(value);
  }

  if (isNumberInString(compareTo)) {
    compareTo = Number.parseFloat(compareTo);
  }

  if (isDate(compareTo)) {
    compareTo = Date.parse(compareTo);
  }

  if (isDate(value)) {
    value = Date.parse(value);
  }

  if (value !== 0 && !value) {
    return false;
  }

  return value >= compareTo;
};

export const RANGE = (value: Value, min: Value, max: Value) => {
  if (checkNullValue(min) || checkNullValue(max) || checkNullValue(value)) {
    return false;
  }

  if (isNumberInString(value)) {
    value = Number.parseFloat(value);
  }

  if (isNumberInString(min)) {
    min = Number.parseFloat(min);
  }

  if (isNumberInString(max)) {
    max = Number.parseFloat(max);
  }

  if (isDate(min)) {
    min = Date.parse(min);
  }

  if (isDate(max)) {
    max = Date.parse(max);
  }

  if (isDate(value)) {
    value = Date.parse(value);
  }

  if (value !== 0 && !value) {
    return false;
  }

  if (min > max) {
    return value <= min && value >= max;
  }

  return value >= min && value <= max;
};

export const EQUAL = (value: Value, compareTo: Value) => {
  if (isDate(compareTo)) {
    compareTo = Date.parse(compareTo);
  }

  if (isDate(value)) {
    value = Date.parse(value);
  }

  return value === compareTo;
};

export const INCLUDES = (value: Value, ...includesSet: string[]) => {
  if (typeof value !== 'string') {
    return false;
  }

  return includesSet.includes(value);
};

export const NOTEQUAL = (value: Value, compareTo: Value) => {
  return !EQUAL(value, compareTo);
};

export const NINCLUDES = (value: Value, ...notIncludesSet: string[]) => {
  return !INCLUDES(value, ...notIncludesSet);
};

export const ISNULL = (value: Value) => {
  return value === null || value === undefined;
};

export const ISNOTNULL = (value: Value) => {
  return value !== null && value !== undefined;
};
