import { uniq } from 'lodash';

export const UNIQUE = (source: Array<unknown>) => {
  return uniq(source);
};
