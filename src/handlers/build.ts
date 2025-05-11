import { Tokenize } from "helpers/lexer";
import { Parse } from "helpers/parser";

export default async function BuildHandler({ args }: { args: string[] }) {
  console.log("Building with args:", args);

  if (args.length === 0) {
    console.log("No arguments provided for build.");
    return;
  }

  if (!args[0]?.endsWith(".tango")) {
    console.log("Invalid file extension. Please provide a .tango file.");
    return;
  }

  const filePath = args[0];
  const file = Bun.file(filePath);

  const tokens = await Tokenize({ input: await file.text() }).then(() => {
    console.log("Tokens generated successfully!");
  });

  console.log("Tokens:", tokens);

  const ast = Parse({ input: await file.text() });

  console.log("AST:", ast);
}
