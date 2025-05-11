import BuildHandler from "handlers/build";

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
    BuildHandler({ args: commandArgs });
  } else if (command === "--run") {
    handleRun(commandArgs);
  } else if (command === "--help") {
    handleHelp();
  } else {
    console.log(`Unknown command: ${command}`);
    handleHelp();
  }
}
