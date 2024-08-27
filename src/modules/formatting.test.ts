import FormattingModule from './formatting';

const { MONETARYFORMAT } = FormattingModule({});

describe('Formatting module', () => {
  describe('MONETARYFORMAT function', () => {
    test('should same value if value is not a valid number', () => {
      expect(MONETARYFORMAT('test')).toStrictEqual('test');
      expect(MONETARYFORMAT('asdf345345.345345a345345')).toStrictEqual('asdf345345.345345a345345');
    });

    test('should format number with default values', () => {
      expect(MONETARYFORMAT(1)).toStrictEqual('$1.00');
      expect(MONETARYFORMAT(1.1)).toStrictEqual('$1.10');
      expect(MONETARYFORMAT(1.11)).toStrictEqual('$1.11');
      expect(MONETARYFORMAT(1.111)).toStrictEqual('$1.11');
      expect(MONETARYFORMAT(11234.567)).toStrictEqual('$11,234.57');
    });

    test('should apply fraction digits parameter', () => {
      expect(MONETARYFORMAT(1, 0)).toStrictEqual('$1');
      expect(MONETARYFORMAT(1.1, 0)).toStrictEqual('$1');
      expect(MONETARYFORMAT(1.11, 0)).toStrictEqual('$1');
      expect(MONETARYFORMAT(1.111, 0)).toStrictEqual('$1');
      expect(MONETARYFORMAT(11234.567, 0)).toStrictEqual('$11,235');
      expect(MONETARYFORMAT(11234.567, 1)).toStrictEqual('$11,234.6');
      expect(MONETARYFORMAT(11234.567, 2)).toStrictEqual('$11,234.57');
      expect(MONETARYFORMAT(11234.567, 3)).toStrictEqual('$11,234.567');
    });

    test('should throw an error if fraction digits is not a number', () => {
      expect(() => MONETARYFORMAT(1, 'test')).toThrow('Fraction digits must be a number');
    });

    test('should apply useGrouping parameter', () => {
      expect(MONETARYFORMAT(11234.567, undefined, false)).toStrictEqual('$11234.57');
      expect(MONETARYFORMAT(11234.567, undefined, true)).toStrictEqual('$11,234.57');
    });

    test('should throw an error if useGrouping is not a boolean', () => {
      expect(() => MONETARYFORMAT(1, undefined, 'test')).toThrow('Use grouping must be a boolean');
    });

    test('should apply currencySymbol parameter', () => {
      expect(MONETARYFORMAT(1, undefined, undefined, '€')).toStrictEqual('€1.00');
      expect(MONETARYFORMAT(1, undefined, undefined, 'zl')).toStrictEqual('zl1.00');
    });

    test('should throw an error if currencySymbol is not a string', () => {
      expect(() => MONETARYFORMAT(1, undefined, undefined, 1)).toThrow('Currency symbol must be a string');
    });

    test('should throw an error if currencySymbol length is too big', () => {
      expect(() => MONETARYFORMAT(1, undefined, undefined, '123456')).toThrow('Argument max length exceeded. Provided 6, maximum 5');
    });

    test('should throw an error if currencyPosition is not a string', () => {
      expect(() => MONETARYFORMAT(1, undefined, undefined, '$', 1)).toThrow('Currency position must be a string');
    });

    test('should throw an error if currencyPosition is not "left" or "right"', () => {
      expect(() => MONETARYFORMAT(1, undefined, undefined, '$', 'test')).toThrow('Currency position must be either "left" or "right"');
    });

    test('should apply currencyPosition parameter', () => {
      expect(MONETARYFORMAT(1, undefined, undefined, '$', 'right')).toStrictEqual('1.00$');
      expect(MONETARYFORMAT(1, undefined, undefined, '$', 'left')).toStrictEqual('$1.00');
      expect(MONETARYFORMAT(1, undefined, undefined, 'zl', 'left')).toStrictEqual('zl1.00');
      expect(MONETARYFORMAT(1, undefined, undefined, 'zl', 'right')).toStrictEqual('1.00zl');
    });
  });
});
