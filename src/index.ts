import createArrayModule from './modules/array';
import createDateAndTimeModule from './modules/date-and-time';
import createLogicalModule from './modules/logical';
import createFinancialModule from './modules/financial';
import createStatisticModule from './modules/statistic';
import createInformationModule from './modules/information';
import createTextModule from './modules/text';
import createMathAndTrigModule from './modules/math-and-trig';
import createAddressModule from './modules/address';
import createTableModule from './modules/table';
import createGeneralModule from './modules/general';
import createFormattingModule from './modules/formatting';

const jexlFunctions = {
  ...createArrayModule(),
  ...createDateAndTimeModule(),
  ...createLogicalModule(),
  ...createFinancialModule(),
  ...createStatisticModule(),
  ...createInformationModule(),
  ...createTextModule(),
  ...createMathAndTrigModule(),
  ...createAddressModule(),
  ...createTableModule(),
  ...createGeneralModule(),
  ...createFormattingModule(),
};

export * from './errors';

export default jexlFunctions;
