import { uniq } from 'lodash';
import { createModule } from '../utils/module';

export default createModule(({ validateArrayMaxSize }) => {
  const UNIQUE = (source: unknown[]) => {
    validateArrayMaxSize(source);

    return uniq(source);
  };

  return {
    UNIQUE,
  };
});
