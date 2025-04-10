import { evalCriteriaParseResult, parseCriteriaExpression } from './criteria';

describe('Criteria', () => {
  describe('evalCriteriaParseResult', () => {
    test('evaluates basic numeric comparison operation', () => {
      const leftOperand = 5;
      const criteria: [string, number] = ['>', 3];

      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test('evaluates basic string comparison operation', () => {
      const leftOperand = 'banana';
      const criteria: [string, string] = ['=', 'banana'];

      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test('evaluates system criteria "#TRUE"', () => {
      const leftOperand = true;
      const criteria = '#TRUE';
      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test('evaluates system criteria "#EMPTY"', () => {
      const leftOperand = '';
      const criteria = '#EMPTY';
      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test('evaluates system criteria "#BLANK"', () => {
      const leftOperand = '';
      const criteria = '#BLANK';
      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test('evaluates invalid system criteria', () => {
      const leftOperand = 'value';
      const criteria = '#INVALID_CRITERIA';
      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(false);
    });

    test.each([
      [null],
      [undefined],
      [0],
      [true],
    ])('includes nullish values for "<>" operator', () => {
      const leftOperand = null;
      const criteria: [string, boolean] = ['<>', false];

      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test.each([
      [null],
      [undefined],
      [0],
      [true],
    ])('ignores nullish values for non "<>" operator', () => {
      const leftOperand = null;
      const criteria: [string, boolean] = ['>', false];

      const parseResult = parseCriteriaExpression(criteria);

      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(false);
    });
  });

  describe('parseCriteriaExpression', () => {
    test('correctly parse array criteria', () => {
      expect(parseCriteriaExpression(['>', 3])).toEqual({
        operator: '>',
        rightOperand: 3,
        disableCoercing: true,
        nullishValuesComparable: false,
      });
    });

    test('correctly parse array criteria for nullish comparable value operators', () => {
      expect(parseCriteriaExpression(['<>', false])).toEqual({
        operator: '<>',
        rightOperand: false,
        disableCoercing: true,
        nullishValuesComparable: true,
      });
    });

    test.each([
      ['#TRUE'],
      ['#FALSE'],
      ['#UNDEFINED'],
      ['#NULL'],
      ['#EMPTY'],
      ['#NOT_EMPTY'],
      ['#BLANK'],
      ['#NOT_BLANK'],
    ])('correctly parse system criteria', (operator) => {
      expect(parseCriteriaExpression(operator)).toEqual({
        systemCriteria: operator,
      });
    });

    test.each([
      ['value', '>=', false],
      ['value', '<=', false],
      ['value', '<>', true],
      ['value', '=', false],
      ['value', '>', false],
      ['value', '<', false],
    ])('correctly parse string criteria', (value, operator, nullishValuesComparable) => {
      expect(parseCriteriaExpression(`${operator}${value}`)).toEqual({
        operator,
        rightOperand: value,
        nullishValuesComparable,
      });
    });

    test('correctly parse criteria without operator', () => {
      expect(parseCriteriaExpression('123')).toEqual({
        operator: '=',
        rightOperand: '123',
        nullishValuesComparable: false,
      });
    });
  });
});
