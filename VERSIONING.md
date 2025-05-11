# Versioning

Tango uses a custom versioning scheme based on Semver, with an extra build number.

## Format

`MAJOR.MINOR.PATCH.BUILD`.

- MAJOR\*\*: Incompatible changes (breaking changes)
- MINOR\*\*: New, but compatible, features
- PATCH\*\*: Bugfixes and minor enhancements
- BUILD\*\*: Incremental build number (automated)

## Example

`1.2.0.15`
(version 1, minor 2, patch 0, build 15)

## Why so?

- It is easy to understand for devs.
- Allows to track internal builds and public releases.
- Compatible with CI/CD tools.
