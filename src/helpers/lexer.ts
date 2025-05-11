import moo from "moo";

export const lexer = moo.compile({
  // Ignored tokens
  whitespace: { match: /[ \t]+/, lineBreaks: false },
  comment: { match: /\/\/.*?$/, lineBreaks: false },
  comment_multiline: { match: /\/\*[^]*?\*\//, lineBreaks: true },

  // Literals
  float: /[0-9]+\.[0-9]+/, // Must come before 'number'
  number: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,

  // Primitive types
  type: ["int", "float", "string", "bool"],

  // Keywords
  keyword: [
    "while",
    "if",
    "else",
    "let",
    "fn",
    "return",
    "true",
    "false",
    "null",
  ],

  // I/O functions
  io: ["input", "print"],

  // Operators
  assign: "=",
  plus: "+",
  minus: "-",
  times: "*",
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
  amp: "&",
  star: "*",
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
  eol: ";",

  // Identifiers (must come after keywords and types)
  identifier: {
    match: /[a-zA-Z_][a-zA-Z0-9_]*/,
    type: moo.keywords({
      // This ensures keywords and types are recognized before identifiers
      type: ["int", "float", "string", "bool"],
      keyword: [
        "while",
        "if",
        "else",
        "let",
        "fn",
        "return",
        "true",
        "false",
        "null",
      ],
      io: ["input", "print"],
    }),
  },

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
