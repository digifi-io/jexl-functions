import { createModule } from '../utils/module';
import { v4 as uuid } from 'uuid';

export default createModule(() => {
  const UUID = () => {
    return uuid();
  };

  return {
    UUID,
  };
});
