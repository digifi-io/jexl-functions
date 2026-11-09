import { JexlFunctionExecutionError } from '../errors';
import { createModule } from '../utils/module';
import { v4 as uuid } from 'uuid';
import { sha256 } from 'js-sha256';

export default createModule(() => {
  const UUID = () => {
    return uuid();
  };

  const HASH = (text: string) => {
    try {
      return sha256.create()
        .update(text)
        .hex();
    } catch (error) {
      // js-sha256 throws a plain Error for nullish values, numbers, booleans and objects
      throw new JexlFunctionExecutionError('Hash input should be a string.');
    }
  };

  return {
    UUID,
    HASH,
  };
});
