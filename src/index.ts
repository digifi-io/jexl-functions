import formulaJs from '@formulajs/formulajs';

const jexlFunctions: Record<string, (...args: any[]) => any> = {
  ...(
    Object.keys(formulaJs)
      .filter((functionName) => typeof formulaJs[functionName] === 'function')
      .reduce((formulaJsFunctions, functionName) => ({ ...formulaJsFunctions, [functionName]: formulaJs[functionName] }), {})
  ),
};

export default jexlFunctions;
