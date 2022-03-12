import { lexer } from "./keywords";

enum Types {
  comma = "comma",
  comment = "comment",
  identifier = "identifier",
  keyword = "keyword",
  lparen = "lparen",
  number = "number",
  operator = "operator",
  period = "period",
  quotedIdentifier = "quotedIdentifer",
  rparen = "rparen",
  string = "string",
  terminator = "terminator",
  whitespace = "whitespace",
}

export function format(sql: string) {
  lexer.reset(sql);

  let tokens: moo.Token[] = Array.from(lexer);
  console.log(tokens);

  const first = tokens[0];

  if (first.type === Types.keyword) {
    // and then do something here I guess
  }

  return `hello world`;
}
