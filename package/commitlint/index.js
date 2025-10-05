// TEST string: echo "feat(ci): test message" | npx commitlint

const AVAILABLE_TYPES = [
  "feat", // new functionality
  "fix", // bug fix
  "hotfix", // critical bug fix
  "test", // adding missing tests
  "chore", // code maintenance (updating dependencies, settings, etc.)
];

const AVAILABLE_SCOPES = [
  "ci", // continuous integration
  "docs", // documentation
  "app", // main application
  "lib", // libraries and utilities
];

const CORRECT_COMMIT_MSG =
  `📖 Examples of correct commits:\n` +
  `  • feat(${AVAILABLE_SCOPES[0]}): add new feature\n` +
  `  • fix(${AVAILABLE_SCOPES[1]}): resolve bug\n` +
  `  • chore(${AVAILABLE_SCOPES[2]}): update dependencies`;

function correctMessage(availableArray, invalidMessage) {
  const availableString = availableArray.map((t) => `  • ${t}`).join("\n");

  return (
    `\n\n❌ Invalid commit message\n\n` +
    `\x1b[31m✖\x1b[0m   ${invalidMessage}\n\n` +
    `✅ Available values:\n` +
    `${availableString}\n\n` +
    `${CORRECT_COMMIT_MSG}\n\n`
  );
}

export function useCommitlintConfig() {
  return {
    helpUrl:
      "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
    plugins: [
      {
        rules: {
          "custom-scope-enum": (parsed, when, availableScopes) => {
            const { scope } = parsed;

            if (!scope) {
              return [
                false,
                correctMessage(availableScopes, '"scope" is required'),
              ];
            }

            if (!availableScopes.includes(scope)) {
              return [
                false,
                correctMessage(availableScopes, `Invalid scope: "${scope}"`),
              ];
            }

            return [true];
          },

          "custom-type-enum": (parsed, when, availableTypes) => {
            const { type } = parsed;

            if (!type) {
              return [
                false,
                correctMessage(availableTypes, `"type" is required: "${type}"`),
              ];
            }

            if (!availableTypes.includes(type)) {
              return [
                false,
                correctMessage(
                  availableTypes,
                  `Invalid commit type: "${type}"`
                ),
              ];
            }

            return [true];
          },
        },
      },
    ],
    rules: {
      "type-enum": [0],
      "scope-enum": [0],
      "type-case": [2, "always", "lower-case"],
      "scope-case": [2, "always", "lower-case"],
      "subject-case": [
        2,
        "never",
        ["sentence-case", "start-case", "pascal-case", "upper-case"],
      ],
      "custom-scope-enum": [2, "always", AVAILABLE_SCOPES],
      "custom-type-enum": [2, "always", AVAILABLE_TYPES],
      "header-min-length": [2, "always", 10],
      "header-max-length": [2, "always", 100],
      "header-case": [2, "always", "lower-case"],
      "subject-empty": [2, "never"],
      "subject-full-stop": [2, "never", "."],
      "type-empty": [2, "never"],
      "type-case": [2, "always", "lower-case"],
      "scope-case": [2, "always", "lower-case"],
      "body-max-line-length": [2, "always", 100],
      "footer-max-line-length": [2, "always", 100],
    },
  };
}
