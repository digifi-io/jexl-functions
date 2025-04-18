export const coerceToString = (value: unknown) => {
  if (value === null || value === undefined) {
    return '';
  }

  return (value as string | boolean | object | symbol | number).toString();
};

export const coerceToNumber = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  if (typeof value === 'string') {
    return Number.parseFloat(value);
  }

  return Number(value);
};

export const coerceNullishValueToArray = (value: unknown | null | undefined) => {
  if (value === null || value === undefined) {
    return [];
  }

  return value;
};
