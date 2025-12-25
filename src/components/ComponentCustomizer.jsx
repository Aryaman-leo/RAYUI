import { useState, useEffect } from 'react';

const ComponentCustomizer = ({ componentType, onThemeChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('appearance');
  
  // Enhanced theme state with more options
  const [theme, setTheme] = useState({
    // Appearance
    borderRadius: '4px',
    borderWidth: '1px',
    borderStyle: 'solid',
    
    // Colors
    primaryColor: '#0069c2',
    primaryHover: '#005a9e',
    primaryActive: '#004d85',
    secondaryColor: '#6b7280',
    borderColor: '#d1d5db',
    focusColor: '#0069c2',
    errorColor: '#dc2626',
    successColor: '#16a34a',
    warningColor: '#d97706',
    infoColor: '#2563eb',
    backgroundColor: '#ffffff',
    textColor: '#1b1b1b',
    textSecondary: '#4e4e4e',
    
    // Spacing
    paddingX: '0.75rem',
    paddingY: '0.5rem',
    gap: '0.5rem',
    
    // Typography
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    
    // Effects
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    shadowHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    
    // Advanced
    opacity: '1',
    scale: '1',
    scaleHover: '1.02',
  });

  const borderRadiusPresets = [
    { label: '0px', value: '0px', class: 'rounded-none' },
    { label: '2px', value: '2px', class: 'rounded-sm' },
    { label: '4px', value: '4px', class: 'rounded' },
    { label: '8px', value: '8px', class: 'rounded-lg' },
    { label: '12px', value: '12px', class: 'rounded-xl' },
    { label: '16px', value: '16px', class: 'rounded-2xl' },
    { label: '24px', value: '24px', class: 'rounded-3xl' },
    { label: 'Full', value: '9999px', class: 'rounded-full' }
  ];

  const colorPresets = [
    { name: 'Blue', value: '#0069c2', class: 'blue' },
    { name: 'Purple', value: '#4318ff', class: 'purple' },
    { name: 'Indigo', value: '#6366f1', class: 'indigo' },
    { name: 'Green', value: '#10b981', class: 'green' },
    { name: 'Red', value: '#ef4444', class: 'red' },
    { name: 'Orange', value: '#f97316', class: 'orange' },
    { name: 'Teal', value: '#14b8a6', class: 'teal' },
    { name: 'Pink', value: '#ec4899', class: 'pink' },
  ];

  const shadowPresets = [
    { label: 'None', value: 'none' },
    { label: 'Sm', value: '0 1px 2px rgba(0, 0, 0, 0.05)' },
    { label: 'Default', value: '0 1px 3px rgba(0, 0, 0, 0.1)' },
    { label: 'Md', value: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    { label: 'Lg', value: '0 10px 15px rgba(0, 0, 0, 0.1)' },
    { label: 'Xl', value: '0 20px 25px rgba(0, 0, 0, 0.1)' },
  ];

  const transitionPresets = [
    { label: 'None', value: 'none' },
    { label: 'Fast', value: 'all 0.1s ease' },
    { label: 'Default', value: 'all 0.2s ease' },
    { label: 'Smooth', value: 'all 0.3s ease' },
    { label: 'Slow', value: 'all 0.5s ease' },
  ];

  const getBorderRadiusClass = (value) => {
    const preset = borderRadiusPresets.find(p => p.value === value);
    return preset ? preset.class : `rounded-[${value}]`;
  };

  const getColorClass = (value, type) => {
    const preset = colorPresets.find(p => p.value === value);
    if (preset && type === 'button') {
      return `btn-primary-${preset.class}`;
    }
    if (preset && type === 'badge') {
      return `badge-primary-${preset.class}`;
    }
    return null;
  };

  const generateClasses = (type, themeToApply) => {
    const borderRadiusClass = getBorderRadiusClass(themeToApply.borderRadius);
    const primaryColorClass = getColorClass(themeToApply.primaryColor, type);
    
    switch (type) {
      case 'button':
        return {
          borderRadius: borderRadiusClass,
          primary: primaryColorClass || `btn-primary-custom`,
          outline: primaryColorClass ? `btn-outline-${primaryColorClass.replace('btn-primary-', '')}` : `btn-outline-custom`,
          primaryColor: themeToApply.primaryColor,
          primaryHover: themeToApply.primaryHover,
          primaryActive: themeToApply.primaryActive,
        };
      case 'input':
      case 'textarea':
        const borderColor = themeToApply.borderColor === '#d1d5db' ? 'border-gray-300' : `border-[${themeToApply.borderColor}]`;
        const focusColor = themeToApply.focusColor === '#0069c2' ? 'focus:border-blue-600 focus:ring-blue-600' : `focus:border-[${themeToApply.focusColor}] focus:ring-[${themeToApply.focusColor}]`;
        return {
          borderRadius: borderRadiusClass,
          border: borderColor,
          focus: `input-custom ${focusColor}`,
          error: `input-error-custom border-[${themeToApply.errorColor}]`
        };
      case 'card':
        const cardBorder = themeToApply.borderColor === '#e5e7eb' ? 'border-gray-200' : `border-[${themeToApply.borderColor}]`;
        const cardBg = themeToApply.backgroundColor === '#ffffff' ? 'bg-white' : `bg-[${themeToApply.backgroundColor}]`;
        const cardShadow = shadowPresets.find(s => s.value === themeToApply.shadow)?.label === 'Default' ? 'shadow-sm' : `shadow-[${themeToApply.shadow}]`;
        return {
          borderRadius: borderRadiusClass,
          border: cardBorder,
          bg: cardBg,
          shadow: cardShadow,
          custom: 'card-custom'
        };
      case 'badge':
        return {
          borderRadius: borderRadiusClass,
          primary: primaryColorClass || `badge-primary-custom`,
          primaryColor: themeToApply.primaryColor
        };
      case 'alert':
        return {
          borderRadius: borderRadiusClass,
          success: `alert-success-custom`,
          error: `alert-error-custom`,
          warning: `alert-warning-custom`,
          info: `alert-info-custom`,
        };
      case 'checkbox':
      case 'radio':
        return {
          borderRadius: borderRadiusClass,
          primary: primaryColorClass || `checkbox-primary-custom`,
          primaryColor: themeToApply.primaryColor
        };
      case 'select':
        const selectBorderColor = themeToApply.borderColor === '#d1d5db' ? 'border-gray-300' : `border-[${themeToApply.borderColor}]`;
        const selectFocusColor = themeToApply.focusColor === '#0069c2' ? 'focus:border-blue-600 focus:ring-blue-600' : `focus:border-[${themeToApply.focusColor}] focus:ring-[${themeToApply.focusColor}]`;
        return {
          borderRadius: borderRadiusClass,
          border: selectBorderColor,
          focus: `select-custom ${selectFocusColor}`,
        };
      default:
        return { borderRadius: borderRadiusClass };
    }
  };

  const applyThemeClasses = (type, themeToApply, classes) => {
    const styleId = `component-theme-${type}`;
    let style = document.getElementById(styleId);
    if (style) {
      style.remove();
    }
    style = document.createElement('style');
    style.id = styleId;
    // Insert at the very end to ensure it overrides ALL default styles
    document.head.appendChild(style);

    let css = '';
    switch (type) {
      case 'button':
        const primaryClass = classes.primary || 'btn-primary-custom';
        const outlineClass = classes.outline || 'btn-outline-custom';
        css = `
          /* Primary button styles - ULTRA HIGH SPECIFICITY to override Button.css */
          button.btn.btn-primary.btn-small.${primaryClass},
          button.btn.btn-primary.btn-medium.${primaryClass},
          button.btn.btn-primary.btn-large.${primaryClass},
          button.btn.btn-primary.${primaryClass},
          button.btn-primary.btn-small.${primaryClass},
          button.btn-primary.btn-medium.${primaryClass},
          button.btn-primary.btn-large.${primaryClass},
          button.btn-primary.${primaryClass},
          .btn.btn-primary.btn-small.${primaryClass},
          .btn.btn-primary.btn-medium.${primaryClass},
          .btn.btn-primary.btn-large.${primaryClass},
          .btn.btn-primary.${primaryClass},
          .btn-primary.btn-small.${primaryClass},
          .btn-primary.btn-medium.${primaryClass},
          .btn-primary.btn-large.${primaryClass},
          .btn-primary.${primaryClass},
          button.${primaryClass}.btn-primary,
          .${primaryClass}.btn-primary,
          button.btn.${primaryClass},
          .btn.${primaryClass},
          button.${primaryClass},
          .${primaryClass} {
            background-color: ${themeToApply.primaryColor} !important;
            border-color: ${themeToApply.primaryColor} !important;
            color: white !important;
            padding: ${themeToApply.paddingY} ${themeToApply.paddingX} !important;
            font-size: ${themeToApply.fontSize} !important;
            font-weight: ${themeToApply.fontWeight} !important;
            line-height: ${themeToApply.lineHeight} !important;
            transition: ${themeToApply.transition} !important;
            box-shadow: ${themeToApply.shadow} !important;
            transform: scale(${themeToApply.scale}) !important;
          }
          button.btn.btn-primary.btn-small.${primaryClass}:hover:not(:disabled),
          button.btn.btn-primary.btn-medium.${primaryClass}:hover:not(:disabled),
          button.btn.btn-primary.btn-large.${primaryClass}:hover:not(:disabled),
          button.btn.btn-primary.${primaryClass}:hover:not(:disabled),
          button.btn-primary.btn-small.${primaryClass}:hover:not(:disabled),
          button.btn-primary.btn-medium.${primaryClass}:hover:not(:disabled),
          button.btn-primary.btn-large.${primaryClass}:hover:not(:disabled),
          button.btn-primary.${primaryClass}:hover:not(:disabled),
          .btn.btn-primary.btn-small.${primaryClass}:hover:not(:disabled),
          .btn.btn-primary.btn-medium.${primaryClass}:hover:not(:disabled),
          .btn.btn-primary.btn-large.${primaryClass}:hover:not(:disabled),
          .btn.btn-primary.${primaryClass}:hover:not(:disabled),
          .btn-primary.btn-small.${primaryClass}:hover:not(:disabled),
          .btn-primary.btn-medium.${primaryClass}:hover:not(:disabled),
          .btn-primary.btn-large.${primaryClass}:hover:not(:disabled),
          .btn-primary.${primaryClass}:hover:not(:disabled),
          button.${primaryClass}.btn-primary:hover:not(:disabled),
          .${primaryClass}.btn-primary:hover:not(:disabled),
          button.btn.${primaryClass}:hover:not(:disabled),
          .btn.${primaryClass}:hover:not(:disabled),
          button.${primaryClass}:hover:not(:disabled),
          .${primaryClass}:hover:not(:disabled) {
            background-color: ${themeToApply.primaryHover} !important;
            border-color: ${themeToApply.primaryHover} !important;
            box-shadow: ${themeToApply.shadowHover} !important;
            transform: scale(${themeToApply.scaleHover}) !important;
          }
          button.btn.btn-primary.${primaryClass}:active:not(:disabled),
          .btn-primary.${primaryClass}:active:not(:disabled),
          button.${primaryClass}:active:not(:disabled),
          .${primaryClass}:active:not(:disabled) {
            background-color: ${themeToApply.primaryActive} !important;
            transform: scale(0.98) !important;
          }
          /* Direct override - target any element with both btn-primary and our custom class */
          .btn-primary.${primaryClass},
          button.btn-primary.${primaryClass},
          .btn.btn-primary.${primaryClass},
          button.btn.btn-primary.${primaryClass},
          .btn-primary.${primaryClass}.btn-small,
          .btn-primary.${primaryClass}.btn-medium,
          .btn-primary.${primaryClass}.btn-large,
          button.btn-primary.${primaryClass}.btn-small,
          button.btn-primary.${primaryClass}.btn-medium,
          button.btn-primary.${primaryClass}.btn-large {
            background-color: ${themeToApply.primaryColor} !important;
            border-color: ${themeToApply.primaryColor} !important;
          }
          .btn-primary.${primaryClass}:hover:not(:disabled),
          button.btn-primary.${primaryClass}:hover:not(:disabled),
          .btn.btn-primary.${primaryClass}:hover:not(:disabled),
          button.btn.btn-primary.${primaryClass}:hover:not(:disabled),
          .btn-primary.${primaryClass}.btn-small:hover:not(:disabled),
          .btn-primary.${primaryClass}.btn-medium:hover:not(:disabled),
          .btn-primary.${primaryClass}.btn-large:hover:not(:disabled),
          button.btn-primary.${primaryClass}.btn-small:hover:not(:disabled),
          button.btn-primary.${primaryClass}.btn-medium:hover:not(:disabled),
          button.btn-primary.${primaryClass}.btn-large:hover:not(:disabled) {
            background-color: ${themeToApply.primaryHover} !important;
            border-color: ${themeToApply.primaryHover} !important;
          }
          /* Outline button styles */
          button.btn.btn-outline.${outlineClass},
          button.btn-outline.${outlineClass},
          .btn.btn-outline.${outlineClass},
          .btn-outline.${outlineClass},
          button.${outlineClass}.btn-outline,
          .${outlineClass}.btn-outline,
          button.btn.${outlineClass},
          .btn.${outlineClass},
          button.${outlineClass},
          .${outlineClass} {
            border-color: ${themeToApply.primaryColor} !important;
            color: ${themeToApply.primaryColor} !important;
            background-color: transparent !important;
          }
          .btn-outline.${outlineClass},
          button.btn-outline.${outlineClass} {
            border-color: ${themeToApply.primaryColor} !important;
            color: ${themeToApply.primaryColor} !important;
          }
          button.btn.btn-outline.${outlineClass}:hover:not(:disabled),
          button.btn-outline.${outlineClass}:hover:not(:disabled),
          .btn.btn-outline.${outlineClass}:hover:not(:disabled),
          .btn-outline.${outlineClass}:hover:not(:disabled),
          button.${outlineClass}.btn-outline:hover:not(:disabled),
          .${outlineClass}.btn-outline:hover:not(:disabled),
          button.btn.${outlineClass}:hover:not(:disabled),
          .btn.${outlineClass}:hover:not(:disabled),
          button.${outlineClass}:hover:not(:disabled),
          .${outlineClass}:hover:not(:disabled) {
            background-color: ${hexToRgba(themeToApply.primaryColor, 0.1)} !important;
            transform: scale(${themeToApply.scaleHover}) !important;
          }
          .btn-outline.${outlineClass}:hover:not(:disabled),
          button.btn-outline.${outlineClass}:hover:not(:disabled) {
            background-color: ${hexToRgba(themeToApply.primaryColor, 0.1)} !important;
          }
          /* Border radius for all buttons */
          button.btn,
          .btn,
          button.btn-primary,
          .btn-primary,
          button.btn-secondary,
          .btn-secondary,
          button.btn-outline,
          .btn-outline,
          button.btn-ghost,
          .btn-ghost,
          button.btn-destructive,
          .btn-destructive,
          button.btn-small,
          .btn-small,
          button.btn-medium,
          .btn-medium,
          button.btn-large,
          .btn-large,
          button.btn-disabled,
          .btn-disabled,
          button.btn-loading,
          .btn-loading {
            border-radius: ${themeToApply.borderRadius} !important;
            border-width: ${themeToApply.borderWidth} !important;
            border-style: ${themeToApply.borderStyle} !important;
          }
        `;
        break;
      case 'input':
      case 'textarea':
        css = `
          /* Border radius for all inputs */
          input.input-base,
          .input-base,
          textarea.textarea,
          .textarea,
          input.input-default,
          .input-default,
          input.input-rounded,
          .input-rounded,
          input.input-small,
          .input-small,
          input.input-medium,
          .input-medium,
          input.input-large,
          .input-large {
            border-radius: ${themeToApply.borderRadius} !important;
            border-width: ${themeToApply.borderWidth} !important;
            border-style: ${themeToApply.borderStyle} !important;
            padding: ${themeToApply.paddingY} ${themeToApply.paddingX} !important;
            font-size: ${themeToApply.fontSize} !important;
            line-height: ${themeToApply.lineHeight} !important;
            transition: ${themeToApply.transition} !important;
          }
          /* Border color */
          input.input-base,
          .input-base,
          textarea.textarea,
          .textarea,
          input.input-default,
          .input-default,
          input.input-rounded,
          .input-rounded {
            border-color: ${themeToApply.borderColor} !important;
          }
          /* Focus state */
          input.input-base:focus,
          .input-base:focus,
          textarea.textarea:focus,
          .textarea:focus,
          input.input-default:focus,
          .input-default:focus,
          input.input-rounded:focus,
          .input-rounded:focus,
          input.input-custom:focus,
          .input-custom:focus,
          textarea.input-custom:focus {
            border-color: ${themeToApply.focusColor} !important;
            box-shadow: 0 0 0 3px ${hexToRgba(themeToApply.focusColor, 0.1)} !important;
            outline: none !important;
            transform: scale(1.01) !important;
          }
          /* Error state */
          input.input-error,
          .input-error,
          textarea.input-error,
          input.input-base.input-error,
          .input-base.input-error,
          input.input-error-custom,
          .input-error-custom,
          textarea.input-error-custom {
            border-color: ${themeToApply.errorColor} !important;
            box-shadow: 0 0 0 3px ${hexToRgba(themeToApply.errorColor, 0.1)} !important;
          }
        `;
        break;
      case 'card':
        css = `
          .card-custom,
          .card-base.card-custom,
          .card.card-custom {
            border-color: ${themeToApply.borderColor} !important;
            background-color: ${themeToApply.backgroundColor} !important;
            box-shadow: ${themeToApply.shadow} !important;
            border-radius: ${themeToApply.borderRadius} !important;
            border-width: ${themeToApply.borderWidth} !important;
            border-style: ${themeToApply.borderStyle} !important;
            transition: ${themeToApply.transition} !important;
            padding: ${themeToApply.paddingY} ${themeToApply.paddingX} !important;
          }
          .card-custom:hover {
            box-shadow: ${themeToApply.shadowHover} !important;
            transform: translateY(-2px) scale(${themeToApply.scaleHover}) !important;
          }
        `;
        break;
      case 'badge':
        css = `
          .badge-primary-custom,
          .badge-base.badge-primary-custom {
            background-color: ${themeToApply.primaryColor} !important;
            color: white !important;
            border-radius: ${themeToApply.borderRadius} !important;
            padding: ${parseFloat(themeToApply.paddingY) * 0.5}rem ${parseFloat(themeToApply.paddingX) * 0.75}rem !important;
            font-size: ${parseFloat(themeToApply.fontSize) * 0.85}rem !important;
            transition: ${themeToApply.transition} !important;
          }
        `;
        break;
      case 'alert':
        css = `
          .alert-success-custom {
            background-color: ${hexToRgba(themeToApply.successColor, 0.1)} !important;
            border-color: ${themeToApply.successColor} !important;
            color: ${themeToApply.successColor} !important;
            border-radius: ${themeToApply.borderRadius} !important;
          }
          .alert-error-custom {
            background-color: ${hexToRgba(themeToApply.errorColor, 0.1)} !important;
            border-color: ${themeToApply.errorColor} !important;
            color: ${themeToApply.errorColor} !important;
            border-radius: ${themeToApply.borderRadius} !important;
          }
          .alert-warning-custom {
            background-color: ${hexToRgba(themeToApply.warningColor, 0.1)} !important;
            border-color: ${themeToApply.warningColor} !important;
            color: ${themeToApply.warningColor} !important;
            border-radius: ${themeToApply.borderRadius} !important;
          }
          .alert-info-custom {
            background-color: ${hexToRgba(themeToApply.infoColor, 0.1)} !important;
            border-color: ${themeToApply.infoColor} !important;
            color: ${themeToApply.infoColor} !important;
            border-radius: ${themeToApply.borderRadius} !important;
          }
        `;
        break;
      case 'checkbox':
      case 'radio':
        css = `
          .checkbox-primary-custom,
          .checkbox.checked.checkbox-primary-custom,
          .radio-input:checked.radio-primary-custom {
            background-color: ${themeToApply.primaryColor} !important;
            border-color: ${themeToApply.primaryColor} !important;
          }
          .checkbox,
          .radio-input {
            border-radius: ${themeToApply.borderRadius} !important;
            transition: ${themeToApply.transition} !important;
          }
        `;
        break;
      case 'select':
        css = `
          .select-custom:focus,
          .select__control.select-custom:focus,
          .select__control.select-custom--is-focused {
            border-color: ${themeToApply.focusColor} !important;
            box-shadow: 0 0 0 3px ${hexToRgba(themeToApply.focusColor, 0.1)} !important;
          }
          .select__control {
            border-radius: ${themeToApply.borderRadius} !important;
            border-color: ${themeToApply.borderColor} !important;
            transition: ${themeToApply.transition} !important;
          }
        `;
        break;
    }
    if (style) {
      style.textContent = css;
    }
  };

  const handleChange = (key, value) => {
    const newTheme = { ...theme, [key]: value };
    
    // Auto-adjust hover color for primary color changes
    if (key === 'primaryColor') {
      const darker = adjustBrightness(value, -10);
      const darkest = adjustBrightness(value, -20);
      newTheme.primaryHover = darker;
      newTheme.primaryActive = darkest;
    }
    
    setTheme(newTheme);
    
    const classes = generateClasses(componentType, newTheme);
    applyThemeClasses(componentType, newTheme, classes);
    
    if (onThemeChange) {
      onThemeChange({ ...newTheme, classes });
    }
  };

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function adjustBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }

  useEffect(() => {
    const classes = generateClasses(componentType, theme);
    applyThemeClasses(componentType, theme, classes);
    if (onThemeChange) {
      onThemeChange({ ...theme, classes });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentClasses = generateClasses(componentType, theme);

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'colors', label: 'Colors', icon: '🌈' },
    { id: 'spacing', label: 'Spacing', icon: '📏' },
    { id: 'typography', label: 'Typography', icon: '✍️' },
    { id: 'effects', label: 'Effects', icon: '✨' },
  ];

  const renderColorInput = (label, key, showPresets = true) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="color"
          value={theme[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer transition-transform hover:scale-110"
        />
        <input
          type="text"
          value={theme[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="#0069c2"
        />
      </div>
      {showPresets && (
        <div className="grid grid-cols-4 gap-1">
          {colorPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handleChange(key, preset.value)}
              className={`h-8 rounded border-2 transition-all hover:scale-110 ${
                theme[key] === preset.value
                  ? 'border-gray-900 scale-110 ring-2 ring-blue-500'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderSlider = (label, key, min, max, step = 1, unit = '') => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500">{theme[key]}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={parseFloat(theme[key]) || 0}
        onChange={(e) => handleChange(key, `${e.target.value}${unit}`)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 4v2m0-6V4m0 6v2m0-6V4a2 2 0 100 4m0-4a2 2 0 110 4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Customize {componentType}</h3>
            <p className="text-xs text-gray-500">Real-time preview • Advanced controls</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <svg 
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* Border Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Border Radius</label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {borderRadiusPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handleChange('borderRadius', preset.value)}
                        className={`px-3 py-2 text-xs font-medium rounded border-2 transition-all hover:scale-105 ${
                          theme.borderRadius === preset.value
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                        style={{ borderRadius: preset.value }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={theme.borderRadius}
                    onChange={(e) => handleChange('borderRadius', e.target.value)}
                    placeholder="e.g., 4px, 0.5rem"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span>Class:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono text-xs">{currentClasses.borderRadius}</code>
                  </p>
                </div>

                {/* Border Width & Style */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Width</label>
                    <select
                      value={theme.borderWidth}
                      onChange={(e) => handleChange('borderWidth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0px">None</option>
                      <option value="1px">Thin (1px)</option>
                      <option value="2px">Medium (2px)</option>
                      <option value="3px">Thick (3px)</option>
                      <option value="4px">Extra Thick (4px)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Style</label>
                    <select
                      value={theme.borderStyle}
                      onChange={(e) => handleChange('borderStyle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="space-y-6">
                {(componentType === 'button' || componentType === 'badge' || componentType === 'checkbox' || componentType === 'radio') && (
                  <>
                    {renderColorInput('Primary Color', 'primaryColor')}
                    <div className="grid grid-cols-2 gap-4">
                      {renderColorInput('Hover Color', 'primaryHover', false)}
                      {renderColorInput('Active Color', 'primaryActive', false)}
                    </div>
                  </>
                )}

                {(componentType === 'input' || componentType === 'textarea' || componentType === 'select' || componentType === 'card') && (
                  <>
                    {renderColorInput('Border Color', 'borderColor')}
                    {renderColorInput('Focus Color', 'focusColor')}
                  </>
                )}

                {componentType === 'input' && (
                  renderColorInput('Error Color', 'errorColor')
                )}

                {componentType === 'card' && (
                  renderColorInput('Background Color', 'backgroundColor')
                )}

                {componentType === 'alert' && (
                  <div className="grid grid-cols-2 gap-4">
                    {renderColorInput('Success', 'successColor')}
                    {renderColorInput('Error', 'errorColor')}
                    {renderColorInput('Warning', 'warningColor')}
                    {renderColorInput('Info', 'infoColor')}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'spacing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {renderSlider('Padding X', 'paddingX', 0, 3, 0.125, 'rem')}
                  {renderSlider('Padding Y', 'paddingY', 0, 2, 0.125, 'rem')}
                </div>
                {componentType === 'button' && (
                  renderSlider('Gap', 'gap', 0, 2, 0.125, 'rem')
                )}
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="space-y-6">
                {renderSlider('Font Size', 'fontSize', 0.75, 1.5, 0.125, 'rem')}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
                  <select
                    value={theme.fontWeight}
                    onChange={(e) => handleChange('fontWeight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semibold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>
                {renderSlider('Line Height', 'lineHeight', 1, 2, 0.125)}
              </div>
            )}

            {activeTab === 'effects' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Shadow</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {shadowPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handleChange('shadow', preset.value)}
                        className={`px-3 py-2 text-xs rounded border transition-all hover:scale-105 ${
                          theme.shadow === preset.value
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={theme.shadow}
                    onChange={(e) => handleChange('shadow', e.target.value)}
                    placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Hover Shadow</label>
                  <input
                    type="text"
                    value={theme.shadowHover}
                    onChange={(e) => handleChange('shadowHover', e.target.value)}
                    placeholder="e.g., 0 10px 15px rgba(0,0,0,0.15)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Transition</label>
                  <div className="grid grid-cols-5 gap-2">
                    {transitionPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handleChange('transition', preset.value)}
                        className={`px-3 py-2 text-xs rounded border transition-all hover:scale-105 ${
                          theme.transition === preset.value
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {componentType === 'button' && (
                  <div className="grid grid-cols-2 gap-4">
                    {renderSlider('Scale', 'scale', 0.9, 1.1, 0.01)}
                    {renderSlider('Hover Scale', 'scaleHover', 1, 1.1, 0.01)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => {
                const defaultTheme = {
                  borderRadius: '4px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  primaryColor: '#0069c2',
                  primaryHover: '#005a9e',
                  primaryActive: '#004d85',
                  borderColor: '#d1d5db',
                  focusColor: '#0069c2',
                  errorColor: '#dc2626',
                  backgroundColor: '#ffffff',
                  paddingX: '0.75rem',
                  paddingY: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.25rem',
                  shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  shadowHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.2s ease',
                  scale: '1',
                  scaleHover: '1.02',
                };
                setTheme(defaultTheme);
                const classes = generateClasses(componentType, defaultTheme);
                applyThemeClasses(componentType, defaultTheme, classes);
                if (onThemeChange) {
                  onThemeChange({ ...defaultTheme, classes });
                }
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              ↺ Reset to Default
            </button>
            <div className="text-xs text-gray-500">
              Changes apply instantly
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentCustomizer;
