import { topLevelWords, topLevelWordsNoIndent, newlineWords } from "./keywords";
import { lexer } from "./lexer";

interface Token extends moo.Token {
  spaceBefore: boolean;
}

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

/**
 * Find out if token is part of a compound token
 * A compound token has multiple keywords like LEFT OUTER JOIN.
 * In this case, ` OUTER` would get appended to `LEFT`, and then ` JOIN` appended to `LEFT OUTER`
 */
function mergeCompounds(
  compoundLayer: CompoundIndex,
  token: Token,
  nextToken: Token,
  nextFn: () => Token
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

  let prevToken: Token | undefined = undefined;
  let token: Token | undefined = undefined;
  let nextToken: Token | undefined = undefined;

  let output = "";
  let indent = 0;
  const parens: Array<"function" | "expression"> = [];

  function getIndent() {
    return indent > 0 ? "\t".repeat(indent) : "";
  }

  function getNextNonWhiteToken(): Token {
    let t: Token | undefined = lexer.next();
    if (t) {
      t.spaceBefore = false;
    }

    // advance until next token is non-whitespace
    while (t?.type === Types.whitespace) {
      t = lexer.next();
      if (t) {
        t.spaceBefore = true;
      }
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

  while (token) {
    // We should never have whitespace here. It should be filtered out with our next function
    if (token.type === Types.whitespace) {
      throw new Error("Unexpected whitespace");
    }

    // Capture what kind of paren we're entering into
    if (token.type === Types.lparen) {
      parens.push(token.spaceBefore ? "expression" : "function");
    }

    // Latest approach - instead of mixing whether tokens print whitespace before or after the token
    // keep it consistent with each token getting appended to some whitespace
    // This sometimes requires looking back at previous token to figure what kind of whitespace to append if any.
    // This makes writing consistent. It is always (maybe whitespace + token) and nothing else.
    const val = token.value;
    if (token.type === Types.keyword && topLevelWordsNoIndent.includes(val)) {
      if (indent > 0) {
        indent--;
      }
      output += "\n";
    } else if (token.type === Types.keyword && topLevelWords.includes(val)) {
      if (indent > 0) {
        indent--;
      }
      output += "\n";
      output += getIndent();
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
      prevToken.type === Types.lparen
    ) {
      // noop - these conditions get no spaces
    } else if (token.type === Types.lparen) {
      indent++;
      if (token.spaceBefore) {
        output += " ";
      }
    } else if (token.type === Types.rparen) {
      const parenType = parens.pop();
      if (parenType === "expression") {
        output += " ";
      }
      // TODO FIXME XXX - no way to know if this is closing function paren or what
      // we need statements, clauses, and expressions. See README
      indent--;
    } else {
      output += " ";
    }

    // Now print the token
    output += token.text;
    next();
  }

  return output.trim();
}
