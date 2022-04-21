import formulaJs from '@formulajs/formulajs';
import * as customFunctions from './custom';
import * as ruleFunctions from './rule';

const jexlFunctions: Record<string, (...args: any[]) => any> = {
  ...(
    Object.keys(formulaJs)
      .filter((functionName) => typeof formulaJs[functionName] === 'function')
      .reduce((formulaJsFunctions, functionName) => ({ ...formulaJsFunctions, [functionName]: formulaJs[functionName] }), {})
  ),
  ...ruleFunctions,
  ...customFunctions,
};

export default jexlFunctions;
