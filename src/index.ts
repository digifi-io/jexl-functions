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
};

export default jexlFunctions;
