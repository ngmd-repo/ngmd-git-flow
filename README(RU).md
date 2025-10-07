# @ngmd/git-flow

🚀 **Комплексное решение для автоматизации Git Flow конвенций**

Библиотека `@ngmd/git-flow` предоставляет готовые конфигурации и автоматизацию для соблюдения Git Flow конвенций в ваших проектах. Включает в себя валидацию commit сообщений, проверку имен веток и автоматическую настройку git hooks.

## ✨ Особенности

- 🔍 **Валидация commit сообщений** с детальными error messages
- 🌿 **Проверка имен веток** согласно Git Flow конвенциям
- 🎣 **Автоматическая настройка git hooks** через Husky
- ⚡ **Zero-config setup** - работает из коробки
- 📦 **Модульная архитектура** - используйте только нужные компоненты

## 📋 Поддерживаемые конвенции

### Типы коммитов

- `feat` - новая функциональность
- `fix` - исправление багов
- `hotfix` - критические исправления
- `test` - добавление тестов
- `chore` - обслуживание кода (обновление зависимостей, настройки и т.д.)

### Области (scopes)

- `ci` - continuous integration
- `docs` - документация
- `app` - основное приложение
- `lib` - библиотеки и утилиты
- `global` - глобальные изменения для всех частей репозитория

### Формат веток

- `feature/feature-name` - новая функциональность
- `feature/{{projectcode}}-{{tasknumber}}` - новая функциональность.

  - Пример: `feature/lp-737`. Обратите внимание, что поддерживается только `lower-case` синтаксис. Для переименования ветки `feature/LP-737` к нижнему регистру используете команду `git branch -m -f feature/lp-737`

- `hotfix/hotfix-name` - критические исправления
- `release/release-version` - подготовка релиза
- `bugfix/bug-name` - исправление багов
- `support/support-name` - поддержка версий
- `develop` - основная ветка разработки
- `main` / `master` - основная ветка проекта

## 🚀 Быстрый старт

### 1. Установка

```bash
npm install @ngmd/git-flow --save-dev
```

### 2. Инициализация при помощи cli

> ⚡ **Быстрая настройка в одну команду**

Для автоматической настройки всего проекта выполните команду из корневой директории:

```bash
npx ngmd-git-flow
```

**Что делает команда:**

- ✅ Создает необходимые конфигурационные файлы
- ✅ Настраивает git hooks автоматически

**Требования:**

- Команда должна запускаться из корня проекта (где находится `package.json`)
- Директория `.husky` не должна существовать

**Пример использования:**

```bash
cd your-project
npx ngmd-git-flow
# ✅ Проект настроен и готов к работе!
```

### 3. Ручная настройка (альтернативный способ)

#### 3.1. Инициализация git hooks

```bash
npm run prepare
```

#### 3.2. Создание конфигурационных файлов

Создайте в корне вашего проекта файл `commitlint.config.js`:

```javascript
const { useCommitlintConfig } = require("@ngmd/git-flow/commitlint");

module.exports = useCommitlintConfig();
```

Создайте файл `validate-branch-name.config.js`:

```javascript
const {
  useValidateBranchNameConfig,
} = require("@ngmd/git-flow/validate-branch-name");

module.exports = useValidateBranchNameConfig();
```

#### 3.3. Настройка git hooks

В директории `.husky/*` вашего проекта создайте следующие файлы:

**Файл `.husky/pre-commit`** - для валидации имен веток перед коммитом:

```bash
#!/usr/bin/env node
npx --no -- validate-branch-name
```

**Файл `.husky/commit-msg`** - для проверки формата commit сообщений:

```bash
#!/usr/bin/env node
npx --no -- commitlint --edit
```

## 📚 Подробное руководство

### Структура проекта после настройки

```
your-project/
├── commitlint.config.js          # конфигурация commit сообщений
├── validate-branch-name.config.js # конфигурация валидации веток
└── .husky/                       # git hooks (создается автоматически)
    ├── pre-commit                # проверка имени ветки перед коммитом
    └── commit-msg                # проверка сообщения коммита
```

### Примеры правильных commit сообщений

```bash
# ✅ Правильные форматы
feat(app): add user authentication
fix(docs): correct installation instructions
hotfix(ci): resolve deployment pipeline issue
test(lib): add unit tests for validation
chore(app): update dependencies to latest versions
```

### Примеры правильных имен веток

```bash
# ✅ Правильные форматы
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

### Примеры ошибок

```bash
# ❌ Неправильные commit сообщения
Add new feature                    # нет типа и области
feat add feature                   # нет двоеточия и области
FEAT(app): Add Feature             # неправильный case
feat(invalid): add feature         # недопустимая область

# ❌ Неправильные имена веток
feature_user_auth                  # используются подчеркивания
Feature/UserAuth                   # неправильный case
add-new-feature                    # нет префикса типа
```

### Команды для тестирования

```bash
# Тест commit сообщения
echo "feat(app): test message" | npx commitlint

# Тест валидации ветки
npx validate-branch-name

# Ручной запуск git hooks
.husky/pre-commit
.husky/commit-msg "feat(app): test message"
```
