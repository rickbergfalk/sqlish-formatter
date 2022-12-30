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

// then with the compounds make an index
// { one: { two: true }, 'one two': { three: true } }
type CompoundIndex = Record<string, Record<string, boolean>>;
const compoundIndex: CompoundIndex = {};
compounds.forEach((compound) => {
  let runningCompound = "";
  compound.forEach((word) => {
    if (!runningCompound) {
      // If there is no running compound set we're on the first word
      // set running compound and create an empty object
      runningCompound = word;
      compoundIndex[runningCompound] = {};
    } else {
      compoundIndex[runningCompound][word] = true;
      runningCompound = runningCompound + " " + word;
      compoundIndex[runningCompound] = {};
    }
  });
});
// console.log(JSON.stringify(compoundMap, null, 2));

/**
 * Find out if token is part of a compound token
 * A compound token has multiple keywords like LEFT OUTER JOIN.
 * In this case, ` OUTER` would get appended to `LEFT`, and then ` JOIN` appended to `LEFT OUTER`
 */
function mergeCompounds(
  compoundLayer: CompoundIndex,
  token: moo.Token,
  nextToken: moo.Token,
  nextFn: () => moo.Token
) {
  if (compoundLayer?.[token?.value]?.[nextToken?.value]) {
    token.value = `${token.value} ${nextToken.value}`;
    token.text = `${token.text} ${nextToken.text}`;
    return mergeCompounds(compoundLayer, token, nextFn(), nextFn);
  }
  return { token, nextToken };
}

export function format(sql: string) {
  lexer.reset(sql);

  let prevToken: moo.Token | undefined = undefined;
  let token: moo.Token | undefined = undefined;
  let nextToken: moo.Token | undefined = undefined;

  // New algo goal:
  // Strip all whitespace. This library owns whitespace and changes nothing else.
  // Print the tokens, and in between print necessary whitespace.
  // This will require having lookbackward/forward references.

  function getNextNonWhiteToken(): moo.Token {
    let t = lexer.next();
    // advance until next token is non-whitespace
    while (t?.type === Types.whitespace) {
      t = lexer.next();
    }
    return t;
  }

  function next() {
    prevToken = token;
    token = nextToken;
    nextToken = getNextNonWhiteToken();

    const merged = mergeCompounds(
      compoundIndex,
      token,
      nextToken,
      getNextNonWhiteToken
    );
    token = merged.token;
    nextToken = merged.nextToken;
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

    // Latest approach - instead of mixing whether tokens print whitespace before or after the token
    // keep it consistent with each token getting appended to some whitespace
    // This sometimes requires looking back at previous token to figure what kind of whitespace to append if any.
    // This makes writing consistent. It is always (maybe whitespace + token) and nothing else.
    const val = token.value;
    if (token.type === Types.keyword && topLevelWordsNoIndent.includes(val)) {
      indent--;
      output += "\n";
    } else if (token.type === Types.keyword && topLevelWords.includes(val)) {
      indent--;
      output += "\n";
    } else if (token.type === Types.keyword && newlineWords.includes(val)) {
      output += "\n";
      output += getIndent();
    } else if (topLevelWords.includes(prevToken.value)) {
      output += "\n";
      indent++;
      output += getIndent();
    } else if (prevToken.type === Types.comma) {
      output += "\n" + getIndent();
    } else if (
      token.type === Types.period ||
      prevToken.type === Types.period ||
      token.type === Types.comma ||
      token.type === Types.lparen ||
      token.type === Types.rparen ||
      prevToken.type === Types.lparen
    ) {
      // noop - these conditions get no spaces
    } else {
      output += " ";
    }

    // Now print the token
    output += token.text;
    next();
  }

  // console.log(`\n-----\n${output.trim()}\n-----`);

  return output.trim();
}
