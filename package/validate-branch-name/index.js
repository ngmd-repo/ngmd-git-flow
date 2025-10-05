export function useValidateBranchNameConfig() {
  return {
    // Pattern for validating branch names according to git flow conventions
    pattern:
      "^(feature|hotfix|release|bugfix|support)/[a-z0-9.-]+$|^(develop|main|master)$",

    // Detailed error message
    errorMsg: `
🚫 ERROR: Branch name does not follow git flow conventions!

📋 ALLOWED FORMATS:
  ✅ feature/feature-name       - new functionality
  ✅ hotfix/hotfix-name         - critical fixes
  ✅ release/release-version    - release preparation
  ✅ bugfix/bug-name           - bug fixes
  ✅ support/support-name      - version support
  ✅ develop                   - main development branch
  ✅ main | master             - main project branch

📖 EXAMPLES OF CORRECT NAMES:
  • feature/user-authentication
  • feature/shopping-cart
  • feature/payment-integration
  • hotfix/security-vulnerability
  • hotfix/login-bug
  • release/v1.2.0
  • release/v2.0.0-beta
  • bugfix/header-styling
  • bugfix/api-timeout
  • support/legacy-browser
  • develop
  • main

🔧 NAMING RULES:
  • Use only lowercase letters
  • Separate words with hyphens (-)
  • Numbers and dots are allowed
  • DO NOT use spaces or special characters
  • Format: type/description-with-hyphens

💡 HOW TO FIX:
  Rename current branch with command:
  git branch -m new-branch-name
  
  Or create a new branch:
  git checkout -b feature/my-new-feature
`,
  };
}
