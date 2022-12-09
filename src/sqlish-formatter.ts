import {
  lexer,
  topLevelWords,
  topLevelWordsNoIndent,
  newlineWords,
} from "./keywords";

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

// Array of arrays of compound keywords like
// [["inner", "join"]];
const compounds = [...topLevelWords, ...topLevelWordsNoIndent, ...newlineWords]
  .map((words) => words.split(" "))
  .filter((words) => words.length > 1);

export function format(sql: string) {
  lexer.reset(sql);

  let prevToken: moo.Token | undefined = undefined;
  let token: moo.Token | undefined = undefined;
  let nextToken: moo.Token | undefined = undefined;

  // New algo goal:
  // Strip all whitespace. This library owns whitespace and changes nothing else.
  // Print the tokens, and in between print necessary whitespace.
  // This will require having lookbackward/forward references.

  // This function owns advancing the tokens.
  // It tracks the prev and next tokens, and does helpful thing like stripping whitespace
  // Eventually it should combine compound words too
  function next() {
    prevToken = token;
    token = nextToken;
    nextToken = lexer.next();
    // advance until next token is non-whitespace
    while (nextToken?.type === Types.whitespace) {
      nextToken = lexer.next();
    }
  }

  // Bootstrap the prevToken, token, and nextToken variables
  // This is called twiced because first time token will be nextToken which is undefined.
  next();
  next();

  let output = "";
  let indent = 1;

  function getIndent() {
    return "\t".repeat(indent);
  }

  // TODO algorithm
  // How whitespace is managed depends on preceding and following nodes
  // for example, sometimes new lines are determined because of a prior keyword, or comma
  // `SELECT` requires a new line and indentation
  // Other times can require knowing what follows something. JOINs for example require a  new line prior
  //
  // ```
  // FROM
  //   sometable s
  //   JOIN another_table AS at ON
  // ```
  //
  // Ultimately we have indicators where we need to capture newLine after or newline prior
  // And each time we add a newline, we need to flag whether it needs an indent or not

  while (token) {
    // We should never have whitespace here. It should be filtered out with our next function
    if (token.type === Types.whitespace) {
      throw new Error("Unexpected whitespace");
    }

    console.log(token.text);

    if (token.type === Types.keyword) {
      const val = token.value;

      if (topLevelWordsNoIndent.includes(val)) {
        indent--;
        output += "\n";
        output += token.text;
        next();
        continue;
      }

      if (topLevelWords.includes(val)) {
        indent--;
        output += "\n";
        output += token.text;
        // We don't know if we can indent the next block. This might be a compound top-level
        output += "\n";
        indent++;
        output += getIndent();
        next();
        continue;
      }

      if (newlineWords.includes(val)) {
        output += "\n";
        output += token.text;
        next();
        continue;
      }

      output += " " + token.text;
      next();
      continue;
    }

    if (token.type === Types.comma) {
      output += token.text + "\n" + getIndent();
      next();
      continue;
    }

    output += token.text;
    next();
  }

  console.log("\n-----");
  console.log(output.trim());
  console.log("\n-----");

  return output.trim();
}
