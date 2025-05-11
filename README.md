# Tango

![Build](https://img.shields.io/github/actions/workflow/status/opticalsecurity/tango/ci.yml)
![Version](https://img.shields.io/github/v/release/opticalsecurity/tango)
![License](https://img.shields.io/github/license/opticalsecurity/tango)

Tango is an open-source programming language designed to be as simple and easy to use as JavaScript/TypeScript, but with a focus on performance and low-level control like C/C++.

---

## Features

- Familiar JavaScript/TypeScript-like syntax
- Static typing with low-level types (int, float, bool, pointers, arrays)
- Manual memory management (coming soon)
- Functions, control flow, and basic I/O
- Designed for performance and simplicity

---

## Hello World

```tango
print("Hello, world!");
```

## Example: Function and Variables

```tango
function sum(a: int, b: int): int {
  return a + b;
}

let result: int = sum(2, 3);
print("Result: " + result);
```

---

## Compiling locally

Install dependencies:

```bash
bun install
```

Compile into an executable:

```bash
bun run build
```

---

## Running a Tango file (in Windows, file extension may vary)

```bash
./tango-compiler.exe run examples/hello_world.tango
```

---

## Docs

The documentation can be found in the “docs” directory, where it explains how to create different code structures.

---

## Project Status

Tango is in early development (alpha). Expect breaking changes and missing features.  
Check the [ROADMAP.md](./ROADMAP.md) for planned features and progress.

---

## Versioning

Tango uses its own way of handling versions. As a base, Semver (MAJOR.MINOR.PATCH) is used, but a build number is added at the end. For more information, visit [VERSIONING.md](./VERSIONING.md)

---

## Contributing

Pull requests, issues and suggestions are welcome!  
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## Authors

- [@opticalsecurity](https://www.github.com/opticalsecurity)

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Bun

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
