---
description: Repository Information Overview
alwaysApply: true
---

# RAYUI Project Information

## Summary
RAYUI is a modern React web application built with TypeScript, Vite, and Tailwind CSS. It provides a minimal setup for rapid development with hot module replacement (HMR) and comprehensive linting. The project follows best practices with strict TypeScript compilation and ESLint rules for code quality.

## Structure
- **src/** - Application source code
  - **app/** - Main application component and styling
  - **assets/** - Static assets and images
  - **components/** - Reusable React components
  - **config/** - Application configuration files
  - **features/** - Feature-specific modules
  - **hooks/** - Custom React hooks
  - **services/** - Business logic and API services
  - **store/** - State management
  - **styles/** - Global styles and design tokens
  - **utils/** - Utility functions and helpers
  - **main.tsx** - Application entry point
- **public/** - Static public assets
- **index.html** - HTML entry point

## Language & Runtime
**Language**: TypeScript  
**Version**: ~5.9.3  
**Target**: ES2022 (app), ES2023 (build tools)  
**Framework**: React 19.2.0  
**Build System**: Vite (rolldown-vite 7.2.5)  
**Package Manager**: npm

## Dependencies

**Main Dependencies**:
- `react` ^19.2.0 - UI framework
- `react-dom` ^19.2.0 - React DOM bindings
- `tailwindcss` ^4.1.18 - Utility-first CSS framework
- `@tailwindcss/vite` ^4.1.18 - Tailwind CSS Vite plugin

**Development Dependencies**:
- `typescript` ~5.9.3 - TypeScript compiler
- `@vitejs/plugin-react-swc` ^4.2.2 - SWC-based React Fast Refresh
- `vite` (rolldown-vite 7.2.5) - Build tool and dev server
- `eslint` ^9.39.1 - Code linting
- `typescript-eslint` ^8.46.4 - TypeScript ESLint integration
- `@eslint/js` ^9.39.1 - ESLint JavaScript configuration
- `eslint-plugin-react-hooks` ^7.0.1 - React Hooks linting rules
- `eslint-plugin-react-refresh` ^0.4.24 - React Fast Refresh rules
- `@types/react` ^19.2.5 - React type definitions
- `@types/react-dom` ^19.2.3 - React DOM type definitions
- `@types/node` ^24.10.1 - Node.js type definitions
- `globals` ^16.5.0 - Global variable definitions

## Build & Installation

**Install dependencies**:
```bash
npm install
```

**Development server** (with HMR):
```bash
npm run dev
```

**Build for production**:
```bash
npm run build
```

**Preview production build**:
```bash
npm run preview
```

**Code linting**:
```bash
npm run lint
```

## Entry Points
- **index.html** - HTML document entry point
- **src/main.tsx** - TypeScript application entry point
- **src/app/App.tsx** - Root React component

## Configuration Files
- **vite.config.ts** - Vite build configuration with React SWC and Tailwind CSS plugins
- **tsconfig.json** - TypeScript configuration with references to app and node configs
- **tsconfig.app.json** - Application-specific TypeScript settings (strict mode enabled)
- **tsconfig.node.json** - Build tools TypeScript settings
- **eslint.config.js** - ESLint rules for code quality (JavaScript, TypeScript, React Hooks, React Refresh)
- **index.html** - HTML template with root div and main.tsx script

## Development Features
- **Hot Module Replacement (HMR)** - Fast development feedback
- **Strict TypeScript** - Type safety with all strictness options enabled
- **React SWC** - Fast JavaScript/TypeScript compiler via SWC
- **Tailwind CSS** - Utility-first CSS framework with Vite integration
- **ESLint** - Comprehensive linting with React hooks and refresh support
