# RAYUI Core - Usage Guide

Complete guide for using `@sagar_aryaman/rayui-core` in your React project.

## 📦 Installation

```bash
npm install @sagar_aryaman/rayui-core
```

**Requirements:**
- React ^18 or ^19
- React DOM ^18 or ^19

## 🚀 Quick Start

### Step 1: Import the CSS

**⚠️ IMPORTANT: You MUST import the CSS file for styles to work!**

Add this import at the **top of your main entry file** (e.g., `main.tsx`, `index.tsx`, or `App.tsx`):

```tsx
// In your main.tsx or App.tsx
import '@sagar_aryaman/rayui-core/dist/index.css'
```

**Why?** The CSS is bundled separately and needs to be imported manually. This is a common pattern for npm packages that include styles.

### Step 2: Import and Use Components

```tsx
import { Button } from '@sagar_aryaman/rayui-core'

function MyApp() {
  return (
    <div>
      <Button variant="primary" size="md">
        Click Me
      </Button>
      <Button disabled>Disabled Button</Button>
    </div>
  )
}
```

## 📝 Complete Example

Here's a complete example for a new React app:

```tsx
// src/main.tsx (or index.tsx)
import React from 'react'
import ReactDOM from 'react-dom/client'
// ⚠️ Import CSS FIRST
import '@sagar_aryaman/rayui-core/dist/index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

```tsx
// src/App.tsx
import { Button } from '@sagar_aryaman/rayui-core'

function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>My App</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" size="md">
          Primary Button
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </main>
  )
}

export default App
```

## 🎨 Available Components

### Button

```tsx
import { Button } from '@sagar_aryaman/rayui-core'

// Basic usage
<Button>Click me</Button>

// With props
<Button variant="primary" size="md">
  Primary Button
</Button>

// Disabled state
<Button disabled>Can't click</Button>
```

**Button Props:**
- `variant?: "primary"` - Button style variant
- `size?: "md"` - Button size
- `disabled?: boolean` - Disabled state
- All standard HTML button attributes are supported

## 🔧 Build Tool Configuration

### Vite

No special configuration needed! Just import the CSS:

```tsx
import '@sagar_aryaman/rayui-core/dist/index.css'
```

### Create React App (CRA)

Works out of the box. Import CSS in your entry file:

```tsx
import '@sagar_aryaman/rayui-core/dist/index.css'
```

### Next.js

**Option 1: Import in `_app.tsx` or `_app.js`:**

```tsx
// pages/_app.tsx
import '@sagar_aryaman/rayui-core/dist/index.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

**Option 2: Import in `app/layout.tsx` (App Router):**

```tsx
// app/layout.tsx
import '@sagar_aryaman/rayui-core/dist/index.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Webpack

Should work automatically. If you get CSS import errors, ensure your webpack config handles CSS:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

## 🐛 Troubleshooting

### Styles Not Showing?

**Problem:** Components render but have no styling.

**Solution:** Make sure you've imported the CSS file:

```tsx
import '@sagar_aryaman/rayui-core/dist/index.css'
```

**Check:**
1. ✅ CSS import is at the top of your entry file
2. ✅ Import path is correct: `@sagar_aryaman/rayui-core/dist/index.css`
3. ✅ Your build tool processes CSS files
4. ✅ No CSS import errors in console

### TypeScript Errors?

**Problem:** TypeScript can't find types.

**Solution:** The package includes TypeScript definitions. Make sure:
1. You're using TypeScript 4.5+
2. Your `tsconfig.json` has `"moduleResolution": "bundler"` or `"node"`

### Build Errors?

**Problem:** Module not found or import errors.

**Solutions:**
1. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check React version:**
   ```bash
   npm list react react-dom
   ```
   Should be React 18+ or 19+

3. **Verify package installation:**
   ```bash
   npm list @sagar_aryaman/rayui-core
   ```

## 📚 TypeScript Support

Full TypeScript support is included. Import types if needed:

```tsx
import { Button, type ButtonProps } from '@sagar_aryaman/rayui-core'

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## 🎯 Best Practices

1. **Import CSS once** in your root entry file, not in every component
2. **Import components** where you use them
3. **Use TypeScript** for better type safety and autocomplete
4. **Check console** for any CSS import warnings

## 📦 Package Structure

```
@sagar_aryaman/rayui-core/
├── dist/
│   ├── index.js          # ESM bundle
│   ├── index.cjs         # CommonJS bundle
│   ├── index.d.ts        # TypeScript definitions
│   └── index.css         # ⚠️ Styles (must import!)
└── package.json
```

## 🔗 Need Help?

- Check that CSS is imported: `import '@sagar_aryaman/rayui-core/dist/index.css'`
- Verify React version matches peer dependencies
- Check browser console for errors
- Ensure your build tool processes CSS files

---

**Remember:** Always import the CSS file for styles to work! 🎨
