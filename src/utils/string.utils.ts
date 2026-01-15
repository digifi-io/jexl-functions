import escapeStringRegExp from 'escape-string-regexp';

export const escapeString = (text: string) => {
  return escapeStringRegExp(text)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\v/g, '\\v');
};
