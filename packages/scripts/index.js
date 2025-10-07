#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { writeFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const PROJECT_ROOT = process.cwd();

function isRoot() {
  const hasPackageJson = existsSync(join(PROJECT_ROOT, "package.json"));

  if (!hasPackageJson) {
    throw Error(
      `The file package.json doesn't exist. You must run the script from the root directory. \n Documentation: https://github.com/ngmd-repo/ngmd-git-flow`
    );
  }
}

function isInitializedHusky() {
  const hasHuskyDirectory = existsSync(join(PROJECT_ROOT, ".husky"));

  if (hasHuskyDirectory) {
    throw Error(
      `The .husky has been initialized. You need to initialize @ngmd/git-flow manually.\n Documentation: https://github.com/ngmd-repo/ngmd-git-flow`
    );
  }
}

function validateRootPath() {
  isRoot();
  isInitializedHusky();
}

function initHusky() {
  const HUSKY_ROOT = join(PROJECT_ROOT, ".husky");

  execSync("npx --no -- husky init");
  writeFileSync(
    join(HUSKY_ROOT, "pre-commit"),
    "npx --no -- validate-branch-name",
    { encoding: "utf-8" }
  );
  writeFileSync(
    join(HUSKY_ROOT, "commit-msg"),
    "npx --no -- commitlint --edit ",
    { encoding: "utf-8" }
  );
}

function createBranchNameConfigTemplate() {
  return (
    `const { useValidateBranchNameConfig } = require('@ngmd/git-flow/validate-branch-name');` +
    `\n\nmodule.exports = useValidateBranchNameConfig();`
  );
}

function createValidateBranchConfigFile() {
  const PATH_TO_FILE = join(PROJECT_ROOT, "validate-branch-name.config.js");

  writeFileSync(PATH_TO_FILE, createBranchNameConfigTemplate(), {
    encoding: "utf-8",
  });
}

function commitlintConfigFileTemplate() {
  return (
    `const { useCommitlintConfig } = require("@ngmd/git-flow/commitlint");` +
    `\n\nmodule.exports = useCommitlintConfig();`
  );
}

function createCommitlintConfigFile() {
  const PATH_TO_FILE = join(PROJECT_ROOT, "commitlint.config.js");

  writeFileSync(PATH_TO_FILE, commitlintConfigFileTemplate(), {
    encoding: "utf-8",
  });
}

function run() {
  validateRootPath();
  initHusky();
  createValidateBranchConfigFile();
  createCommitlintConfigFile();

  console.log("Git flow has been initialized");
}

run();
