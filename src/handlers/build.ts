import { Parse } from "helpers/parser";
import { Tokenize } from "helpers/lexer";
// @ts-ignore
import { Token } from "moo";
import * as path from "path";

interface BuildOptions {
  filePath: string;
  outDir?: string;
  // TODO: Add more options as needed
}

export async function BuildHandler({ filePath, outDir }: BuildOptions) {
  if (!filePath) {
    throw new Error("No file path provided.");
  }

  const fileContent = await Bun.file(filePath).text();

  // Log all tokens and exit
  const tokens = await Tokenize({ input: fileContent });
  console.log("Tokens:", JSON.stringify(tokens, null, 2));
  process.exit(0);

  // This part will not be reached due to process.exit(0)
  try {
    const ast = await Parse({ inputString: fileContent });
    console.log("AST:", JSON.stringify(ast, null, 2));

    const defaultOutDir =
      outDir || path.join(path.dirname(filePath), "tango_out");
    // Ensure the output directory exists
    await Bun.write(defaultOutDir, ""); // This is a way to ensure directory, Bun might need specific dir creation
    const baseName = path.basename(filePath, ".tango");
    const outPath = path.join(defaultOutDir, `${baseName}.ast.json`);

    await Bun.write(outPath, JSON.stringify(ast, null, 2));
    console.log(`AST written to ${outPath}`);
  } catch (e: any) {
    if (e.token) {
      const { line, col, offset } = e.token;
      const problematicToken = e.token;
      console.error(
        `error: Syntax error at line ${line} col ${col}: ... ${
          e.message.split("\n")[0]
        }`
      );
      // Log the problematic token and its context if available
      const contextChars = 20;
      const startContext = Math.max(0, offset - contextChars);
      const endContext = Math.min(
        fileContent.length,
        offset + problematicToken.text.length + contextChars
      );
      const context = fileContent.substring(startContext, endContext);
      console.error(`Context:`);
      console.error(`...${context}...`);
      console.error(
        `Problematic token:`,
        JSON.stringify(problematicToken, null, 2)
      );
    } else {
      console.error("error: ", e.message || e);
    }
    // console.error(e); // Full error for more details if needed
    process.exit(1);
  }
}
