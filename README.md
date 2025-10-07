# @ngmd/git-flow

🚀 **Comprehensive solution for Git Flow conventions automation**

The `@ngmd/git-flow` library provides ready-to-use configurations and automation for following Git Flow conventions in your projects. Includes commit message validation, branch name checking, and automatic git hooks setup.

## ✨ Features

- 🔍 **Commit message validation** with detailed error messages
- 🌿 **Branch name validation** according to Git Flow conventions
- 🎣 **Automatic git hooks setup** via Husky
- ⚡ **Zero-config setup** - works out of the box
- 📦 **Modular architecture** - use only the components you need

## 📋 Supported conventions

### Commit types

- `feat` - new functionality
- `fix` - bug fixes
- `hotfix` - critical fixes
- `test` - adding tests
- `chore` - code maintenance (dependency updates, configuration, etc.)

### Scopes

- `ci` - continuous integration
- `docs` - documentation
- `app` - main application
- `lib` - libraries and utilities
- `global` - global changes for all parts of the repository

### Branch format

- `feature/feature-name` - new functionality
- `feature/{{projectcode}}-{{tasknumber}}` - new functionality.

  - Example: `feature/lp-737`. Note that only `lower-case` syntax is supported. To rename branch `feature/LP-737` to lowercase use command `git branch -m -f feature/lp-737`

- `hotfix/hotfix-name` - critical fixes
- `release/release-version` - release preparation
- `bugfix/bug-name` - bug fixes
- `support/support-name` - version support
- `develop` - main development branch
- `main` / `master` - main project branch

## 🚀 Quick start

### 1. Installation

```bash
npm install @ngmd/git-flow --save-dev
```

### 2. CLI initialization

> ⚡ **Quick setup with one command**

For automatic project setup, run the command from the root directory:

```bash
npx ngmd-git-flow
```

**What the command does:**

- ✅ Creates necessary configuration files
- ✅ Sets up git hooks automatically

**Requirements:**

- Command should be run from project root (where `package.json` is located)
- `.husky` directory should not exist

**Usage example:**

```bash
cd your-project
npx ngmd-git-flow
# ✅ Project is configured and ready to use!
```

### 3. Manual setup (alternative method)

#### 3.1. Git hooks initialization

```bash
npm run prepare
```

#### 3.2. Creating configuration files

Create `commitlint.config.js` file in your project root:

```javascript
const { useCommitlintConfig } = require("@ngmd/git-flow/commitlint");

module.exports = useCommitlintConfig();
```

Create `validate-branch-name.config.js` file:

```javascript
const {
  useValidateBranchNameConfig,
} = require("@ngmd/git-flow/validate-branch-name");

module.exports = useValidateBranchNameConfig();
```

#### 3.3. Git hooks setup

Create the following files in your project's `.husky/*` directory:

**File `.husky/pre-commit`** - for branch name validation before commit:

```bash
#!/usr/bin/env node
npx --no -- validate-branch-name
```

**File `.husky/commit-msg`** - for commit message format validation:

```bash
#!/usr/bin/env node
npx --no -- commitlint --edit
```

## 📚 Detailed guide

### Project structure after setup

```
your-project/
├── commitlint.config.js          # commit message configuration
├── validate-branch-name.config.js # branch validation configuration
└── .husky/                       # git hooks (created automatically)
    ├── pre-commit                # branch name check before commit
    └── commit-msg                # commit message validation
```

### Examples of correct commit messages

```bash
# ✅ Correct formats
feat(app): add user authentication
fix(docs): correct installation instructions
hotfix(ci): resolve deployment pipeline issue
test(lib): add unit tests for validation
chore(app): update dependencies to latest versions
```

### Examples of correct branch names

```bash
# ✅ Correct formats
feature/user-authentication
feature/shopping-cart
hotfix/security-vulnerability
hotfix/login-bug
release/v1.2.0
release/v2.0.0-beta
bugfix/header-styling
develop
main
```

### Error examples

```bash
# ❌ Incorrect commit messages
Add new feature                    # no type and scope
feat add feature                   # no colon and scope
FEAT(app): Add Feature             # wrong case
feat(invalid): add feature         # invalid scope

# ❌ Incorrect branch names
feature_user_auth                  # using underscores
Feature/UserAuth                   # wrong case
add-new-feature                    # no type prefix
```

### Testing commands

```bash
# Test commit message
echo "feat(app): test message" | npx commitlint

# Test branch validation
npx validate-branch-name

# Manual git hooks execution
.husky/pre-commit
.husky/commit-msg "feat(app): test message"
```
