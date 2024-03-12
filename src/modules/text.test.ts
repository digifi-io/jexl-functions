import TextModule from './text';

const {
  CLEAN,
  CONCAT,
  EXACT,
  FIND,
  LEFT,
  LEN,
  LOWER,
  MID,
  PROPER,
  REPT,
  RIGHT,
  SEARCH,
  TRIM,
  UPPER,
  VALUE,
  REPLACE,
  SUBSTITUTE,
} = TextModule();

describe('Text Module', () => {
  describe('SUBSTITUTE function', () => {
    test('should replace all occurrences of textToReplace with replacement', () => {
      const text = 'hello world hello';
      const textToReplace = 'hello';
      const replacement = 'hi';

      const result = SUBSTITUTE(text, textToReplace, replacement);

      expect(result).toBe('hi world hi');
    });

    test('should handle non-string arguments', () => {
      const text = 'hello world hello';
      const textToReplace = 'hello';
      const replacement = 'hi';

      expect(() => SUBSTITUTE(123, textToReplace, replacement)).toThrow();
      expect(() => SUBSTITUTE(text, 123, replacement)).toThrow();
      expect(() => SUBSTITUTE(text, textToReplace, 123)).toThrow();
    });

    test('should handle empty text', () => {
      const text = '';
      const textToReplace = 'hello';
      const replacement = 'hi';

      const result = SUBSTITUTE(text, textToReplace, replacement);

      expect(result).toBe('');
    });

    test('should handle empty textToReplace and replacement', () => {
      const text = 'hello world hello';
      const textToReplace = '';
      const replacement = '';

      const result = SUBSTITUTE(text, textToReplace, replacement);

      expect(result).toBe('hello world hello');
    });

    test('should handle no replacements', () => {
      const text = 'hello world hello';
      const textToReplace = 'hi';
      const replacement = 'hey';

      const result = SUBSTITUTE(text, textToReplace, replacement);

      expect(result).toBe('hello world hello');
    });

    test('should handle text with special characters', () => {
      const text = 'he*llo wo$rld hel%lo';
      const textToReplace = '*';
      const replacement = 'i';

      const result = SUBSTITUTE(text, textToReplace, replacement);

      expect(result).toBe('heillo wo$rld hel%lo');
    });
  });

  describe('REPLACE function', () => {
    test('should replace text at the specified position with the replacement text', () => {
      const text = 'hello world';
      const position = 7;
      const length = 5;
      const replacement = 'there';

      const result = REPLACE(text, position, length, replacement);

      expect(result).toBe('hello there');
    });

    test('should handle non-string replacement', () => {
      const text = 'hello world';
      const position = 7;
      const length = 5;

      expect(() => REPLACE(text, position, length, 123)).toThrow();
    });

    test('should handle non-numeric position or length', () => {
      const text = 'hello world';
      const position = 'abc';
      const length = 'def';
      const replacement = 'there';

      // @ts-ignore
      expect(() => REPLACE(text, position, length, replacement)).not.toThrow();
    });

    test('should handle empty text', () => {
      const text = '';
      const position = 1;
      const length = 0;
      const replacement = 'there';

      const result = REPLACE(text, position, length, replacement);

      expect(result).toBe('there');
    });

    test('should handle replacement at the end of the text', () => {
      const text = 'hello world';
      const position = 12;
      const length = 1;
      const replacement = '!';

      const result = REPLACE(text, position, length, replacement);

      expect(result).toBe('hello world!');
    });

    test('should handle replacement of length greater than remaining text length', () => {
      const text = 'hello world';
      const position = 7;
      const length = 10;
      const replacement = 'there';

      const result = REPLACE(text, position, length, replacement);

      expect(result).toBe('hello there');
    });

    test('should handle replacement of length greater than text length', () => {
      const text = 'hello';
      const position = 3;
      const length = 10;
      const replacement = 'there';

      const result = REPLACE(text, position, length, replacement);

      expect(result).toBe('hethere');
    });
  });

  describe('CLEAN function', () => {
    test('should remove control characters from the text', () => {
      const dirtyText = 'He\x00llo \x1FWorld!';

      const cleanedText = CLEAN(dirtyText);

      expect(cleanedText).toBe('Hello World!');
    });

    test('should handle empty text', () => {
      const dirtyText = '';

      const cleanedText = CLEAN(dirtyText);

      expect(cleanedText).toBe('');
    });

    test('should handle non-string input', () => {
      const dirtyText = 123;

      expect(() => CLEAN(dirtyText)).not.toThrow();
    });

    test('should handle text with no control characters', () => {
      const dirtyText = 'Hello World!';

      const cleanedText = CLEAN(dirtyText);

      expect(cleanedText).toBe('Hello World!');
    });
  });

  describe('CONCAT function', () => {
    test('should concatenate string arguments', () => {
      const result = CONCAT('Hello', ' ', 'World', '!');

      expect(result).toBe('Hello World!');
    });

    test('should handle empty arguments', () => {
      const result = CONCAT('', '', '');

      expect(result).toBe('');
    });

    test('should handle non-string arguments', () => {
      const result = CONCAT('Hello', 123, true);

      expect(result).toBe('Hello123true'); // Non-string arguments should be converted to strings and concatenated
    });

    test('should handle large number of arguments', () => {
      const result = CONCAT('a'.repeat(10000), 'b'.repeat(10000), 'c'.repeat(10000));

      expect(result.length).toBe(30000);
    });
  });

  describe('EXACT function', () => {
    test('should return true if two strings are exactly the same', () => {
      const result = EXACT('Hello', 'Hello');

      expect(result).toBe(true);
    });

    test('should return false if two strings are not exactly the same', () => {
      const result = EXACT('Hello', 'hello');

      expect(result).toBe(false);
    });

    test('should return false if two strings have different lengths', () => {
      const result = EXACT('Hello', 'Hello World');

      expect(result).toBe(false);
    });

    test('should handle empty strings', () => {
      const result = EXACT('', '');

      expect(result).toBe(true);
    });

    test('should handle non-string arguments', () => {
      const result = EXACT('Hello', 123);

      expect(result).toBe(false);
    });
  });

  describe('FIND function', () => {
    test('should return the position of the first occurrence of the search value in the text', () => {
      const result = FIND('world', 'Hello world');
      expect(result).toBe(7);
    });

    test('should return the position starting from the specified position', () => {
      const result = FIND('l', 'Hello world', 4);
      expect(result).toBe(10);
    });

    test('should return -1 if the search value is not found in the text', () => {
      const result = FIND('foo', 'Hello world');
      expect(result).toBe(0);
    });

    test('should return the correct position when the search value is an empty string', () => {
      const result = FIND('', 'Hello world');
      expect(result).toBe(1);
    });

    test('should handle non-string arguments', () => {
      const result = FIND('world', 123);
      expect(result).toBe(0);
    });
  });

  describe('LEFT function', () => {
    test('should return the leftmost characters of the text up to the specified length', () => {
      const result = LEFT('Hello world', 5);
      expect(result).toBe('Hello');
    });

    test('should return the whole text if length is greater than the text length', () => {
      const result = LEFT('Hello', 10);
      expect(result).toBe('Hello');
    });

    test('should return an empty string if length is 0', () => {
      const result = LEFT('Hello world', 0);
      expect(result).toBe('');
    });

    test('should return an empty string if text is empty', () => {
      const result = LEFT('', 5);
      expect(result).toBe('');
    });

    test('should handle non-string arguments for text', () => {
      const result = LEFT(123, 3);
      expect(result).toBe('123');
    });

    test('should handle non-number arguments for length', () => {
      const result = LEFT('Hello world', 'abc');
      expect(result).toBe('');
    });
  });

  describe('LEN function', () => {
    test('should return the length of the text', () => {
      const result = LEN('Hello world');
      expect(result).toBe(11);
    });

    test('should return 0 for an empty string', () => {
      const result = LEN('');
      expect(result).toBe(0);
    });

    test('should handle non-string arguments', () => {
      const result = LEN(123);
      expect(result).toBe(3);
    });
  });

  describe('LOWER function', () => {
    test('should convert text to lowercase', () => {
      const result = LOWER('HELLO');
      expect(result).toBe('hello');
    });

    test('should handle mixed case text', () => {
      const result = LOWER('HeLLo WoRLd');
      expect(result).toBe('hello world');
    });

    test('should handle non-string arguments', () => {
      const result = LOWER(123);
      expect(result).toBe('123');
    });
  });

  describe('MID function', () => {
    test('should extract middle characters from text', () => {
      const result = MID('abcdefgh', 2, 3);
      expect(result).toBe('bcd');
    });

    test('should handle start index at beginning of text', () => {
      const result = MID('abcdefgh', 1, 3);
      expect(result).toBe('abc');
    });

    test('should handle start index at end of text', () => {
      const result = MID('abcdefgh', 7, 3);
      expect(result).toBe('gh');
    });

    test('should handle non-string arguments', () => {
      const result = MID(12345, 2, 3);
      expect(result).toBe('234');
    });
  });

  describe('PROPER function', () => {
    test('should capitalize first letter of each word and convert others to lowercase', () => {
      const result = PROPER('hELLO woRLd');
      expect(result).toBe('Hello World');
    });

    test('should handle single word', () => {
      const result = PROPER('heLLo');
      expect(result).toBe('Hello');
    });

    test('should handle empty string', () => {
      const result = PROPER('');
      expect(result).toBe('');
    });

    test('should handle non-string arguments', () => {
      const result = PROPER(12345);
      expect(result).toBe('12345');
    });
  });

  describe('REPT function', () => {
    test('should repeat the text the specified number of times', () => {
      const result = REPT('hello', 3);
      expect(result).toBe('hellohellohello');
    });

    test('should handle repeating empty string', () => {
      const result = REPT('', 5);
      expect(result).toBe('');
    });

    test('should handle repeating with 0 times', () => {
      const result = REPT('abc', 0);
      expect(result).toBe('');
    });

    test('should handle non-numeric times', () => {
      const result = REPT('123', 'abc');
      expect(result).toBe('');
    });

    test('should handle non-string text', () => {
      const result = REPT(123, 2);
      expect(result).toBe('123123');
    });
  });

  describe('RIGHT function', () => {
    test('should return the rightmost characters of the text', () => {
      const result = RIGHT('hello', 3);
      expect(result).toBe('llo');
    });

    test('should return the whole text if length is greater than text length', () => {
      const result = RIGHT('world', 10);
      expect(result).toBe('world');
    });

    test('should return empty string for empty text', () => {
      const result = RIGHT('', 5);
      expect(result).toBe('');
    });

    test('should return empty string for length of 0', () => {
      const result = RIGHT('abc', 0);
      expect(result).toBe('');
    });

    test('should handle non-numeric length', () => {
      const result = RIGHT('123', 'abc');
      expect(result).toBe('123');
    });

    test('should handle non-string text', () => {
      const result = RIGHT(123, 2);
      expect(result).toBe('23');
    });
  });

  describe('SEARCH function', () => {
    test('should return the position of the first occurrence of the value in the text', () => {
      const result = SEARCH('world', 'Hello world!');
      expect(result).toBe(7);
    });

    test('should return the position considering the starting position', () => {
      const result = SEARCH('o', 'Hello world!', 5);
      expect(result).toBe(8);
    });

    test('should return 0 if the value is not found', () => {
      const result = SEARCH('z', 'Hello world!');
      expect(result).toBe(0);
    });

    test('should ignore case sensitivity', () => {
      const result = SEARCH('WORLD', 'Hello world!');
      expect(result).toBe(7);
    });

    test('should handle non-string valueToSearch', () => {
      const result = SEARCH(123, 'Hello 123!');
      expect(result).toBe(7);
    });

    test('should handle non-string text', () => {
      const result = SEARCH('world', 123);
      expect(result).toBe(0);
    });

    test('should handle non-numeric position', () => {
      const result = SEARCH('world', 'Hello world!', 'abc');
      expect(result).toBe(7);
    });
  });

  describe('TRIM function', () => {
    test('should remove leading and trailing whitespace', () => {
      const result = TRIM('  Hello world!  ');
      expect(result).toBe('Hello world!');
    });

    test('should remove extra spaces between words', () => {
      const result = TRIM('  Hello   world!  ');
      expect(result).toBe('Hello world!');
    });

    test('should handle empty string', () => {
      const result = TRIM('');
      expect(result).toBe('');
    });

    test('should handle string with only spaces', () => {
      const result = TRIM('    ');
      expect(result).toBe('');
    });

    test('should handle non-string input', () => {
      const result = TRIM(123);
      expect(result).toBe('123');
    });
  });

  describe('UPPER function', () => {
    test('should convert text to uppercase', () => {
      const result = UPPER('Hello world!');
      expect(result).toBe('HELLO WORLD!');
    });

    test('should handle empty string', () => {
      const result = UPPER('');
      expect(result).toBe('');
    });

    test('should handle non-string input', () => {
      const result = UPPER(123);
      expect(result).toBe('123');
    });
  });

  describe('VALUE function', () => {
    test('should convert numeric string to number', () => {
      const result = VALUE('123');
      expect(result).toBe(123);
    });

    test('should handle non-numeric string', () => {
      const result = VALUE('abc');
      expect(result).toBe(NaN);
    });

    test('should handle empty string', () => {
      const result = VALUE('');
      expect(result).toBe(0);
    });

    test('should handle numeric input', () => {
      const result = VALUE(456);
      expect(result).toBe(456);
    });
  });
});
