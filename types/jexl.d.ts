declare module '@digifi/jexl' {
  export type ICompiledAST = Record<string, unknown>;
  export type EvalResult = number | string | boolean | null | undefined | Record<string, unknown>;

  export type JexlTokenType = 'FunctionCall' | 'Identifier';

  interface TokenPosition {
    start: number;
    end: number;
  }

  export interface TokenWithPosition {
    name: string;
    type: JexlTokenType;
    position: TokenPosition;
  }

  export interface JexlExpression {
    getAst(): ICompiledAST;
    evalSync(context: Record<string, unknown>): EvalResult;
  }

  export class Jexl {
    public evalSync(code: string, context: Record<string, unknown>): EvalResult;
    public evalSyncPreCompiled(code: string, ast: ICompiledAST, context: Record<string, unknown>): EvalResult;
    public compile(code: string): JexlExpression;
    public findIdentifiersByAst(ast: ICompiledAST): string[];
    public findIdentifiersWithPositionByAst(ast: ICompiledAST): Array<TokenWithPosition>;
    public findTokensByAstAndTypes(ast: ICompiledAST, tokenTypes: string[]): Array<TokenWithPosition>;
    public addFunctions(map: Record<string, (args: unknown[]) => unknown>): void;
  }

  export class JexlError extends Error {}
  export class ExecutionError extends JexlError {}
  export class TimeoutError extends JexlError {}

  const jexl: Jexl;

  export default jexl;
}
