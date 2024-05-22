import GeneralModule from './general';

const { UUID } = GeneralModule();

const UUID_REGEX = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

describe('General module', () => {
  describe('UUID method', () => {
    test('should match the UUID regex', () => {
      expect(UUID()).toMatch(UUID_REGEX);
    });
  });
});
