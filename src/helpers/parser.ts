import nearley from "nearley";
// @ts-ignore
import grammar from "./nearley/grammar"; // Importar el grammar.js compilado

// Crear una nueva instancia del parser en cada llamada
export async function Parse({ inputString }: { inputString: string }) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  // Nearley maneja la tokenización internamente cuando se usa @lexer
  parser.feed(inputString);

  const result = parser.results;

  if (result.length > 1) {
    console.error("Result:", JSON.stringify(result, null, 2));
    throw new Error("Ambiguous grammar: multiple parse trees found.");
  } else if (result.length === 0) {
    // El error se lanzará desde el propio Nearley si no hay resultados,
    // o podemos personalizarlo aquí si es necesario.
    // Por ahora, confiamos en el error de Nearley o el que se propaga.
    throw new Error(
      "No valid parse tree found. Check for syntax errors in the input or issues in the grammar definition."
    );
  }

  return result[0];
}
