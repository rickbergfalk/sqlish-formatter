import { lexer } from "./keywords";

export function format(sql: string) {
  lexer.reset(sql);

  let tokens = Array.from(lexer);
  console.log(tokens);

  return `hello world`;
}
