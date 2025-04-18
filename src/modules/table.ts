import { createModule } from '../utils/module';
import { JexlFunctionExecutionError } from '../errors';
import { ICriteriaParseResult } from '../utils/criteria';

const MAX_CRITERIA_COUNT = 30;
const MAX_TABLE_ARRAY_LENGTH = 3000;

type ParsedCriteriaResult = {
  parsedCriteria: ICriteriaParseResult;
  criteriaColumn: string;
};

export default createModule(({
  coerceToNumber,
  coerceNullishValueToArray,
  validateArrayLikeValueMaxSize,
  validateTextLength,
  validateCriteria,
  evalCriteriaParseResult,
  parseCriteriaExpression,
}) => {
  const TABLESUM = (table: unknown, columnName: unknown) => {
    validateTableAndColumnData(table, columnName);

    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.reduce((sum: number, tableRow: Record<string, unknown>) => {
      return sum + coerceToNumber(tableRow[columnName as string]);
    }, 0);
  };

  const TABLESUMIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLESUMIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLESUMIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.reduce((sum: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return sum + (evaluationResult ? coerceToNumber(tableRow[columnName]) : 0);
    }, 0);
  };

  const TABLESUMIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.reduce((sum: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.some(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return sum + (evaluationResult ? coerceToNumber(tableRow[columnName]) : 0);
    }, 0);
  };

  const TABLECOUNT = (table: unknown, columnName: string) => {
    validateTableAndColumnData(table, columnName);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.reduce((count: number, tableRow: Record<string, unknown>) => {
      return count + (tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLECOUNTIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLECOUNTIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLECOUNTIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.reduce((count: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return count + (evaluationResult && tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLECOUNTIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.reduce((count: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.some(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return count + (evaluationResult && tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLEMAX = (table: unknown, columnName: string) => {
    validateTableAndColumnData(table, columnName);

    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return Math.max(...extractValidNumbersFromTable(coercedValue, columnName));
  };

  const TABLEMAXIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEMAXIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEMAXIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return Math.max(...extractValidNumbersFromTableWithAllPassingCriteria(coercedValue, columnName, parsedCriteriaData));
  };

  const TABLEMAXIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return Math.max(...extractValidNumbersFromTableWithSomePassingCriteria(coercedValue, columnName, parsedCriteriaData));
  };

  const TABLEMIN = (table: unknown, columnName: string) => {
    validateTableAndColumnData(table, columnName);

    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return Math.min(...extractValidNumbersFromTable(coercedValue, columnName));
  };

  const TABLEMINIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEMINIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEMINIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return Math.min(...extractValidNumbersFromTableWithAllPassingCriteria(coercedValue, columnName, parsedCriteriaData));
  };

  const TABLEMINIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return Math.min(...extractValidNumbersFromTableWithSomePassingCriteria(coercedValue, columnName, parsedCriteriaData));
  };

  const TABLEAVG = (table: unknown, columnName: unknown) => {
    return TABLESUM(table, columnName) / TABLECOUNT(table, columnName as string);
  };

  const TABLEAVGIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEAVGIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEAVGIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    return TABLESUMIFS(table, columnName,...criteriaData) / TABLECOUNTIFS(table, columnName, ...criteriaData);
  };

  const TABLEAVGIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    return TABLESUMIFSOR(table, columnName,...criteriaData) / TABLECOUNTIFSOR(table, columnName, ...criteriaData);
  };

  const TABLEFILTERROWSIF = (table: unknown, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEFILTERROWSIFS(table, criteriaColumn, criteria);
  };

  const TABLEFILTERROWSIFS = (table: unknown, ...criteriaData: unknown[]) => {
    validateTableData(table);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.filter((tableRow: Record<string, unknown>) =>
      parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) =>
        evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      )
    );
  };

  const TABLEFILTERROWSIFSOR = (table: unknown, ...criteriaData: unknown[]) => {
    validateTableData(table);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.filter((tableRow: Record<string, unknown>) =>
      parsedCriteriaData.some(({ parsedCriteria, criteriaColumn }) =>
        evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      )
    );
  };

  const TABLEMATCHESCONDITIONS = (table: unknown, ...criteriaData: unknown[]) => {
    validateTableData(table);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);
    const coercedValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedValue.every((tableRow: Record<string, unknown>) =>
      parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) =>
        evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      )
    );
  };

  const TABLECONCATROWS = (table: unknown, rowsToAdd: unknown) => {
    validateTableData(table);

    validateRowsToAddData(rowsToAdd);

    const coercedTableValue = coerceNullishValueToArray(table) as Record<string, unknown>[];
    const coercedRowsValue = coerceNullishValueToArray(rowsToAdd) as Record<string, unknown>[];

    const combinedTable = coercedTableValue.concat(coercedRowsValue);

    validateArrayLikeValueMaxSize(combinedTable, MAX_TABLE_ARRAY_LENGTH);

    return combinedTable;
  };

  /**
   * @deprecated Invalid function name. Use TABLECONCATROWS instead.
   */
  const TABLECONTCATROWS = (table: unknown, rowsToAdd: unknown) => {
    validateTableData(table);

    validateRowsToAddData(rowsToAdd);

    const coercedTableValue = coerceNullishValueToArray(table) as Record<string, unknown>[];
    const coercedRowsValue = coerceNullishValueToArray(rowsToAdd) as Record<string, unknown>[];
    const combinedTable = coercedTableValue.concat(coercedRowsValue);

    validateArrayLikeValueMaxSize(combinedTable, MAX_TABLE_ARRAY_LENGTH);

    return combinedTable;
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
  };

  const validateTableData = (table: unknown, message = 'Table variable should be an array.') => {
    if (table === null || table === undefined) {
      return;
    }

    if (!Array.isArray(table)) {
      throw new JexlFunctionExecutionError(message);
    }

    validateArrayLikeValueMaxSize(table, MAX_TABLE_ARRAY_LENGTH);
  };

  const validateColumnData = (column: unknown) => {
    if (typeof column !== 'string') {
      throw new JexlFunctionExecutionError('Column name should be a string.');
    }

    if (!column.length) {
      throw new JexlFunctionExecutionError('Column name cannot be empty.');
    }
  };

  const validateTableAndColumnData = (table: unknown, column: unknown) => {
    validateTableData(table);

    validateColumnData(column);
  };

  const validateRowsToAddData = (rowsToAdd: unknown) => {
    validateTableData(rowsToAdd, 'Added rows should be an array.');

    const coercedRowsValue = coerceNullishValueToArray(rowsToAdd) as Record<string, unknown>[];

    if (coercedRowsValue.some((row) => !(typeof row === 'object' && row !== null))) {
      throw new JexlFunctionExecutionError('Added rows should be objects.');
    }
  };

  const validateCriteriaData = (criteriaColumn: unknown, criteria: unknown) => {
    if (typeof criteriaColumn !== 'string') {
      throw new JexlFunctionExecutionError('Criteria column name should be a string.');
    }

    if (!criteriaColumn.length) {
      throw new JexlFunctionExecutionError('Criteria column name cannot be empty.');
    }

    validateTextLength(criteriaColumn);
    validateCriteria(criteria);
  };

  const validateMultipleCriteriaData = (criteriaData: unknown[]) => {
    if (!criteriaData.length) {
      throw new JexlFunctionExecutionError('There should be at least one logical criteria.');
    }

    if (criteriaData.length % 2 !== 0) {
      throw new JexlFunctionExecutionError('Each criteria should have a column name and a criteria expression.');
    }

    validateArrayLikeValueMaxSize(criteriaData, MAX_CRITERIA_COUNT * 2); // a criteria consists of a column name and logical expression
  };

  const extractValidNumbersFromTable = (table: unknown[], columnName: string) => {
    const coercedTableValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedTableValue.reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
      if (tableRow[columnName] !== undefined && tableRow[columnName] !== null) {
        accumulator.push(coerceToNumber(tableRow[columnName]));
      }

      return accumulator;
    }, [] as number[]);
  };

  const extractValidNumbersFromTableWithAllPassingCriteria = (table: unknown[], columnName: string, parsedCriteriaData: ParsedCriteriaResult[]) => {
    const coercedTableValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedTableValue.reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
      if (tableRow[columnName] === undefined || tableRow[columnName] === null) {
        return accumulator;
      }

      const evaluationResult = parsedCriteriaData.every(
        ({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      );

      if (evaluationResult) {
        accumulator.push(coerceToNumber(tableRow[columnName]));
      }

      return accumulator;
    }, [] as number[]);
  };

  const extractValidNumbersFromTableWithSomePassingCriteria = (table: unknown[], columnName: string, parsedCriteriaData: ParsedCriteriaResult[]) => {
    const coercedTableValue = coerceNullishValueToArray(table) as Record<string, unknown>[];

    return coercedTableValue.reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
      if (tableRow[columnName] === undefined || tableRow[columnName] === null) {
        return accumulator;
      }

      const evaluationResult = parsedCriteriaData.some(
        ({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      );

      if (evaluationResult) {
        accumulator.push(coerceToNumber(tableRow[columnName]));
      }

      return accumulator;
    }, [] as number[]);
  };

  return {
    TABLESUM,
    TABLESUMIF,
    TABLESUMIFS,
    TABLESUMIFSOR,
    TABLECOUNT,
    TABLECOUNTIF,
    TABLECOUNTIFS,
    TABLECOUNTIFSOR,
    TABLEMAX,
    TABLEMAXIF,
    TABLEMAXIFS,
    TABLEMAXIFSOR,
    TABLEMIN,
    TABLEMINIF,
    TABLEMINIFS,
    TABLEMINIFSOR,
    TABLEAVG,
    TABLEAVGIF,
    TABLEAVGIFS,
    TABLEAVGIFSOR,
    TABLEFILTERROWSIF,
    TABLEFILTERROWSIFS,
    TABLEFILTERROWSIFSOR,
    TABLEMATCHESCONDITIONS,
    TABLECONCATROWS,
    TABLECONTCATROWS,
  };
});
