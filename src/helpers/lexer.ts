import moo from "moo";

export const lexer = moo.compile({
  // Ignored tokens
  whitespace: { match: /[ \t]+/, lineBreaks: false },
  comment: { match: /\/\/.*?$/, lineBreaks: false },
  comment_multiline: { match: /\/\*[^]*?\*\//, lineBreaks: true },

  // Keywords (must come before identifier)
  KW_WHILE: "while",
  KW_IF: "if",
  KW_ELSE: "else",
  KW_LET: "let",
  KW_FN: "fn",
  KW_RETURN: "return",
  KW_TRUE: "true",
  KW_FALSE: "false",
  KW_NULL: "null",
  KW_STRUCT: "struct",

  // Primitive types (must come before identifier)
  TYPE_INT: "int",
  TYPE_FLOAT: "float",
  TYPE_STRING: "string",
  TYPE_BOOL: "bool",

  // I/O functions (must come before identifier)
  IO_PRINT: "print",
  IO_INPUT: "input",

  // Literals
  float: /[0-9]+\.[0-9]+/, // Must come before 'number'
  number: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,

  // Operators
  assign: "=",
  plus: "+",
  minus: "-",
  times: "*", // For multiplication
  divide: "/",
  mod: "%",
  eq: "==",
  neq: "!=",
  lt: "<",
  lte: "<=",
  gt: ">",
  gte: ">=",
  and: "&&",
  or: "||",
  not: "!",

  // Pointers and arrays
  ampersand: "&", // Changed from amp to avoid conflict if "amp" is a keyword/identifier
  star: "*", // For pointers, distinct from 'times' if necessary, though value is same. Nearley will use %star or %times.
  lbracket: "[",
  rbracket: "]",

  // Parentheses and braces
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",

  // Other symbols
  comma: ",",
  colon: ":",
  dot: ".",
  eol: ";", // End of Line/Statement

  // Identifiers (must come after keywords, types, and IO functions)
  identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,

  error: moo.error,

  // Newline (should be last so it doesn't override other tokens)
  newline: { match: /\r\n|\r|\n/, lineBreaks: true },
});

export async function Tokenize({ input }: { input: string }) {
  lexer.reset(input);
  const tokens: moo.Token[] = [];
  let token: moo.Token | undefined;

  while ((token = lexer.next()) !== undefined) {
    tokens.push(token);
  }

  return tokens;
}
