import { evalCriteriaParseResult, parseCriteriaExpression } from './criteria';

describe('Criteria', () => {
  describe('evalCriteriaParseResult function', () => {
    test('evaluates basic numeric comparison operation', () => {
      const leftOperand = 5;
      const criteria = ['>', 3];
      // @ts-ignore
      const parseResult = parseCriteriaExpression(criteria);
      expect(evalCriteriaParseResult(parseResult, leftOperand)).toBe(true);
    });

    test('evaluates basic string comparison operation', () => {
      const leftOperand = 'banana';
      const criteria = ['=', 'banana'];
      // @ts-ignore
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
  });
});
