import { Tokenize } from "helpers/lexer";

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

  const tokens = await Tokenize({ input: await file.text() });

  console.log("Tokens:", tokens);
}
