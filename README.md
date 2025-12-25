# RAY UI - Component Library

A modern, customizable React component library with real-time theme customization and live preview. Built with React, Tailwind CSS, and Vite.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)

## 🚀 Features

### Component Showcase
- **MDN-inspired Documentation**: Clean, professional documentation layout similar to MDN Web Docs
- **Sidebar Navigation**: Easy navigation through component categories
- **Live Preview**: See components in action with real-time updates
- **Code Examples**: Copy-ready code snippets for each component
- **Props Documentation**: Complete API reference with PropsTable

### Advanced Customization
- **Real-time Theme Customization**: Change colors, spacing, typography, and effects instantly
- **Per-Component Customization**: Each component has its own customization panel
- **Class-based Styling**: All customizations generate proper CSS classes (no inline styles)
- **Tabbed Interface**: Organized customization controls (Appearance, Colors, Spacing, Typography, Effects)
- **Preset Options**: Quick selection for border radius, colors, shadows, and transitions
- **Variant Filtering**: View code for specific variants (Primary, Secondary, Outline, etc.)

### Components Available

#### Form Components
- ✅ **Button** - Multiple variants (primary, secondary, outline, ghost, destructive), sizes, and states
- ✅ **Input** - Text inputs with validation states, sizes, and variants
- ✅ **Textarea** - Multi-line text input
- ✅ **Select** - Native and enhanced select components (SingleSelect, MultiSelect)
- ✅ **Checkbox** - Custom checkbox with label support
- ✅ **Radio** - Radio button groups
- ✅ **Slider** - Range slider with labels
- ✅ **Phone Input** - Formatted phone number input

#### Feedback Components
- ✅ **Alert** - Success, error, warning, and info alerts
- ✅ **Badge** - Status badges and labels
- ✅ **Toast** - Notification toasts
- ✅ **Spinner** - Loading spinners
- ✅ **Progress** - Progress bars with variants

#### Overlay Components
- ✅ **Modal** - Dialog modals with header, content, and actions
- ✅ **Tooltip** - Contextual tooltips with multiple positions

#### Layout Components
- ✅ **Card** - Content containers with variants
- ✅ **Divider** - Visual separators

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd RAYUI

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The development server will start at `http://localhost:5173` (or the next available port).

## 📖 Usage

### Basic Component Import

```jsx
import { Button, Input, Card } from '@rayui/components';
import '@rayui/components/dist/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
      <Input placeholder="Enter text..." />
      <Card variant="default">
        <h3>Card Title</h3>
        <p>Card content</p>
      </Card>
    </div>
  );
}
```

### Customization

Each component supports real-time customization through the ComponentCustomizer:

```jsx
import ComponentCustomizer from './components/ComponentCustomizer';

function MyComponent() {
  const [theme, setTheme] = useState({});
  
  return (
    <>
      <ComponentCustomizer 
        componentType="button" 
        onThemeChange={(theme) => setTheme(theme)} 
      />
      <Button 
        variant="primary"
        className={`${theme.borderRadius} ${theme.primary}`}
      >
        Customized Button
      </Button>
    </>
  );
}
```

### Customization Options

#### Appearance
- Border Radius (0px to Full)
- Border Width
- Border Style (solid, dashed, dotted, double)

#### Colors
- Primary Color (with preset swatches)
- Hover Color (auto-adjusted or custom)
- Active Color (auto-adjusted or custom)
- Border Color
- Focus Color
- Error/Success/Warning/Info Colors

#### Spacing
- Padding X/Y
- Gap (for buttons)

#### Typography
- Font Size
- Font Weight
- Line Height

#### Effects
- Shadow (with presets)
- Hover Shadow
- Transitions (speed control)
- Scale Transforms (for interactive elements)

## 🎨 Component Customization

### Button Customization

```jsx
// Customized button with classes
<Button
  variant="primary"
  className="rounded-2xl btn-primary-custom"
>
  Primary
</Button>

// Outline variant
<Button
  variant="outline"
  className="rounded-2xl btn-outline-custom"
>
  Outline
</Button>
```

### Input Customization

```jsx
<Input
  placeholder="Enter text..."
  inputClassName="input-custom rounded-lg focus:border-blue-600"
/>
```

### Card Customization

```jsx
<Card
  variant="default"
  className="card-custom rounded-lg shadow-md"
>
  Content
</Card>
```

## 📚 Component Documentation

Visit the showcase page to see:
- Live component demos
- Code examples for each variant
- Props documentation
- Customization options
- Real-time preview updates

## 🏗️ Project Structure

```
RAYUI/
├── src/
│   ├── components/
│   │   ├── ui/              # UI components
│   │   ├── ComponentCustomizer.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── ComponentDemo.jsx
│   │   └── PropsTable.jsx
│   ├── pages/
│   │   └── Showcase.jsx     # Main documentation page
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Features

### Real-time Customization
- All changes apply instantly to preview components
- Code examples update automatically
- CSS classes are generated dynamically
- No page refresh required

### Class-based Styling
- All customizations use CSS classes (not inline styles)
- Tailwind-compatible class names
- Custom classes for specific colors
- Production-ready code output

### Variant Filtering
- Filter code examples by variant
- View only the code you need
- Clean, focused documentation

## 🚧 Development Status

**⚠️ This project is still under active development**

### Completed ✅
- Core component library (20+ components)
- Component showcase with MDN-style layout
- Real-time theme customization system
- Class-based styling generation
- Code examples with syntax highlighting
- Props documentation
- Variant filtering
- Advanced customization options

### In Progress 🚧
- Additional component variants
- More customization options
- Performance optimizations
- Accessibility improvements
- Unit tests
- Storybook integration
- NPM package publication

### Planned 📋
- Dark mode support
- Theme presets
- Export/import themes
- Component playground
- Animation library
- More component examples
- TypeScript definitions

## 🤝 Contributing

Contributions are welcome! This project is in active development, and we're open to:
- Bug reports
- Feature requests
- Pull requests
- Documentation improvements
- Component additions

## 📝 License

[Add your license here]

## 🙏 Acknowledgments

- Inspired by MDN Web Docs design
- Built with React, Tailwind CSS, and Vite
- Component patterns inspired by modern UI libraries

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Note**: This project is currently in development. Some features may be incomplete or subject to change.
