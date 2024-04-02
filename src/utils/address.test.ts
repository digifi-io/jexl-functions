import { templateAddressPart } from './address';

describe('templateAddressPart function', () => {
  const fullAddress = '123 Main St';

  test('should append comma to fullAddress if dismissComma is not provided or false', () => {
    const addressTemplateComponent = { key: 'street_number' };
    const addressPart = '456';
    const result = templateAddressPart(addressTemplateComponent, addressPart, fullAddress);
    expect(result).toBe('123 Main St, 456');
  });

  test('should not append comma to fullAddress if dismissComma is true', () => {
    const addressTemplateComponent = { key: 'street_name', dismissComma: true };
    const addressPart = 'Main St';
    const result = templateAddressPart(addressTemplateComponent, addressPart, fullAddress);
    expect(result).toBe('123 Main St Main St');
  });

  test('should handle empty fullAddress', () => {
    const addressTemplateComponent = { key: 'city' };
    const addressPart = 'New York';
    const result = templateAddressPart(addressTemplateComponent, addressPart, '');
    expect(result).toBe(', New York');
  });

  test('should handle undefined addressPart', () => {
    const addressTemplateComponent = { key: 'state_or_province' };
    const result = templateAddressPart(addressTemplateComponent, '', fullAddress);
    expect(result).toBe('123 Main St, ');
  });
});
