import nearley from "nearley";
const grammar = require("./nearley/grammar");

export const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

export async function Parse({ input }: { input: string }) {
  parser.feed(input);

  const result = parser.results;

  if (result.length > 1) {
    throw new Error("Ambiguous grammar: multiple parse trees found.");
  } else if (result.length === 0) {
    throw new Error("No valid parse tree found.");
  }

  return result[0];
}
