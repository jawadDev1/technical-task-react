# Technical Task React

The project includes authentication features such as login, signup, and forgot password flows, along with an article listing section. State management is handled using Redux to manage authentication state and article data efficiently.

![Login Page](assets/login.png)

## Architecture Overview

```
src/
├── store/
│   ├── index.ts
│   ├── rootReducer.ts
│   └── hooks.ts
│
├── features/
│   ├── auth/
│   │   ├── authSlice.ts
│   │   ├── authThunks.ts
│   │   └── authSelectors.ts
│   │
│   └── articles/
│       ├── articlesSlice.ts
│       ├── articlesThunks.ts
│       └── articlesSelectors.ts
│
├── ui/
│   ├── common/
│   ├── auth/
│   └── blog/
│
├── services/
│   ├── api/
│   │   ├── apiClient.ts
│   │   └── endpoints.ts
│   ├── authService.ts
│   └── articlesService.ts
│
├── lib/
│   ├── utils.ts
│
├── types/
│   └── api.types.ts
│
├── pages/
│
├── routes/
│   ├── AppRoutes.tsx
│   └── routes.config.ts
│
└── App.tsx
```

## Tech Stack

- **Language:** TypeScript
- **Library:** React (v19.2.0)
- **Styling:** Tailwind CSS 4
- **Forms:** React Hook Form + Zod
- **Linting:** ESLint + Prettier
- **Git Hooks:** Husky + Commitlint

## Development Setup

### Prerequisites

- **Node.js:** v22.20.0
- **Package Manager:** pnpm 9+

### Initial Setup

1. **Clone the repository**

```bash
git clone https://github.com/jawadDev1/technical-task-react.git
cd technical-task-react
```

2. **Install packages**

```bash
pnpm install
```

3. **Configure environment variables:**

```bash
cp .env.example .env.local
```

Edit .env.local and set your API URL:

```bash
VITE_APP_API_URL=https://your-api-url.com/
```

Note: make sure / is present at end of url.

4. **Start the development server::**

```bash
pnpm dev
```

## ESLint Restrictions

### Enforced Rules

1. **Import sorting** - auto-sorted by eslint-plugin-simple-import-sort
2. **Unicorn rules** - prevent abbreviations, enforce better practices

### Auto-fix Imports

```bash
pnpm lint:fix
```

## Development Workflow

### Start Development Server

```bash
pnpm dev
```

### Skip build check if required

```bash
SKIP_BUILD=1 git commit -m "feat: your message"
```

### Linting & Formatting

```bash
pnpm lint              # Check for errors
pnpm lint:fix          # Auto-fix errors
pnpm format            # Format with Prettier
pnpm format:check      # Check formatting
```

## Git Commit Conventions

This project uses **Conventional Commits** with Husky and Commitlint.

### Commit Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes
- **revert**: Revert a previous commit

### Examples

```bash
git commit -m "feat: add product filtering feature"
git commit -m "fix: resolve ProductCard image loading issue"
git commit -m "refactor: restructure ui layer components"
git commit -m "docs: update README with architecture guidelines"
```

### Pre-commit Hooks

- **Husky** runs automatically before commits
- Lints staged files
- Validates commit message format
- Rejects commits that don't follow conventions
