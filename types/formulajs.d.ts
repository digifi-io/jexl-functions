declare module '@formulajs/formulajs' {
  export type FormulaJs = Record<string, (...args: any) => any | FormulaJs>;

  const formulaJs: FormulaJs;

  export default formulaJs;
}