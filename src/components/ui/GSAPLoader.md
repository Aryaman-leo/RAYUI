# GSAP Loader Component

A universal, customizable loading animation component powered by GSAP (GreenSock Animation Platform) for React applications.

## Features

- 🎨 **7 Animation Types**: Spinner, Dots, Pulse, Wave, Gear, Ripple, and Bounce
- 📏 **4 Size Variants**: Small, Medium, Large, and Extra Large
- 🎨 **Customizable Colors**: Any CSS color value
- ⏱️ **Adjustable Duration**: Control animation speed
- 📝 **Optional Text**: Display custom loading messages
- ♿ **Accessibility**: Supports reduced motion preferences
- 🌙 **Dark Mode**: Automatic dark mode support
- 📱 **Responsive**: Works on all screen sizes

## Installation

The component requires GSAP to be installed:

```bash
npm install gsap
```

## Basic Usage

```jsx
import GSAPLoader from './components/ui/GSAPLoader';

// Simple spinner
<GSAPLoader />

// With custom text
<GSAPLoader text="Loading data..." />

// Different animation type
<GSAPLoader type="dots" text="Processing..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `'spinner'` | Animation type: `spinner`, `dots`, `pulse`, `wave`, `gear`, `ripple`, `bounce` |
| `size` | string | `'medium'` | Size variant: `small`, `medium`, `large`, `xlarge` |
| `color` | string | `'#4318FF'` | Color of the loader animation |
| `text` | string | `''` | Text to display below the loader |
| `duration` | number | `2` | Animation duration in seconds |
| `showText` | boolean | `true` | Whether to show the text below the loader |
| `className` | string | `''` | Additional CSS classes |
| `onComplete` | function | `null` | Callback function when animation completes |

## Animation Types

### 1. Spinner
A classic rotating circle animation.

```jsx
<GSAPLoader type="spinner" text="Loading..." />
```

### 2. Dots
Three dots that bounce in sequence.

```jsx
<GSAPLoader type="dots" text="Processing..." />
```

### 3. Pulse
A pulsing circle that scales and fades.

```jsx
<GSAPLoader type="pulse" text="Saving..." />
```

### 4. Wave
Five vertical bars that animate in a wave pattern.

```jsx
<GSAPLoader type="wave" text="Analyzing..." />
```

### 5. Gear
A rotating gear icon.

```jsx
<GSAPLoader type="gear" text="Working..." />
```

### 6. Ripple
Concentric circles that expand outward.

```jsx
<GSAPLoader type="ripple" text="Connecting..." />
```

### 7. Bounce
A ball that bounces up and down.

```jsx
<GSAPLoader type="bounce" text="Loading..." />
```

## Size Variants

```jsx
// Small - 60x60px
<GSAPLoader size="small" />

// Medium - 80x80px (default)
<GSAPLoader size="medium" />

// Large - 120x120px
<GSAPLoader size="large" />

// Extra Large - 160x160px
<GSAPLoader size="xlarge" />
```

## Color Customization

```jsx
// Using hex colors
<GSAPLoader color="#10B981" text="Success!" />

// Using CSS color names
<GSAPLoader color="red" text="Error!" />

// Using RGB values
<GSAPLoader color="rgb(59, 130, 246)" text="Info" />

// Using HSL values
<GSAPLoader color="hsl(280, 100%, 50%)" text="Purple" />
```

## Duration Control

```jsx
// Fast animation (0.5 seconds)
<GSAPLoader duration={0.5} text="Quick load..." />

// Slow animation (5 seconds)
<GSAPLoader duration={5} text="Please wait..." />

// Default (2 seconds)
<GSAPLoader duration={2} text="Loading..." />
```

## Advanced Examples

### Custom Styling
```jsx
<GSAPLoader
  type="ripple"
  size="large"
  color="#F59E0B"
  text="Custom styled loader"
  className="my-custom-loader"
  duration={1.5}
/>
```

### Conditional Loading
```jsx
const [isLoading, setIsLoading] = useState(false);

return (
  <div>
    {isLoading ? (
      <GSAPLoader
        type="dots"
        text="Fetching data..."
        color="#10B981"
      />
    ) : (
      <div>Content loaded!</div>
    )}
  </div>
);
```

### Multiple Loaders
```jsx
<div className="loading-section">
  <GSAPLoader type="spinner" size="small" text="Loading users..." />
  <GSAPLoader type="wave" size="medium" text="Processing data..." />
  <GSAPLoader type="pulse" size="large" text="Saving changes..." />
</div>
```

## Integration Examples

### In a Dashboard
```jsx
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <GSAPLoader
          type="gear"
          size="large"
          color="#4318FF"
          text="Loading dashboard..."
        />
      </div>
    );
  }

  return <DashboardContent data={data} />;
};
```

### In a Form
```jsx
const Form = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await submitForm(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={submitting}>
        {submitting ? (
          <GSAPLoader type="dots" size="small" showText={false} />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};
```

### In a Modal
```jsx
const Modal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {loading ? (
        <div className="modal-loading">
          <GSAPLoader
            type="ripple"
            size="medium"
            text="Processing your request..."
          />
        </div>
      ) : (
        <ModalContent />
      )}
    </Modal>
  );
};
```

## Accessibility

The component automatically respects user preferences:

- **Reduced Motion**: Animations are disabled when `prefers-reduced-motion: reduce` is set
- **High Contrast**: Enhanced borders when `prefers-contrast: high` is set
- **Dark Mode**: Automatic color adjustments for dark mode

## Performance

- Uses GSAP for smooth, hardware-accelerated animations
- Automatic cleanup of animations on component unmount
- Minimal re-renders with proper dependency management
- Optimized for 60fps performance

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- GSAP handles cross-browser animation compatibility
- Graceful degradation for older browsers

## Troubleshooting

### Animation not working
1. Ensure GSAP is properly installed: `npm install gsap`
2. Check that the component is mounted in the DOM
3. Verify that the `type` prop is one of the supported values

### Performance issues
1. Reduce the `duration` prop for faster animations
2. Use smaller sizes for better performance on mobile
3. Consider using `showText={false}` if text is not needed

### Styling conflicts
1. Use the `className` prop for custom styling
2. Check for conflicting CSS rules
3. Ensure proper CSS specificity

## Contributing

To add new animation types:

1. Add the animation function in the component
2. Add the corresponding CSS styles
3. Update the `renderLoader` function
4. Add the new type to the demo component
5. Update this documentation

## License

This component is part of the project and follows the same license terms. 