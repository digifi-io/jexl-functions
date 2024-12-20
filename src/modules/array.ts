import { uniq } from 'lodash';
import { createModule } from '../utils/module';

export default createModule(({ validateArrayLikeValueMaxSize }) => {
  const UNIQUE = (source: unknown[]) => {
    validateArrayLikeValueMaxSize(source);

    return uniq(source);
  };

  return {
    UNIQUE,
  };
});
