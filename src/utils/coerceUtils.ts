export const coerceToString = (value: unknown) => {
  if (value === null || value === undefined) {
    return '';
  }

  return (value as string | boolean | object | Symbol | number).toString();
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
