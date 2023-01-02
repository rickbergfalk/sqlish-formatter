// @ts-expect-error no default export
import moo from "moo";

export const keywords = [
  "absolute",
  "action",
  "ada",
  "add",
  "all",
  "allocate",
  "alter",
  "and",
  "any",
  "are",
  "as",
  "asc",
  "assertion",
  "at",
  "authorization",
  "avg",
  "backup",
  "begin",
  "between",
  "bit_length",
  "bit",
  "both",
  "break",
  "browse",
  "bulk",
  "by",
  "cascade",
  "cascaded",
  "case",
  "cast",
  "catalog",
  "char_length",
  "char",
  "character_length",
  "character",
  "check",
  "checkpoint",
  "close",
  "clustered",
  "coalesce",
  "collate",
  "collation",
  "column",
  "commit",
  "compute",
  "connect",
  "connection",
  "constraint",
  "constraints",
  "contains",
  "containstable",
  "continue",
  "convert",
  "corresponding",
  "count",
  "create",
  "cross",
  "current_date",
  "current_time",
  "current_timestamp",
  "current_user",
  "current",
  "cursor",
  "database",
  "date",
  "day",
  "dbcc",
  "deallocate",
  "dec",
  "decimal",
  "declare",
  "default",
  "deferrable",
  "deferred",
  "delete",
  "deny",
  "desc",
  "describe",
  "descriptor",
  "diagnostics",
  "disconnect",
  "disk",
  "distinct",
  "distributed",
  "domain",
  "double",
  "drop",
  "dump",
  "else",
  "end-exec",
  "end",
  "errlvl",
  "escape",
  "except",
  "exception",
  "exec",
  "execute",
  "exists",
  "exit",
  "external",
  "extract",
  "false",
  "fetch",
  "file",
  "fillfactor",
  "first",
  "float",
  "for",
  "foreign",
  "fortran",
  "found",
  "freetext",
  "freetexttable",
  "from",
  "full",
  "function",
  "get",
  "global",
  "go",
  "goto",
  "grant",
  "group",
  "having",
  "holdlock",
  "hour",
  "identity_insert",
  "identity",
  "identitycol",
  "if",
  "immediate",
  "in",
  "include",
  "index",
  "indicator",
  "initially",
  "inner",
  "input",
  "insensitive",
  "insert",
  "int",
  "integer",
  "intersect",
  "interval",
  "into",
  "is",
  "isolation",
  "join",
  "key",
  "kill",
  "language",
  "last",
  "leading",
  "left",
  "level",
  "like",
  "limit",
  "lineno",
  "load",
  "local",
  "locked",
  "lower",
  "match",
  "max",
  "merge",
  "min",
  "minute",
  "module",
  "month",
  "names",
  "national",
  "natural",
  "nchar",
  "next",
  "no",
  "nocheck",
  "nonclustered",
  "none",
  "not",
  "nowait",
  "null",
  "nullif",
  "numeric",
  "octet_length",
  "of",
  "off",
  "offset",
  "offsets",
  "on",
  "only",
  "open",
  "opendatasource",
  "openquery",
  "openrowset",
  "openxml",
  "option",
  "or",
  "order",
  "outer",
  "output",
  "over",
  "overlaps",
  "pad",
  "partial",
  "pascal",
  "percent",
  "pivot",
  "plan",
  "position",
  "precision",
  "prepare",
  "preserve",
  "primary",
  "print",
  "prior",
  "privileges",
  "proc",
  "procedure",
  "public",
  "raiserror",
  "read",
  "readtext",
  "real",
  "reconfigure",
  "references",
  "relative",
  "replication",
  "restore",
  "restrict",
  "return",
  "revert",
  "revoke",
  "right",
  "right",
  "rollback",
  "row",
  "rowcount",
  "rowguidcol",
  "rows",
  "rule",
  "save",
  "schema",
  "scroll",
  "second",
  "section",
  "securityaudit",
  "select",
  "semantickeyphrasetable",
  "semanticsimilaritydetailstable",
  "semanticsimilaritytable",
  "session_user",
  "session",
  "set",
  "setuser",
  "share",
  "show",
  "shutdown",
  "size",
  "skip",
  "smallint",
  "some",
  "space",
  "sql",
  "sqlca",
  "sqlcode",
  "sqlerror",
  "sqlstate",
  "sqlwarning",
  "statistics",
  "substring",
  "sum",
  "system_user",
  "table",
  "tablesample",
  "temporary",
  "textsize",
  "then",
  "time",
  "timestamp",
  "timezone_hour",
  "timezone_minute",
  "to",
  "top",
  "trailing",
  "tran",
  "transaction",
  "translate",
  "translation",
  "trigger",
  "trim",
  "true",
  "truncate",
  "try_convert",
  "tsequal",
  "union",
  "unique",
  "unknown",
  "unpivot",
  "update",
  "updatetext",
  "upper",
  "usage",
  "use",
  "user",
  "using",
  "value",
  "values",
  "varchar",
  "varying",
  "view",
  "waitfor",
  "when",
  "whenever",
  "where",
  "while",
  "with",
  "within group",
  "work",
  "write",
  "writetext",
  "year",
  "zone",
];

