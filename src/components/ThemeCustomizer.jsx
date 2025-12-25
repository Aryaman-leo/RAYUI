import { useState, useEffect } from 'react';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Alert from './ui/Alert';

const ThemeCustomizer = ({ isOpen, onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState('button');
  const [theme, setTheme] = useState({
    // Button
    buttonBorderRadius: '4px',
    buttonPrimaryColor: '#0069c2',
    buttonPrimaryHover: '#005a9e',
    buttonSecondaryColor: '#6b7280',
    buttonSecondaryHover: '#4b5563',
    
    // Input
    inputBorderRadius: '4px',
    inputBorderColor: '#d1d5db',
    inputFocusColor: '#0069c2',
    inputErrorColor: '#dc2626',
    
    // Card
    cardBorderRadius: '8px',
    cardBorderColor: '#e5e7eb',
    cardBackground: '#ffffff',
    cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    
    // Badge
    badgeBorderRadius: '4px',
    badgePrimaryColor: '#0069c2',
    badgeSuccessColor: '#16a34a',
    badgeErrorColor: '#dc2626',
    badgeWarningColor: '#d97706',
    badgeInfoColor: '#2563eb',
    
    // Alert
    alertBorderRadius: '8px',
    alertSuccessBg: '#f0fdf4',
    alertErrorBg: '#fef2f2',
    alertWarningBg: '#fffbeb',
    alertInfoBg: '#eff6ff',
    
    // Select
    selectBorderRadius: '4px',
    selectBorderColor: '#d1d5db',
    selectFocusColor: '#0069c2',
    
    // Checkbox/Radio
    checkboxBorderRadius: '4px',
    checkboxColor: '#0069c2',
    
    // Progress
    progressBorderRadius: '4px',
    progressColor: '#0069c2',
    progressSuccessColor: '#16a34a',
    
    // Modal
    modalBorderRadius: '8px',
    modalOverlayBg: 'rgba(0, 0, 0, 0.1)',
    
    // Tooltip
    tooltipBorderRadius: '4px',
    tooltipBg: '#1f2937',
    
    // Textarea
    textareaBorderRadius: '4px',
    textareaBorderColor: '#d1d5db',
    textareaFocusColor: '#0069c2',
    
    // Slider
    sliderTrackColor: '#4318ff',
    sliderHandleColor: '#4318ff',
    sliderRailColor: '#d1d5db',
  });

  const borderRadiusPresets = [
    { label: 'None', value: '0px' },
    { label: 'Small (2px)', value: '2px' },
    { label: 'Medium (4px)', value: '4px' },
    { label: 'Large (8px)', value: '8px' },
    { label: 'XL (12px)', value: '12px' },
    { label: '2XL (16px)', value: '16px' },
    { label: 'Full', value: '9999px' }
  ];

  const colorPresets = [
    { name: 'MDN Blue', value: '#0069c2' },
    { name: 'Purple', value: '#4318ff' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' }
  ];

  const tabs = [
    { id: 'button', label: 'Button', icon: '🔘' },
    { id: 'input', label: 'Input', icon: '📝' },
    { id: 'card', label: 'Card', icon: '🃏' },
    { id: 'badge', label: 'Badge', icon: '🏷️' },
    { id: 'alert', label: 'Alert', icon: '⚠️' },
    { id: 'select', label: 'Select', icon: '📋' },
    { id: 'checkbox', label: 'Checkbox/Radio', icon: '☑️' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'modal', label: 'Modal', icon: '🪟' },
    { id: 'tooltip', label: 'Tooltip', icon: '💬' },
    { id: 'textarea', label: 'Textarea', icon: '📄' },
    { id: 'slider', label: 'Slider', icon: '🎚️' }
  ];

  const handleChange = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }));
    applyTheme({ ...theme, [key]: value });
  };

  const applyTheme = (themeToApply) => {
    const style = document.createElement('style');
    style.id = 'theme-customizer-styles';
    const existingStyle = document.getElementById('theme-customizer-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.textContent = `
      /* Button Styles */
      .btn, .btn-primary, .btn-secondary, .btn-outline, .btn-ghost, .btn-destructive {
        border-radius: ${themeToApply.buttonBorderRadius} !important;
      }
      .btn-primary {
        background-color: ${themeToApply.buttonPrimaryColor} !important;
        border-color: ${themeToApply.buttonPrimaryColor} !important;
      }
      .btn-primary:hover:not(:disabled) {
        background-color: ${themeToApply.buttonPrimaryHover} !important;
      }
      .btn-secondary {
        background-color: ${themeToApply.buttonSecondaryColor} !important;
      }
      .btn-secondary:hover:not(:disabled) {
        background-color: ${themeToApply.buttonSecondaryHover} !important;
      }
      .btn-outline {
        border-color: ${themeToApply.buttonPrimaryColor} !important;
        color: ${themeToApply.buttonPrimaryColor} !important;
      }
      .btn-outline:hover:not(:disabled) {
        background-color: ${themeToApply.buttonPrimaryColor}10 !important;
      }
      
      /* Input Styles */
      .input-base, .input-default, .input-rounded {
        border-radius: ${themeToApply.inputBorderRadius} !important;
        border-color: ${themeToApply.inputBorderColor} !important;
      }
      .input-base:focus {
        border-color: ${themeToApply.inputFocusColor} !important;
        box-shadow: 0 0 0 3px ${hexToRgba(themeToApply.inputFocusColor, 0.1)} !important;
      }
      .input-error {
        border-color: ${themeToApply.inputErrorColor} !important;
        box-shadow: 0 0 0 3px ${hexToRgba(themeToApply.inputErrorColor, 0.1)} !important;
      }
      
      /* Card Styles */
      .card-base, .card {
        border-radius: ${themeToApply.cardBorderRadius} !important;
        border-color: ${themeToApply.cardBorderColor} !important;
        background-color: ${themeToApply.cardBackground} !important;
        box-shadow: ${themeToApply.cardShadow} !important;
      }
      
      /* Badge Styles */
      .badge-base, .badge-default, .badge-primary, .badge-success, .badge-error, .badge-warning, .badge-info {
        border-radius: ${themeToApply.badgeBorderRadius} !important;
      }
      .badge-primary {
        background-color: ${themeToApply.badgePrimaryColor} !important;
      }
      .badge-success {
        background-color: ${hexToRgba(themeToApply.badgeSuccessColor, 0.2)} !important;
        color: ${themeToApply.badgeSuccessColor} !important;
      }
      .badge-error {
        background-color: ${hexToRgba(themeToApply.badgeErrorColor, 0.2)} !important;
        color: ${themeToApply.badgeErrorColor} !important;
      }
      .badge-warning {
        background-color: ${hexToRgba(themeToApply.badgeWarningColor, 0.2)} !important;
        color: ${themeToApply.badgeWarningColor} !important;
      }
      .badge-info {
        background-color: ${hexToRgba(themeToApply.badgeInfoColor, 0.2)} !important;
        color: ${themeToApply.badgeInfoColor} !important;
      }
      
      /* Alert Styles */
      .alert-base, .alert-error, .alert-success, .alert-warning, .alert-info {
        border-radius: ${themeToApply.alertBorderRadius} !important;
      }
      .alert-success {
        background-color: ${themeToApply.alertSuccessBg} !important;
      }
      .alert-error {
        background-color: ${themeToApply.alertErrorBg} !important;
      }
      .alert-warning {
        background-color: ${themeToApply.alertWarningBg} !important;
      }
      .alert-info {
        background-color: ${themeToApply.alertInfoBg} !important;
      }
      
      /* Select Styles */
      .select-base, .select-default, .select-rounded {
        border-radius: ${themeToApply.selectBorderRadius} !important;
        border-color: ${themeToApply.selectBorderColor} !important;
      }
      .select-base:focus {
        border-color: ${themeToApply.selectFocusColor} !important;
        box-shadow: 0 0 0 3px ${hexToRgba(themeToApply.selectFocusColor, 0.1)} !important;
      }
      .single-select .select__control, .multi-select .select__control {
        border-radius: ${themeToApply.selectBorderRadius} !important;
        border-color: ${themeToApply.selectBorderColor} !important;
      }
      .single-select .select__control--is-focused,
      .multi-select .select__control--is-focused {
        border-color: ${themeToApply.selectFocusColor} !important;
        box-shadow: 0 0 0 1px ${themeToApply.selectFocusColor} !important;
      }
      
      /* Checkbox/Radio Styles */
      .checkbox {
        border-radius: ${themeToApply.checkboxBorderRadius} !important;
      }
      .checkbox.checked {
        background-color: ${themeToApply.checkboxColor} !important;
        border-color: ${themeToApply.checkboxColor} !important;
      }
      .radio-input:checked {
        border-color: ${themeToApply.checkboxColor} !important;
        background-color: ${themeToApply.checkboxColor} !important;
      }
      
      /* Progress Styles */
      .progress-base, .progress-fill {
        border-radius: ${themeToApply.progressBorderRadius} !important;
      }
      .progress-fill {
        background-color: ${themeToApply.progressColor} !important;
      }
      .progress-success .progress-fill {
        background-color: ${themeToApply.progressSuccessColor} !important;
      }
      
      /* Modal Styles */
      .modal-base {
        border-radius: ${themeToApply.modalBorderRadius} !important;
      }
      .modal-overlay {
        background: ${themeToApply.modalOverlayBg} !important;
      }
      
      /* Tooltip Styles */
      .tooltip-base, .tooltip-default {
        border-radius: ${themeToApply.tooltipBorderRadius} !important;
        background-color: ${themeToApply.tooltipBg} !important;
      }
      
      /* Textarea Styles */
      .textarea {
        border-radius: ${themeToApply.textareaBorderRadius} !important;
        border-color: ${themeToApply.textareaBorderColor} !important;
      }
      .textarea:focus {
        border-color: ${themeToApply.textareaFocusColor} !important;
        box-shadow: 0 0 0 1px ${themeToApply.textareaFocusColor} !important;
      }
      
      /* Slider Styles */
      .slider-container .rc-slider-track {
        background-color: ${themeToApply.sliderTrackColor} !important;
      }
      .slider-container .rc-slider-handle {
        border-color: ${themeToApply.sliderHandleColor} !important;
        background-color: ${themeToApply.sliderHandleColor} !important;
      }
      .slider-container .rc-slider-rail {
        background-color: ${themeToApply.sliderRailColor} !important;
      }
    `;
    document.head.appendChild(style);
  };

  const handleApply = () => {
    applyTheme(theme);
    if (onApply) {
      onApply(theme);
    }
    onClose();
  };

  const handleReset = () => {
    const defaultTheme = {
      buttonBorderRadius: '4px',
      buttonPrimaryColor: '#0069c2',
      buttonPrimaryHover: '#005a9e',
      buttonSecondaryColor: '#6b7280',
      buttonSecondaryHover: '#4b5563',
      inputBorderRadius: '4px',
      inputBorderColor: '#d1d5db',
      inputFocusColor: '#0069c2',
      inputErrorColor: '#dc2626',
      cardBorderRadius: '8px',
      cardBorderColor: '#e5e7eb',
      cardBackground: '#ffffff',
      cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      badgeBorderRadius: '4px',
      badgePrimaryColor: '#0069c2',
      badgeSuccessColor: '#16a34a',
      badgeErrorColor: '#dc2626',
      badgeWarningColor: '#d97706',
      badgeInfoColor: '#2563eb',
      alertBorderRadius: '8px',
      alertSuccessBg: '#f0fdf4',
      alertErrorBg: '#fef2f2',
      alertWarningBg: '#fffbeb',
      alertInfoBg: '#eff6ff',
      selectBorderRadius: '4px',
      selectBorderColor: '#d1d5db',
      selectFocusColor: '#0069c2',
      checkboxBorderRadius: '4px',
      checkboxColor: '#0069c2',
      progressBorderRadius: '4px',
      progressColor: '#0069c2',
      progressSuccessColor: '#16a34a',
      modalBorderRadius: '8px',
      modalOverlayBg: 'rgba(0, 0, 0, 0.1)',
      tooltipBorderRadius: '4px',
      tooltipBg: '#1f2937',
      textareaBorderRadius: '4px',
      textareaBorderColor: '#d1d5db',
      textareaFocusColor: '#0069c2',
      sliderTrackColor: '#4318ff',
      sliderHandleColor: '#4318ff',
      sliderRailColor: '#d1d5db',
    };
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
  };

  const ColorInput = ({ label, value, onChange, presetColors = [] }) => (
    <div>
      <label className="block text-xs font-medium text-[#1b1b1b] mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 border border-[#e0e0e6] rounded-md cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-[#e0e0e6] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0069c2] focus:border-transparent"
          placeholder="#0069c2"
        />
      </div>
      {presetColors.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className={`h-8 rounded-md border-2 transition-all ${
                value === preset.value
                  ? 'border-[#1b1b1b] scale-105'
                  : 'border-[#e0e0e6] hover:border-[#1b1b1b]'
              }`}
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      )}
    </div>
  );

  const BorderRadiusInput = ({ label, value, onChange }) => (
    <div>
      <label className="block text-xs font-medium text-[#1b1b1b] mb-2">{label}</label>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {borderRadiusPresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              value === preset.value
                ? 'bg-[#0069c2] text-white border-[#0069c2]'
                : 'bg-white text-[#1b1b1b] border-[#e0e0e6] hover:bg-[#f9f9fb]'
            }`}
            style={{ borderRadius: preset.value }}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 4px, 0.5rem"
        className="w-full px-3 py-2 border border-[#e0e0e6] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0069c2] focus:border-transparent"
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'button':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-[#e0e0e6] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>
            <BorderRadiusInput
              label="Border Radius"
              value={theme.buttonBorderRadius}
              onChange={(val) => handleChange('buttonBorderRadius', val)}
            />
            <ColorInput
              label="Primary Color"
              value={theme.buttonPrimaryColor}
              onChange={(val) => {
                handleChange('buttonPrimaryColor', val);
                const darker = adjustBrightness(val, -10);
                handleChange('buttonPrimaryHover', darker);
              }}
              presetColors={colorPresets}
            />
            <ColorInput
              label="Primary Hover"
              value={theme.buttonPrimaryHover}
              onChange={(val) => handleChange('buttonPrimaryHover', val)}
            />
            <ColorInput
              label="Secondary Color"
              value={theme.buttonSecondaryColor}
              onChange={(val) => handleChange('buttonSecondaryColor', val)}
            />
            <ColorInput
              label="Secondary Hover"
              value={theme.buttonSecondaryHover}
              onChange={(val) => handleChange('buttonSecondaryHover', val)}
            />
          </div>
        );

      case 'input':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-[#e0e0e6] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="space-y-3 max-w-md">
                <Input placeholder="Enter text..." />
                <Input error placeholder="Error state" />
              </div>
            </div>
            <BorderRadiusInput
              label="Border Radius"
              value={theme.inputBorderRadius}
              onChange={(val) => handleChange('inputBorderRadius', val)}
            />
            <ColorInput
              label="Border Color"
              value={theme.inputBorderColor}
              onChange={(val) => handleChange('inputBorderColor', val)}
            />
            <ColorInput
              label="Focus Color"
              value={theme.inputFocusColor}
              onChange={(val) => handleChange('inputFocusColor', val)}
              presetColors={colorPresets}
            />
            <ColorInput
              label="Error Color"
              value={theme.inputErrorColor}
              onChange={(val) => handleChange('inputErrorColor', val)}
            />
          </div>
        );

      case 'card':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-[#e0e0e6] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <Card variant="default" className="p-4">
                <p className="text-sm">This is a card preview</p>
              </Card>
            </div>
            <BorderRadiusInput
              label="Border Radius"
              value={theme.cardBorderRadius}
              onChange={(val) => handleChange('cardBorderRadius', val)}
            />
            <ColorInput
              label="Border Color"
              value={theme.cardBorderColor}
              onChange={(val) => handleChange('cardBorderColor', val)}
            />
            <ColorInput
              label="Background Color"
              value={theme.cardBackground}
              onChange={(val) => handleChange('cardBackground', val)}
            />
            <div>
              <label className="block text-xs font-medium text-[#1b1b1b] mb-2">Box Shadow</label>
              <input
                type="text"
                value={theme.cardShadow}
                onChange={(e) => handleChange('cardShadow', e.target.value)}
                placeholder="0 1px 3px rgba(0, 0, 0, 0.1)"
                className="w-full px-3 py-2 border border-[#e0e0e6] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0069c2] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-[#e0e0e6] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            <BorderRadiusInput
              label="Border Radius"
              value={theme.badgeBorderRadius}
              onChange={(val) => handleChange('badgeBorderRadius', val)}
            />
            <ColorInput
              label="Primary Color"
              value={theme.badgePrimaryColor}
              onChange={(val) => handleChange('badgePrimaryColor', val)}
              presetColors={colorPresets}
            />
            <ColorInput
              label="Success Color"
              value={theme.badgeSuccessColor}
              onChange={(val) => handleChange('badgeSuccessColor', val)}
            />
            <ColorInput
              label="Error Color"
              value={theme.badgeErrorColor}
              onChange={(val) => handleChange('badgeErrorColor', val)}
            />
            <ColorInput
              label="Warning Color"
              value={theme.badgeWarningColor}
              onChange={(val) => handleChange('badgeWarningColor', val)}
            />
            <ColorInput
              label="Info Color"
              value={theme.badgeInfoColor}
              onChange={(val) => handleChange('badgeInfoColor', val)}
            />
          </div>
        );

      case 'alert':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-[#e0e0e6] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="space-y-3">
                <Alert variant="success">Success message</Alert>
                <Alert variant="error">Error message</Alert>
                <Alert variant="warning">Warning message</Alert>
                <Alert variant="info">Info message</Alert>
              </div>
            </div>
            <BorderRadiusInput
              label="Border Radius"
              value={theme.alertBorderRadius}
              onChange={(val) => handleChange('alertBorderRadius', val)}
            />
            <ColorInput
              label="Success Background"
              value={theme.alertSuccessBg}
              onChange={(val) => handleChange('alertSuccessBg', val)}
            />
            <ColorInput
              label="Error Background"
              value={theme.alertErrorBg}
              onChange={(val) => handleChange('alertErrorBg', val)}
            />
            <ColorInput
              label="Warning Background"
              value={theme.alertWarningBg}
              onChange={(val) => handleChange('alertWarningBg', val)}
            />
            <ColorInput
              label="Info Background"
              value={theme.alertInfoBg}
              onChange={(val) => handleChange('alertInfoBg', val)}
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-6">
            <BorderRadiusInput
              label="Border Radius"
              value={theme.selectBorderRadius}
              onChange={(val) => handleChange('selectBorderRadius', val)}
            />
            <ColorInput
              label="Border Color"
              value={theme.selectBorderColor}
              onChange={(val) => handleChange('selectBorderColor', val)}
            />
            <ColorInput
              label="Focus Color"
              value={theme.selectFocusColor}
              onChange={(val) => handleChange('selectFocusColor', val)}
              presetColors={colorPresets}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-6">
            <BorderRadiusInput
              label="Border Radius"
              value={theme.checkboxBorderRadius}
              onChange={(val) => handleChange('checkboxBorderRadius', val)}
            />
            <ColorInput
              label="Checked Color"
              value={theme.checkboxColor}
              onChange={(val) => handleChange('checkboxColor', val)}
              presetColors={colorPresets}
            />
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <BorderRadiusInput
              label="Border Radius"
              value={theme.progressBorderRadius}
              onChange={(val) => handleChange('progressBorderRadius', val)}
            />
            <ColorInput
              label="Progress Color"
              value={theme.progressColor}
              onChange={(val) => handleChange('progressColor', val)}
              presetColors={colorPresets}
            />
            <ColorInput
              label="Success Color"
              value={theme.progressSuccessColor}
              onChange={(val) => handleChange('progressSuccessColor', val)}
            />
          </div>
        );

      case 'modal':
        return (
          <div className="space-y-6">
            <BorderRadiusInput
              label="Border Radius"
              value={theme.modalBorderRadius}
              onChange={(val) => handleChange('modalBorderRadius', val)}
            />
            <ColorInput
              label="Overlay Background"
              value={theme.modalOverlayBg}
              onChange={(val) => handleChange('modalOverlayBg', val)}
            />
          </div>
        );

      case 'tooltip':
        return (
          <div className="space-y-6">
            <BorderRadiusInput
              label="Border Radius"
              value={theme.tooltipBorderRadius}
              onChange={(val) => handleChange('tooltipBorderRadius', val)}
            />
            <ColorInput
              label="Background Color"
              value={theme.tooltipBg}
              onChange={(val) => handleChange('tooltipBg', val)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-6">
            <BorderRadiusInput
              label="Border Radius"
              value={theme.textareaBorderRadius}
              onChange={(val) => handleChange('textareaBorderRadius', val)}
            />
            <ColorInput
              label="Border Color"
              value={theme.textareaBorderColor}
              onChange={(val) => handleChange('textareaBorderColor', val)}
            />
            <ColorInput
              label="Focus Color"
              value={theme.textareaFocusColor}
              onChange={(val) => handleChange('textareaFocusColor', val)}
              presetColors={colorPresets}
            />
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-6">
            <ColorInput
              label="Track Color"
              value={theme.sliderTrackColor}
              onChange={(val) => handleChange('sliderTrackColor', val)}
              presetColors={colorPresets}
            />
            <ColorInput
              label="Handle Color"
              value={theme.sliderHandleColor}
              onChange={(val) => handleChange('sliderHandleColor', val)}
              presetColors={colorPresets}
            />
            <ColorInput
              label="Rail Color"
              value={theme.sliderRailColor}
              onChange={(val) => handleChange('sliderRailColor', val)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Helper functions
  function adjustBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Apply theme on initial mount
  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <Modal.Header title="Customize Theme" onClose={onClose} />
      <Modal.Content>
        <div className="flex gap-6">
          {/* Tabs Sidebar */}
          <div className="w-48 flex-shrink-0 border-r border-[#e0e0e6] pr-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#0069c2] text-white font-medium'
                      : 'text-[#1b1b1b] hover:bg-[#f9f9fb]'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2">
            {renderTabContent()}
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button variant="outline" onClick={handleReset}>Reset All</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleApply}>Apply Changes</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ThemeCustomizer;
