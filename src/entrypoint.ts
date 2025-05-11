import { BuildHandler } from "handlers/build";

function handleRun(args: string[]) {
  console.log("Running with args:", args);
}

function handleHelp() {
  console.log("Usage:");
  console.log("  --build <...args>");
  console.log("  --run <...args>");
  console.log("  --help");
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Tango!");
  handleHelp();
} else {
  const command = args[0];
  const commandArgs = args.slice(1);

  if (command === "--build") {
    if (commandArgs.length < 1) {
      console.error("Error: No file path specified for --build command.");
      handleHelp();
      process.exit(1);
    }
    const filePath = commandArgs[0];
    // TODO: Allow specifying outDir via command line arguments
    const outDir = "./tango_out";
    BuildHandler({ filePath, outDir });
  } else if (command === "--run") {
    handleRun(commandArgs);
  } else if (command === "--help") {
    handleHelp();
  } else {
    console.log(`Unknown command: ${command}`);
    handleHelp();
  }
}
