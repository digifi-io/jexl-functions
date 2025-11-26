import { createModule } from '../utils/module';
import { v4 as uuid } from 'uuid';
import { sha256 } from 'js-sha256';

export default createModule(() => {
  const UUID = () => {
    return uuid();
  };

  const HASH = (text: string) => {
    return sha256.create()
      .update(text)
      .hex();
  };

  return {
    UUID,
    HASH,
  };
});
