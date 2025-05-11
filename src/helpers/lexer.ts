import moo from "moo";

export const lexer = moo.compile({
  whitespace: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: "(",
  rparen: ")",
  keyword: [
    "while",
    "if",
    "else",
    "let",
    "function",
    "return",
    "true",
    "false",
    "null",
  ],
  io: ["input", "print"],
  eol: ";",
  newline: { match: /\n/, lineBreaks: true },
});

export async function Tokenize({ input }: { input: string }) {
  lexer.reset(input);
  const tokens: moo.Token[] = [];
  let token: moo.Token | undefined;

  while ((token = lexer.next()) !== undefined) {
    if (token.type !== "whitespace" && token.type !== "comment") {
      tokens.push(token);
    }
  }

  return tokens;
}
