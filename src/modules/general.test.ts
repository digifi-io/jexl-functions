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
  });
});
