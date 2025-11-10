import { createModule } from '../utils/module';
import { v4 as uuid } from 'uuid';
import crypto from 'crypto';

export default createModule(() => {
  const UUID = () => {
    return uuid();
  };

  const HASH = (text: string) => {
    return crypto
      .createHash('sha256')
      .update(text)
      .digest('hex');
  };

  return {
    UUID,
    HASH,
  };
});
