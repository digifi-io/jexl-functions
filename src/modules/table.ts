import { createModule } from '../utils/module';
import { JexlFunctionExecutionError } from '../errors';
import { ICriteriaParseResult } from '../utils/criteria';

const MAX_CRITERIA_COUNT = 30;
const MAX_TABLE_ARRAY_LENGTH = 100;

type ParsedCriteriaResult = {
  parsedCriteria: ICriteriaParseResult;
  criteriaColumn: string
};

export default createModule(({
  coerceToNumber,
  coerceToArray,
  validateArrayMaxSize,
  validateTextLength,
  validateCriteria,
  evalCriteriaParseResult,
  parseCriteriaExpression,
}) => {
  const TABLESUM = (table: unknown, columnName: unknown) => {
    validateTableAndColumnData(table, columnName);

    return coerceToArray(table as []).reduce((sum: number, tableRow: Record<string, unknown>) => {
      return sum + coerceToNumber(tableRow[columnName as string]);
    }, 0);
  };

  const TABLESUMIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLESUMIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLESUMIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).reduce((sum: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return sum + (evaluationResult ? coerceToNumber(tableRow[columnName]) : 0)
    }, 0);
  };

  const TABLESUMIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).reduce((sum: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.some(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return sum + (evaluationResult ? coerceToNumber(tableRow[columnName]) : 0)
    }, 0);
  };

  const TABLECOUNT = (table: unknown, columnName: string) => {
    validateTableAndColumnData(table, columnName);

    return coerceToArray(table as []).reduce((count: number, tableRow: Record<string, unknown>) => {
      return count + (tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLECOUNTIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLECOUNTIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLECOUNTIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).reduce((count: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return count + (evaluationResult && tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLECOUNTIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).reduce((count: number, tableRow: Record<string, unknown>) => {
      const evaluationResult = parsedCriteriaData.some(({ parsedCriteria, criteriaColumn }) => evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string]));

      return count + (evaluationResult && tableRow[columnName] !== undefined && tableRow[columnName] !== null ? 1 : 0);
    }, 0);
  };

  const TABLEMAX = (table: unknown, columnName: string) => {
    validateTableAndColumnData(table, columnName);

    return Math.max(...extractValidNumbersFromTable(coerceToArray(table as []), columnName));
  };

  const TABLEMAXIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEMAXIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEMAXIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return Math.max(...extractValidNumbersFromTableWithAllPassingCriteria(coerceToArray(table as []), columnName, parsedCriteriaData));
  };

  const TABLEMAXIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return Math.max(...extractValidNumbersFromTableWithSomePassingCriteria(coerceToArray(table as []), columnName, parsedCriteriaData));
  };

  const TABLEMIN = (table: unknown, columnName: string) => {
    validateTableAndColumnData(table, columnName);

    return Math.min(...extractValidNumbersFromTable(coerceToArray(table as []), columnName));
  };

  const TABLEMINIF = (table: unknown, columnName: string, criteriaColumn: unknown, criteria: unknown) => {
    return TABLEMINIFS(table, columnName, criteriaColumn, criteria);
  };

  const TABLEMINIFS = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return Math.min(...extractValidNumbersFromTableWithAllPassingCriteria(coerceToArray(table as []), columnName, parsedCriteriaData));
  };

  const TABLEMINIFSOR = (table: unknown, columnName: string, ...criteriaData: unknown[]) => {
    validateTableAndColumnData(table, columnName);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return Math.min(...extractValidNumbersFromTableWithSomePassingCriteria(coerceToArray(table as []), columnName, parsedCriteriaData));
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
  }

  const TABLEFILTERROWSIFS = (table: unknown, ...criteriaData: unknown[]) => {
    validateTableData(table);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).filter((tableRow: Record<string, unknown>) =>
      parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) =>
        evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      )
    );
  }

  const TABLEFILTERROWSIFSOR = (table: unknown, ...criteriaData: unknown[]) => {
    validateTableData(table);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).filter((tableRow: Record<string, unknown>) =>
      parsedCriteriaData.some(({ parsedCriteria, criteriaColumn }) =>
        evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      )
    );
  }

  const TABLEMATCHESCONDITIONS = (table: unknown, ...criteriaData: unknown[]) => {
    validateTableData(table);

    const parsedCriteriaData = getParsedMultipleCriteriaResult(criteriaData);

    return coerceToArray(table as []).every((tableRow: Record<string, unknown>) =>
      parsedCriteriaData.every(({ parsedCriteria, criteriaColumn }) =>
        evalCriteriaParseResult(parsedCriteria, tableRow[criteriaColumn as string])
      )
    );
  }

  const TABLECONTCATROWS = (table: unknown, rowsToAdd: unknown) => {
    validateTableData(table);

    validateRowsToAddData(rowsToAdd, table);

    const combinedTable = coerceToArray(table as []).concat(coerceToArray(rowsToAdd as []));

    validateArrayMaxSize(combinedTable, MAX_TABLE_ARRAY_LENGTH);

    return combinedTable;
  }

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

    validateArrayMaxSize(table, MAX_TABLE_ARRAY_LENGTH);
  };

  const validateColumnData = (column: unknown) => {
    if (typeof column !== 'string') {
      throw new JexlFunctionExecutionError('Column name should be a string.');
    }

    if (!column.length) {
      throw new JexlFunctionExecutionError('Column name cannot be empty.')
    }
  };

  const validateTableAndColumnData = (table: unknown, column: unknown) => {
    validateTableData(table);

    validateColumnData(column);
  };

  const getTableColumnNames = (table: []) => table.reduce(
    (columnNames, row) => {
      Object.keys(row).map((columnName) => columnNames.add(columnName));

      return columnNames;
    },
    new Set()
  )

  const validateRowsToAddData = (rowsToAdd: unknown, originalTable: unknown) => {
    validateTableData(rowsToAdd, 'Added rows should be an array.');

    if (coerceToArray(rowsToAdd as []).some((row: Record<string, unknown>) => !(typeof row === 'object' && row !== null))) {
      throw new JexlFunctionExecutionError('Added rows should be objects.');
    }

    const originalColumnNames = getTableColumnNames(coerceToArray(originalTable as []) as []);
    const originalColumnNamesArray = [...originalColumnNames];
    const addedRowsColumnNames = getTableColumnNames(coerceToArray(rowsToAdd as []) as []);

    if (
      originalColumnNames.size !== addedRowsColumnNames.size ||
      originalColumnNamesArray.some((originalColumnName) => !addedRowsColumnNames.has(originalColumnName))
    ) {
      const missingColumns = originalColumnNamesArray.filter((originalColumnName) => !addedRowsColumnNames.has(originalColumnName));
      const errorMessage =
        missingColumns.length > 0
          ? `Added rows miss the following columns from the original table: ${missingColumns.join(', ')}.`
          : 'Added rows should have the same number of columns as the original table.';

      throw new JexlFunctionExecutionError(errorMessage);
    }
  }

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

    validateArrayMaxSize(criteriaData, MAX_CRITERIA_COUNT * 2); // a criteria consists of a column name and logical expression
  };

  const extractValidNumbersFromTable = (table: unknown[], columnName: string) => {
    return coerceToArray(table as []).reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
        if (tableRow[columnName] !== undefined && tableRow[columnName] !== null) {
          accumulator.push(coerceToNumber(tableRow[columnName]));
        }

        return accumulator;
      }, [] as number[])
  };

  const extractValidNumbersFromTableWithAllPassingCriteria = (table: unknown[], columnName: string, parsedCriteriaData: ParsedCriteriaResult[]) => {
    return coerceToArray(table as []).reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
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
      }, [] as number[])
  };

  const extractValidNumbersFromTableWithSomePassingCriteria = (table: unknown[], columnName: string, parsedCriteriaData: ParsedCriteriaResult[]) => {
    return coerceToArray(table as []).reduce((accumulator: number[], tableRow: Record<string, unknown>) => {
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
    }, [] as number[])
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
    TABLECONTCATROWS,
  };
});