export const topLevelWords = [
  "add",
  "after",
  "alter column",
  "alter table",
  "case",
  "delete from",
  "end",
  "except",
  "fetch first",
  "from",
  "group by",
  "having",
  "insert into",
  "insert",
  "limit",
  "order by",
  "select",
  "set current schema",
  "set schema",
  "set",
  "update",
  "values",
  "where",
];

export const topLevelWordsNoIndent = [
  "intersect",
  "intersect all",
  "union",
  "union all",
];

export const newlineWords = [
  "and",
  "else",
  "or",
  "when",
  "join",
  "inner join",
  "left join",
  "left outer join",
  "right join",
  "right outer join",
  "full join",
  "full outer join",
  "cross join",
  "natural join",
];

const allWords = [
  ...newlineWords,
  ...topLevelWords,
  ...topLevelWordsNoIndent,
  ...keywords,
];
const uniqueKeywords = Array.from(new Set(allWords));

// Incoming values will also be compared as lower case to make keyword matching case insensitive
const caseInsensitiveKeywords = (defs) => {
  const defineKeywords = moo.keywords(defs);
  return (value) => defineKeywords(value.toLowerCase());
};

export const lexer = moo.compile({
  whitespace: [
    /[ \t]+/u,
    { match: /\r\n/u, lineBreaks: true },
    { match: /\n/u, lineBreaks: true },
  ],
  // First expression is --line comment, second is /* multi line */
  comment: [/--.*?$/u, /\/\*[^]*?\*\//u],
  lparen: "(",
  rparen: ")",
  comma: ",",
  period: ".",

  number: /0|[1-9][0-9]*/u,

  // ; is standard, \g is a shortcut used in psql and Actian tooling
  // Are there others?
  terminator: [";", "\\g"],

  // text == original text
  // value == value inside quotes
  quotedIdentifier: [
    {
      match: /".*?"/u,
      value: (x) => x.slice(1, -1),
    },
    {
      match: /\[.*?\]/u,
      value: (x) => x.slice(1, -1),
    },
    {
      match: /`.*?`/u,
      value: (x) => x.slice(1, -1),
    },
  ],

  // Updated to allow multi-line strings,
  // which is allowed by some database drivers (sqlite, actian)
  // This does not correctly handle escaped doublequotes, however the end result is ok for sql-limiter
  // Instead of a single string token we get 2 separate string tokens back-to-back
  string: [
    {
      match: /'[^']*'/u,
      lineBreaks: true,
    },
  ],

  // Remaining test is assumed to be an identifier of some kinds (column or table)
  // UNLESS it matches a keyword case insensitively
  // The value of these tokens are converted to lower case
  identifier: [
    {
      // This is added to handle non-english identifiers.
      // This range may be too broad
      // eslint-disable-next-line no-control-regex
      match: /(?:\w|[^\u0000-\u007F])+/u,
      type: caseInsensitiveKeywords({
        keyword: uniqueKeywords,
      }),
      value: (s) => s.toLowerCase(),
    },
  ],

  // Any combination of special characters is to be treated as an operator (as a guess anyways)
  // Initially these were being noted here but the list is large
  // and there is no way to know all operators since this supports anything that is SQL-ish
  operator: {
    match: /[<>~!@#$%^?&|`*\-{}+=:/\\[\]]+/u,
    lineBreaks: false,
  },
});

// open paren considered ["(", "CASE"]
// close parens considered [")", "END"]
