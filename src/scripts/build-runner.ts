import { execSync } from "child_process";
import { statSync, rmSync } from "fs";
import { join } from "path";

// Helper function to format date components to two digits
const formatDateComponent = (component: number): string => {
  return component.toString().padStart(2, "0");
};

// Get current date components
const currentDate = new Date();
const day = formatDateComponent(currentDate.getDate());
const month = formatDateComponent(currentDate.getMonth() + 1); // Month is 0-indexed
const year = formatDateComponent(currentDate.getFullYear() % 100); // Get last two digits of the year

// Get the first 7 digits of the current commit SHA
const shortSha = execSync("git rev-parse --short=7 HEAD").toString().trim();

// Define the final filename
const finalFilename = `tango-${day}-${month}-${year}-${shortSha}`;
const outDir = "./out";
const outFile = join(outDir, finalFilename);

// Construct the build command
const command = `bun build --compile --minify --sourcemap --bytecode ./src/entrypoint.ts --outfile ${outFile}`;

try {
  // Check if the output file already exists and delete it
  // bun build --compile throws an error if the output file already exists
  if (statSync(outFile, { throwIfNoEntry: false })) {
    console.log(`Output file ${outFile} already exists. Deleting...`);
    rmSync(outFile);
    console.log(`Deleted ${outFile}.`);
  }

  console.log(`Executing command: ${command}`);
  execSync(command, { stdio: "inherit" });
  console.log("Build completed successfully!");
} catch (error) {
  console.error("Error during build:", error);
  process.exit(1);
}
