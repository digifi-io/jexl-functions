import { JexlFunctionExecutionError } from '../errors';
import GeneralModule from './general';

const { UUID, HASH } = GeneralModule();

const UUID_REGEX = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
const HASH_REGEX = /^[a-f0-9]{64}$/i;

describe('General module', () => {
  describe('UUID method', () => {
    test('should match the UUID regex', () => {
      expect(UUID()).toMatch(UUID_REGEX);
    });
  });

  describe('HASH method', () => {
    test('should match the hash regex', () => {
      const hash = HASH('test');

      expect(hash).toMatch(HASH_REGEX);
    });

    test('should return the same hash for the same input', () => {
      const input = 'repeatable';

      expect(HASH(input)).toBe(HASH(input));
    });

    test('should handle empty string', () => {
      console.log(HASH('sample'))
      expect(HASH('')).toMatch(HASH_REGEX);
    });

    test('should return the SHA-256 hash of the text', () => {
      expect(HASH('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    });

    test.each([null, undefined, 123, true, { text: 'abc' }])('should throw JexlFunctionExecutionError for %p', (input) => {
      expect(() => HASH(input as unknown as string)).toThrow(
        new JexlFunctionExecutionError('Hash input should be a string.'),
      );
    });
  });
});
