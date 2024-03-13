import AddressModule from './address';

const { BUILDFULLADDRESS } = AddressModule();

describe('Address module', () => {
  describe('BUILDFULLADDRESS method', () => {
    test('should return combined string for all existing components', () => {
      const result = BUILDFULLADDRESS({
        city: 'city',
        country: 'country',
        street_number: 'street_number',
        street_name: 'street_name',
        sublocality: 'sublocality',
        state_or_province: 'state_or_province',
        zip_or_postal_code: 'zip_or_postal_code',
      });

      expect(result).toBe('street_number street_name, sublocality, city, state_or_province, zip_or_postal_code, country');
    });

    test('should return combined string for existing components', () => {
      expect(BUILDFULLADDRESS({ city: 'Test City', country: 'Belarus' })).toBe('Test City, Belarus');
    });

    test('should return empty string if address is not defined', () => {
      expect(BUILDFULLADDRESS(undefined)).toBe('');
      expect(BUILDFULLADDRESS(null)).toBe('');
      expect(BUILDFULLADDRESS(false)).toBe('');
      expect(BUILDFULLADDRESS(0)).toBe('');
      expect(BUILDFULLADDRESS('')).toBe('');
    });

    test('should return empty string if address is not an object',  () => {
      expect(BUILDFULLADDRESS(true)).toBe('');
      expect(BUILDFULLADDRESS(1)).toBe('');
      expect(BUILDFULLADDRESS('1')).toBe('');
    });

    test('should return empty string if address is an array', () => {
      expect(BUILDFULLADDRESS([1, 2])).toBe('');
    });

    test('should return empty string for non existing components', () => {
      expect(BUILDFULLADDRESS({ test: 'test' })).toBe('');
    });
  });
});
