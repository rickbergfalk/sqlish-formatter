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

const compounds = [["inner", "join"]];

export function format(sql: string) {
  lexer.reset(sql);

  let tokens: moo.Token[] = Array.from(lexer);

  let output = "";
  let indent = 1;
  let inCompound: string[] | undefined = undefined;

  function getIndent() {
    return "  ".repeat(indent);
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === Types.whitespace) {
      output += " ";
      continue;
    }

    if (token.type === Types.keyword) {
      // If keyword is *potentially* part of compound keyword, handle it special
      const compound = compounds.find(
        (compound) => compound[0] === token.value
      );
      if (compound) {
        inCompound = compound;
        indent--;
        output += "\n";
        output += token.text;
        continue;
      }

      if (!inCompound) {
        indent--;
        output += "\n";
        output += token.text + "\n";
        indent++;
        output += getIndent();
        continue;
      }

      // Current token is not the start of a compound, but we're potentially in one.
      // If token is whitespace or exists in compound we're potentially in, stay in the compound
      // Otherwise we've broken free and can do the usually keyword thing
      if (inCompound.includes(token.value)) {
        output += token.text;
        // If last token in compound, unflag
        if (inCompound[inCompound.length - 1] === token.text) {
          inCompound = undefined;
          output += "\n";
          indent++;
          output += getIndent();
        }
        continue;
      } else {
        // Out of compound. start a new line
        inCompound = undefined;
        output += "\n";
        indent++;
        output += getIndent();
        output += token.text;
        continue;
      }
    }

    if (token.type === Types.comma) {
      output += token.text + "\n" + getIndent();
      continue;
    }

    output += token.text;
  }

  console.log(output);

  return `hello world`;
}
