import { createModule } from '../utils/module';
import { ExecutionError } from '@digifi/jexl';
import { ICriteriaParseResult } from '../utils/criteria';

const MAX_CRITERIA_COUNT = 30;

type ParsedCriteriaResult = {
  parsedCriteria: ICriteriaParseResult;
  criteriaColumn: string
};

export default createModule(({
  coerceToNumber,
  validateArrayMaxSize,
  evalCriteriaParseResult,
  parseCriteriaExpression,
}) => {
  const TABLESUM = (table: unknown, columnName: unknown) => {
    validateTableData(table, columnName);

    return (table as []).reduce((sum: number, tableRow: Record<string, unknown>) => {
      return sum + coerceToNumber(tableRow[columnName as string]);
    }, 0);
  };

  const TABLESUMIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLESUMIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLESUMIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return (table as []).reduce((sum: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }, index) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return sum + (evaluationResult ? coerceToNumber(tableRow[columnName]) : 0)
    }, 0);
  };

  const TABLECOUNT = (table: unknown, columnName: string) => {
    validateTableData(table, columnName);

    return (table as []).reduce((count: number, tableRow: Record<string, unknown>) => {
      return count + (tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLECOUNTIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLECOUNTIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLECOUNTIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return (table as []).reduce((count: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }, index) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return count + (evaluationResult && tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLEMAX = (table: unknown, columnName: string) => {
    validateTableData(table, columnName);

    return Math.max(...extractValidNumbersFromTable(table as [], columnName));
  };

  const TABLEMAXIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEMAXIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEMAXIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return Math.max(...extractValidNumbersFromTableWithCriteria(table as [], columnName, parsedCriteriaData));
  };

  const TABLEMIN = (table: unknown, columnName: string) => {
    validateTableData(table, columnName);

    return Math.min(...extractValidNumbersFromTable(table as [], columnName));
  };

  const TABLEMINIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEMINIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEMINIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return Math.min(...extractValidNumbersFromTableWithCriteria(table as [], columnName, parsedCriteriaData));
  };

  const getParsedMultipleCriteriaResult = (criteriaData: unknown[]) => {
    validateMultipleCriteriaData(criteriaData);

    return criteriaData.reduce((accumulator: ParsedCriteriaResult[], item, index) => {
      if (index % 2 !== 1) {
        return accumulator;
      }

      validateCriteriaData(criteriaData[index - 1], item);

      accumulator.push({
        parsedCriteria: parseCriteriaExpression(item as string) as ICriteriaParseResult,
        criteriaColumn: criteriaData[index - 1] as string,
      });

      return accumulator;
    }, [] as ParsedCriteriaResult[]);
  }

  const validateTableData = (table: unknown, column: unknown) => {
    if (!table || !Array.isArray(table)) {
      throw new ExecutionError('Table variable should be an array.');
    }

    if (typeof column !== 'string') {
      throw new ExecutionError('Column name should be a string.');
    }

    if (!column.length) {
      throw new ExecutionError('Column name cannot be empty.')
    }
  };

  const validateCriteriaData = (criteriaColumn: unknown, criteria: unknown) => {
    if (typeof criteriaColumn !== 'string') {
      throw new ExecutionError('Criteria column name should be a string.');
    }

    if (!criteriaColumn.length) {
      throw new ExecutionError('Criteria column name cannot be empty.');
    }

    if (typeof criteria !== 'string') {
      throw new ExecutionError('Criteria should be a string.');
    }
  };

  const validateMultipleCriteriaData = (criteriaData: unknown[]) => {
    if (!criteriaData.length) {
      throw new ExecutionError('There should be at least one logical criteria.');
    }

    if (criteriaData.length % 2 !== 0) {
      throw new ExecutionError('Each criteria should have a column name and a criteria expression.');
    }

    validateArrayMaxSize(criteriaData, MAX_CRITERIA_COUNT * 2); // a criteria consists of a column name and logical expression
  };

  const extractValidNumbersFromTable = (table: unknown[], columnName: string) => {
    return (table as []).reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
        if (tableRow[columnName] !== undefined && tableRow[columnName] !== null) {
          accumulator.push(coerceToNumber(tableRow[columnName]));
        }

        return accumulator;
      }, [] as number[])
  };

  const extractValidNumbersFromTableWithCriteria = (table: unknown[], columnName: string, parsedCriteriaData: ParsedCriteriaResult[]) => {
    return (table as []).reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
        if(tableRow[columnName] === undefined || tableRow[columnName] === null) {
          return accumulator;
        }

        const evaluationResult = parsedCriteriaData.every(
          ({ parsedCriteria, criteriaColumn }, index) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
        );

        if (evaluationResult) {
          accumulator.push(coerceToNumber(tableRow[columnName]));
        }

        return accumulator;
      }, [] as number[])
  }

  return {
    TABLESUM,
    TABLESUMIF,
    TABLESUMIFS,
    TABLECOUNT,
    TABLECOUNTIF,
    TABLECOUNTIFS,
    TABLEMAX,
    TABLEMAXIF,
    TABLEMAXIFS,
    TABLEMIN,
    TABLEMINIF,
    TABLEMINIFS,
  };
});
