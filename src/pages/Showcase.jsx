import { useState } from 'react';
import {
  Button,
  Card,
  Alert,
  Input,
  Select,
  Checkbox,
  Radio,
  Modal,
  ProgressBar,
  Spinner,
  Badge,
  Tooltip,
  Divider,
  MultiSelect,
  SingleSelect,
  Slider,
  PhoneInput,
  Textarea,
  Toast
} from '../components/ui';
import ThemeCustomizer from '../components/ThemeCustomizer';
import CodeBlock from '../components/CodeBlock';
import ComponentDemo from '../components/ComponentDemo';
import PropsTable from '../components/PropsTable';
import ComponentCustomizer from '../components/ComponentCustomizer';

const componentCategories = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', name: 'Introduction', icon: '📚' },
      { id: 'installation', name: 'Installation', icon: '⚡' }
    ]
  },
  {
    title: 'Components',
    items: [
      { id: 'button', name: 'Button', icon: '🔘' },
      { id: 'input', name: 'Input', icon: '📝' },
      { id: 'select', name: 'Select', icon: '📋' },
      { id: 'checkbox', name: 'Checkbox', icon: '☑️' },
      { id: 'radio', name: 'Radio', icon: '🔘' },
      { id: 'textarea', name: 'Textarea', icon: '📄' },
      { id: 'slider', name: 'Slider', icon: '🎚️' },
      { id: 'phone-input', name: 'Phone Input', icon: '📱' }
    ]
  },
  {
    title: 'Feedback',
    items: [
      { id: 'alert', name: 'Alert', icon: '⚠️' },
      { id: 'badge', name: 'Badge', icon: '🏷️' },
      { id: 'toast', name: 'Toast', icon: '🍞' },
      { id: 'spinner', name: 'Spinner', icon: '🌀' },
      { id: 'progress', name: 'Progress', icon: '📊' }
    ]
  },
  {
    title: 'Overlays',
    items: [
      { id: 'modal', name: 'Modal', icon: '🪟' },
      { id: 'tooltip', name: 'Tooltip', icon: '💬' }
    ]
  },
  {
    title: 'Layout',
    items: [
      { id: 'card', name: 'Card', icon: '🃏' },
      { id: 'divider', name: 'Divider', icon: '➖' }
    ]
  }
];

const Showcase = () => {
  const [activeComponent, setActiveComponent] = useState('introduction');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [sliderValue, setSliderValue] = useState(50);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [phoneValue, setPhoneValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [componentThemes, setComponentThemes] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState('all');

  const showToast = (type) => {
    setToastType(type);
    setToastVisible(true);
  };

  const multiSelectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const singleSelectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'introduction':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#0069c2] to-[#005a9e] text-white p-8 rounded-xl mb-8">
              <h1 className="text-5xl font-bold mb-4">RAY UI</h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                A comprehensive, accessible, and beautifully designed React component library 
                built for modern web applications. Production-ready components with TypeScript support, 
                full customization, and zero dependencies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card variant="default" className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Fast & Lightweight</h3>
                <p className="text-sm text-[#4e4e4e]">
                  Optimized for performance with minimal bundle size. Tree-shakeable and modular.
                </p>
              </Card>
              <Card variant="default" className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">♿</div>
                <h3 className="text-lg font-semibold mb-2">Accessible</h3>
                <p className="text-sm text-[#4e4e4e]">
                  Built with accessibility in mind. WCAG 2.1 compliant with keyboard navigation support.
                </p>
              </Card>
              <Card variant="default" className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-semibold mb-2">Customizable</h3>
                <p className="text-sm text-[#4e4e4e]">
                  Fully customizable theming system. Adjust colors, spacing, and more to match your brand.
                </p>
              </Card>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#0069c2] p-6 rounded-lg">
              <h3 className="font-semibold text-[#1b1b1b] mb-2">✨ Features</h3>
              <ul className="space-y-2 text-[#4e4e4e]">
                <li className="flex items-start">
                  <span className="text-[#0069c2] mr-2">✓</span>
                  <span>30+ production-ready components</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0069c2] mr-2">✓</span>
                  <span>TypeScript support with full type definitions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0069c2] mr-2">✓</span>
                  <span>Dark mode support (coming soon)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0069c2] mr-2">✓</span>
                  <span>Comprehensive documentation with live examples</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0069c2] mr-2">✓</span>
                  <span>Mobile-first responsive design</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'installation':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Installation</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed">
                Get started with RAY UI in minutes. Choose your preferred package manager.
              </p>
            </div>

            <ComponentDemo
              title="npm"
              description="Install using npm"
              code={
                <CodeBlock language="bash">npm install @rayui/components</CodeBlock>
              }
              live={false}
            />

            <ComponentDemo
              title="yarn"
              description="Install using yarn"
              code={
                <CodeBlock language="bash">yarn add @rayui/components</CodeBlock>
              }
              live={false}
            />

            <ComponentDemo
              title="pnpm"
              description="Install using pnpm"
              code={
                <CodeBlock language="bash">pnpm add @rayui/components</CodeBlock>
              }
              live={false}
            />

            <div>
              <h2 className="text-2xl font-semibold text-[#1b1b1b] mt-8 mb-4">Quick Start</h2>
              <CodeBlock language="jsx" title="App.jsx">
{`import { Button } from '@rayui/components';
import '@rayui/components/dist/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Get Started</Button>
    </div>
  );
}`}
              </CodeBlock>
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Button</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Buttons are used to trigger actions and navigate users through your application. 
                They come in various styles and sizes to fit different use cases.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="button" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, button: theme }))}
            />

            <ComponentDemo
              title="Variants"
              description="Different button styles for various contexts"
              code={
                <CodeBlock language="jsx">
{selectedVariant === 'all' ? 
`<Button
  variant="primary"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Primary
</Button>
<Button
  variant="secondary"
  className="${componentThemes.button?.borderRadius || 'rounded'}"
>
  Secondary
</Button>
<Button
  variant="outline"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.outline || 'btn-outline-custom'}"
>
  Outline
</Button>
<Button
  variant="ghost"
  className="${componentThemes.button?.borderRadius || 'rounded'}"
>
  Ghost
</Button>
<Button
  variant="destructive"
  className="${componentThemes.button?.borderRadius || 'rounded'}"
>
  Destructive
</Button>` :
selectedVariant === 'primary' ?
`<Button
  variant="primary"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Primary
</Button>` :
selectedVariant === 'secondary' ?
`<Button
  variant="secondary"
  className="${componentThemes.button?.borderRadius || 'rounded'}"
>
  Secondary
</Button>` :
selectedVariant === 'outline' ?
`<Button
  variant="outline"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.outline || 'btn-outline-custom'}"
>
  Outline
</Button>` :
selectedVariant === 'ghost' ?
`<Button
  variant="ghost"
  className="${componentThemes.button?.borderRadius || 'rounded'}"
>
  Ghost
</Button>` :
`<Button
  variant="destructive"
  className="${componentThemes.button?.borderRadius || 'rounded'}"
>
  Destructive
</Button>`
}
                </CodeBlock>
              }
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSelectedVariant('all')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedVariant === 'all'
                        ? 'bg-[#0069c2] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedVariant('primary')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedVariant === 'primary'
                        ? 'bg-[#0069c2] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Primary
                  </button>
                  <button
                    onClick={() => setSelectedVariant('secondary')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedVariant === 'secondary'
                        ? 'bg-[#0069c2] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Secondary
                  </button>
                  <button
                    onClick={() => setSelectedVariant('outline')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedVariant === 'outline'
                        ? 'bg-[#0069c2] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Outline
                  </button>
                  <button
                    onClick={() => setSelectedVariant('ghost')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedVariant === 'ghost'
                        ? 'bg-[#0069c2] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Ghost
                  </button>
                  <button
                    onClick={() => setSelectedVariant('destructive')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      selectedVariant === 'destructive'
                        ? 'bg-[#0069c2] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Destructive
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedVariant === 'all' && (
                    <>
                      <Button variant="primary" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Primary</Button>
                      <Button variant="secondary" className={componentThemes.button?.borderRadius || ''}>Secondary</Button>
                      <Button variant="outline" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.outline || ''}`.trim()}>Outline</Button>
                      <Button variant="ghost" className={componentThemes.button?.borderRadius || ''}>Ghost</Button>
                      <Button variant="destructive" className={componentThemes.button?.borderRadius || ''}>Destructive</Button>
                    </>
                  )}
                  {selectedVariant === 'primary' && (
                    <Button variant="primary" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Primary</Button>
                  )}
                  {selectedVariant === 'secondary' && (
                    <Button variant="secondary" className={componentThemes.button?.borderRadius || ''}>Secondary</Button>
                  )}
                  {selectedVariant === 'outline' && (
                    <Button variant="outline" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.outline || ''}`.trim()}>Outline</Button>
                  )}
                  {selectedVariant === 'ghost' && (
                    <Button variant="ghost" className={componentThemes.button?.borderRadius || ''}>Ghost</Button>
                  )}
                  {selectedVariant === 'destructive' && (
                    <Button variant="destructive" className={componentThemes.button?.borderRadius || ''}>Destructive</Button>
                  )}
                </div>
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Sizes"
              description="Three size options for different use cases"
              code={
                <CodeBlock language="jsx">
{`<Button
  variant="primary"
  size="small"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Small
</Button>
<Button
  variant="primary"
  size="medium"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Medium
</Button>
<Button
  variant="primary"
  size="large"
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Large
</Button>`}
                </CodeBlock>
              }
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button size="small" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Small</Button>
                <Button size="medium" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Medium</Button>
                <Button size="large" className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Large</Button>
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="States"
              description="Disabled and loading states"
              code={
                <CodeBlock language="jsx">
{`<Button
  variant="primary"
  disabled
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Disabled
</Button>
<Button
  variant="primary"
  loading
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Loading
</Button>
<Button
  variant="primary"
  disabled
  className="${componentThemes.button?.borderRadius || 'rounded'} ${componentThemes.button?.primary || 'btn-primary-custom'}"
>
  Disabled Primary
</Button>`}
                </CodeBlock>
              }
            >
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" disabled className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Disabled</Button>
                <Button variant="primary" loading className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Loading</Button>
                <Button variant="primary" disabled className={`${componentThemes.button?.borderRadius || ''} ${componentThemes.button?.primary || ''}`.trim()}>Disabled Primary</Button>
              </div>
            </ComponentDemo>

            <div>
              <h2 className="text-2xl font-semibold text-[#1b1b1b] mt-8 mb-4">API Reference</h2>
              <PropsTable
                props={[
                  {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
                    default: "'primary'",
                    description: 'The visual style variant of the button',
                    required: false
                  },
                  {
                    name: 'size',
                    type: "'small' | 'medium' | 'large'",
                    default: "'medium'",
                    description: 'The size of the button',
                    required: false
                  },
                  {
                    name: 'disabled',
                    type: 'boolean',
                    default: 'false',
                    description: 'Whether the button is disabled',
                    required: false
                  },
                  {
                    name: 'loading',
                    type: 'boolean',
                    default: 'false',
                    description: 'Shows a loading spinner and disables the button',
                    required: false
                  },
                  {
                    name: 'onClick',
                    type: '(event: MouseEvent) => void',
                    default: '—',
                    description: 'Click event handler',
                    required: false
                  }
                ]}
              />
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <p className="text-sm text-[#92400e]">
                <strong>💡 Tip:</strong> Use primary buttons for the main action, secondary for less important actions, 
                and destructive for dangerous operations like delete.
              </p>
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Input</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Input fields allow users to enter and edit text. They support various states 
                including error, disabled, and different sizes.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="input" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, input: theme }))}
            />

            <ComponentDemo
              title="Basic Usage"
              description="Simple text input with placeholder"
              code={
                <CodeBlock language="jsx">
{`<Input 
  placeholder="Enter your name..." 
  className="${componentThemes.input?.classes?.borderRadius || 'rounded'} ${componentThemes.input?.classes?.border || 'border-[#d1d5db]'} ${componentThemes.input?.classes?.focus || 'input-custom'}"
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <Input 
                  placeholder="Enter your name..." 
                  inputClassName={`input-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.border || ''} ${componentThemes.input?.focus || ''}`}
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Variants"
              description="Different input styles"
              code={
                <CodeBlock language="jsx">
{`<Input variant="default" placeholder="Default" />
<Input variant="rounded" placeholder="Rounded" />`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md space-y-3">
                <Input 
                  variant="default" 
                  placeholder="Default style"
                  inputClassName={`input-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.border || ''} ${componentThemes.input?.focus || ''}`}
                />
                <Input 
                  variant="rounded" 
                  placeholder="Rounded style"
                  inputClassName={`input-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.border || ''} ${componentThemes.input?.focus || ''}`}
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="States"
              description="Error and disabled states"
              code={
                <CodeBlock language="jsx">
{`<Input 
  error 
  placeholder="Error state"
  inputClassName="input-error-custom ${componentThemes.input?.borderRadius || 'rounded'} ${componentThemes.input?.error || ''}"
/>
<Input 
  disabled 
  placeholder="Disabled"
  inputClassName="${componentThemes.input?.borderRadius || 'rounded'}"
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md space-y-3">
                <Input 
                  error 
                  placeholder="Error state"
                  inputClassName={`input-error-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.error || ''}`}
                />
                <Input 
                  disabled 
                  placeholder="Disabled input"
                  inputClassName={componentThemes.input?.borderRadius || ''}
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Sizes"
              description="Different input sizes"
              code={
                <CodeBlock language="jsx">
{`<Input size="small" placeholder="Small" />
<Input size="medium" placeholder="Medium" />
<Input size="large" placeholder="Large" />`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md space-y-3">
                <Input 
                  size="small" 
                  placeholder="Small input"
                  inputClassName={`input-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.border || ''} ${componentThemes.input?.focus || ''}`}
                />
                <Input 
                  size="medium" 
                  placeholder="Medium input"
                  inputClassName={`input-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.border || ''} ${componentThemes.input?.focus || ''}`}
                />
                <Input 
                  size="large" 
                  placeholder="Large input"
                  inputClassName={`input-custom ${componentThemes.input?.borderRadius || ''} ${componentThemes.input?.border || ''} ${componentThemes.input?.focus || ''}`}
                />
              </div>
            </ComponentDemo>

            <PropsTable
              props={[
                {
                  name: 'variant',
                  type: "'default' | 'rounded'",
                  default: "'default'",
                  description: 'Visual style variant',
                  required: false
                },
                {
                  name: 'size',
                  type: "'small' | 'medium' | 'large'",
                  default: "'medium'",
                  description: 'Size of the input',
                  required: false
                },
                {
                  name: 'error',
                  type: 'boolean',
                  default: 'false',
                  description: 'Shows error styling',
                  required: false
                },
                {
                  name: 'disabled',
                  type: 'boolean',
                  default: 'false',
                  description: 'Disables the input',
                  required: false
                }
              ]}
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Select</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Select components allow users to choose from a list of options. 
                Available as native select, single select, and multi-select.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="select" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, select: theme }))}
            />

            <ComponentDemo
              title="Native Select"
              description="Standard HTML select element"
              code={
                <CodeBlock language="jsx">
{`<Select>
  <option>Choose an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <Select>
                  <option>Choose an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </Select>
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Single Select"
              description="Enhanced select with search and custom styling"
              code={
                <CodeBlock language="jsx">
{`<SingleSelect
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ]}
  placeholder="Select an option..."
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <SingleSelect
                  options={singleSelectOptions}
                  placeholder="Select an option..."
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Multi Select"
              description="Select multiple options at once"
              code={
                <CodeBlock language="jsx">
{`<MultiSelect
  options={options}
  placeholder="Select multiple..."
  isSearchable
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <MultiSelect
                  options={multiSelectOptions}
                  placeholder="Select multiple..."
                />
              </div>
            </ComponentDemo>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Checkbox</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Checkboxes allow users to select one or more items from a set. 
                Perfect for forms, settings, and multi-selection scenarios.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="checkbox" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, checkbox: theme }))}
            />

            <ComponentDemo
              title="Basic Usage"
              description="Simple checkbox with label"
              code={
                <CodeBlock language="jsx">
{`<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Accept terms and conditions"
/>`}
                </CodeBlock>
              }
            >
              <div className="space-y-3">
                <Checkbox
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                  label="Accept terms and conditions"
                />
                <Checkbox
                  checked={true}
                  label="Already checked"
                />
                <Checkbox
                  checked={false}
                  disabled
                  label="Disabled checkbox"
                />
              </div>
            </ComponentDemo>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Radio</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Radio buttons allow users to select a single option from a set. 
                Only one option can be selected at a time.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="radio" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, radio: theme }))}
            />

            <ComponentDemo
              title="Basic Usage"
              description="Radio button group"
              code={
                <CodeBlock language="jsx">
{`<Radio
  id="radio1"
  name="group"
  value="option1"
  checked={value === 'option1'}
  onChange={(e) => setValue(e.target.value)}
/>
<label htmlFor="radio1">Option 1</label>`}
                </CodeBlock>
              }
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Radio
                    id="radio1"
                    name="radio-group"
                    value="option1"
                    checked={radioValue === 'option1'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    className={componentThemes.radio?.primary || ''}
                  />
                  <label htmlFor="radio1" className="text-sm text-[#1b1b1b]">Option 1</label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="radio2"
                    name="radio-group"
                    value="option2"
                    checked={radioValue === 'option2'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    className={componentThemes.radio?.primary || ''}
                  />
                  <label htmlFor="radio2" className="text-sm text-[#1b1b1b]">Option 2</label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="radio3"
                    name="radio-group"
                    value="option3"
                    checked={radioValue === 'option3'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    className={componentThemes.radio?.primary || ''}
                  />
                  <label htmlFor="radio3" className="text-sm text-[#1b1b1b]">Option 3</label>
                </div>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Textarea</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Textarea components allow users to enter multiple lines of text. 
                Perfect for comments, descriptions, and longer form inputs.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="textarea" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, textarea: theme }))}
            />

            <ComponentDemo
              title="Basic Usage"
              description="Simple textarea"
              code={
                <CodeBlock language="jsx">
{`<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter your message..."
  rows={4}
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <Textarea
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="Enter your message..."
                  rows={4}
                  className={`input-custom ${componentThemes.textarea?.borderRadius || ''} ${componentThemes.textarea?.border || ''} ${componentThemes.textarea?.focus || ''}`}
                />
              </div>
            </ComponentDemo>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Slider</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Sliders allow users to select a value from a range by dragging a handle. 
                Great for volume controls, price ranges, and numeric inputs.
              </p>
            </div>

            <ComponentDemo
              title="Basic Usage"
              description="Simple slider with labels"
              code={
                <CodeBlock language="jsx">
{`<Slider
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  showLabels
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <Slider
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={setSliderValue}
                  showLabels
                />
              </div>
            </ComponentDemo>
          </div>
        );

      case 'phone-input':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Phone Input</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Phone input components provide a formatted input field for phone numbers 
                with country code support and automatic formatting.
              </p>
            </div>

            <ComponentDemo
              title="Basic Usage"
              description="Phone input with US country code"
              code={
                <CodeBlock language="jsx">
{`<PhoneInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="123 456 7890"
  countryCode="+1"
/>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <PhoneInput
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  placeholder="123 456 7890"
                />
              </div>
            </ComponentDemo>
          </div>
        );

      case 'alert':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Alert</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Alerts display important messages to users. They come in different variants 
                to communicate different types of information.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="alert" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, alert: theme }))}
            />

            <ComponentDemo
              title="Variants"
              description="Different alert types"
              code={
                <CodeBlock language="jsx">
{`<Alert variant="error">Error message</Alert>
<Alert variant="success">Success message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="info">Info message</Alert>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md space-y-3">
                <Alert variant="error" className={`${componentThemes.alert?.borderRadius || ''} ${componentThemes.alert?.error || 'alert-error-custom'}`}>This is an error alert message</Alert>
                <Alert variant="success" className={`${componentThemes.alert?.borderRadius || ''} ${componentThemes.alert?.success || 'alert-success-custom'}`}>This is a success alert message</Alert>
                <Alert variant="warning" className={`${componentThemes.alert?.borderRadius || ''} ${componentThemes.alert?.warning || 'alert-warning-custom'}`}>This is a warning alert message</Alert>
                <Alert variant="info" className={`${componentThemes.alert?.borderRadius || ''} ${componentThemes.alert?.info || 'alert-info-custom'}`}>This is an info alert message</Alert>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'badge':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Badge</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Badges are used to display status, counts, or labels. 
                They're small, non-interactive elements that provide context.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="badge" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, badge: theme }))}
            />

            <ComponentDemo
              title="Variants"
              description="Different badge styles"
              code={
                <CodeBlock language="jsx">
{`<Badge 
  variant="primary"
  className="${componentThemes.badge?.borderRadius || 'rounded'} ${componentThemes.badge?.primary || 'badge-primary-custom'}"
>
  Primary
</Badge>
<Badge variant="default" className="${componentThemes.badge?.borderRadius || 'rounded'}">Default</Badge>
<Badge variant="success" className="${componentThemes.badge?.borderRadius || 'rounded'}">Success</Badge>
<Badge variant="warning" className="${componentThemes.badge?.borderRadius || 'rounded'}">Warning</Badge>
<Badge variant="error" className="${componentThemes.badge?.borderRadius || 'rounded'}">Error</Badge>
<Badge variant="info" className="${componentThemes.badge?.borderRadius || 'rounded'}">Info</Badge>`}
                </CodeBlock>
              }
            >
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className={componentThemes.badge?.borderRadius || ''}>Default</Badge>
                <Badge variant="primary" className={`${componentThemes.badge?.borderRadius || ''} ${componentThemes.badge?.primary || ''}`.trim()}>Primary</Badge>
                <Badge variant="success" className={componentThemes.badge?.borderRadius || ''}>Success</Badge>
                <Badge variant="warning" className={componentThemes.badge?.borderRadius || ''}>Warning</Badge>
                <Badge variant="error" className={componentThemes.badge?.borderRadius || ''}>Error</Badge>
                <Badge variant="info" className={componentThemes.badge?.borderRadius || ''}>Info</Badge>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'toast':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Toast</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Toast notifications provide temporary feedback to users. 
                They appear at the top-right corner and automatically dismiss after a few seconds.
              </p>
            </div>

            <ComponentDemo
              title="Variants"
              description="Different toast types"
              code={
                <CodeBlock language="jsx">
{`<Toast
  message="Operation completed successfully!"
  type="success"
  isVisible={visible}
  onClose={() => setVisible(false)}
/>`}
                </CodeBlock>
              }
            >
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => showToast('success')}>Show Success</Button>
                <Button onClick={() => showToast('error')}>Show Error</Button>
                <Button onClick={() => showToast('warning')}>Show Warning</Button>
              </div>
            </ComponentDemo>
            <Toast
              message={toastType === 'success' ? 'Operation completed successfully!' : 
                      toastType === 'error' ? 'An error occurred. Please try again.' :
                      'Please review your input.'}
              type={toastType}
              isVisible={toastVisible}
              onClose={() => setToastVisible(false)}
            />
          </div>
        );

      case 'spinner':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Spinner</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Spinners indicate that content is loading. Use them to provide feedback 
                during async operations.
              </p>
            </div>

            <ComponentDemo
              title="Sizes"
              description="Different spinner sizes"
              code={
                <CodeBlock language="jsx">
{`<Spinner size="small" />
<Spinner size="medium" />
<Spinner size="large" />`}
                </CodeBlock>
              }
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Spinner size="small" />
                  <p className="text-xs text-[#4e4e4e] mt-2">Small</p>
                </div>
                <div className="text-center">
                  <Spinner size="medium" />
                  <p className="text-xs text-[#4e4e4e] mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <Spinner size="large" />
                  <p className="text-xs text-[#4e4e4e] mt-2">Large</p>
                </div>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Progress</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Progress bars indicate the completion status of a task. 
                They provide visual feedback for long-running operations.
              </p>
            </div>

            <ComponentDemo
              title="Basic Usage"
              description="Progress bar with percentage"
              code={
                <CodeBlock language="jsx">
{`<ProgressBar progress={65} />
<ProgressBar progress={85} variant="success" />
<ProgressBar progress={45} showLabel />`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-[#4e4e4e] mb-2">
                    <span>Default</span>
                    <span>65%</span>
                  </div>
                  <ProgressBar progress={65} />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-[#4e4e4e] mb-2">
                    <span>Success</span>
                    <span>85%</span>
                  </div>
                  <ProgressBar progress={85} variant="success" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-[#4e4e4e] mb-2">
                    <span>With Label</span>
                    <span>45%</span>
                  </div>
                  <ProgressBar progress={45} showLabel />
                </div>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'modal':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Modal</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Modals are dialog boxes that appear on top of the main content. 
                They're used for confirmations, forms, and important information.
              </p>
            </div>

            <ComponentDemo
              title="Basic Usage"
              description="Simple modal with header, content, and actions"
              code={
                <CodeBlock language="jsx">
{`<Modal isOpen={open} onClose={() => setOpen(false)}>
  <Modal.Header title="Example Modal" onClose={() => setOpen(false)} />
  <Modal.Content>
    <p>Modal content goes here</p>
  </Modal.Content>
  <Modal.Actions>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
  </Modal.Actions>
</Modal>`}
                </CodeBlock>
              }
            >
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            </ComponentDemo>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              <Modal.Header title="Example Modal" onClose={() => setModalOpen(false)} />
              <Modal.Content>
                <p className="text-[#4e4e4e]">This is a modal dialog example. You can add any content here.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
              </Modal.Actions>
            </Modal>
          </div>
        );

      case 'tooltip':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Tooltip</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Tooltips display additional information when users hover over elements. 
                They're perfect for providing context without cluttering the interface.
              </p>
            </div>

            <ComponentDemo
              title="Positions"
              description="Tooltips can appear in different positions"
              code={
                <CodeBlock language="jsx">
{`<Tooltip content="Tooltip text" position="top">
  <Button>Hover me</Button>
</Tooltip>`}
                </CodeBlock>
              }
            >
              <div className="flex flex-wrap gap-4">
                <Tooltip content="This is a tooltip on top" position="top">
                  <Button>Hover Top</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip on bottom" position="bottom">
                  <Button>Hover Bottom</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip on left" position="left">
                  <Button>Hover Left</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip on right" position="right">
                  <Button>Hover Right</Button>
                </Tooltip>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Card</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Cards are containers for displaying related content. 
                They provide structure and visual hierarchy to your layouts.
              </p>
            </div>

            <ComponentCustomizer 
              componentType="card" 
              onThemeChange={(theme) => setComponentThemes(prev => ({ ...prev, card: theme }))}
            />

            <ComponentDemo
              title="Basic Usage"
              description="Simple card with content"
              code={
                <CodeBlock language="jsx">
{`<Card 
  variant="default" 
  className="p-6 ${componentThemes.card?.borderRadius || 'rounded-lg'} ${componentThemes.card?.border || 'border-[#e5e7eb]'} ${componentThemes.card?.bg || 'bg-white'} ${componentThemes.card?.shadow || 'shadow-sm'} ${componentThemes.card?.custom || 'card-custom'}"
>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`}
                </CodeBlock>
              }
            >
              <div className="grid md:grid-cols-3 gap-4 w-full max-w-4xl">
                <Card 
                  variant="default" 
                  className={`p-6 ${componentThemes.card?.borderRadius || ''} ${componentThemes.card?.border || ''} ${componentThemes.card?.bg || ''} ${componentThemes.card?.shadow || ''} ${componentThemes.card?.custom || ''}`}
                >
                  <h3 className="text-lg font-semibold mb-2">Default Card</h3>
                  <p className="text-sm text-[#4e4e4e]">This is a default card with standard styling.</p>
                </Card>
                <Card 
                  variant="default" 
                  className={`p-6 ${componentThemes.card?.borderRadius || ''} ${componentThemes.card?.border || ''} ${componentThemes.card?.bg || ''} ${componentThemes.card?.shadow || ''} ${componentThemes.card?.custom || ''}`}
                >
                  <h3 className="text-lg font-semibold mb-2">Card with Content</h3>
                  <p className="text-sm text-[#4e4e4e]">Cards can contain any content you need.</p>
                </Card>
                <Card 
                  variant="default" 
                  className={`p-6 ${componentThemes.card?.borderRadius || ''} ${componentThemes.card?.border || ''} ${componentThemes.card?.bg || ''} ${componentThemes.card?.shadow || ''} ${componentThemes.card?.custom || ''}`}
                >
                  <h3 className="text-lg font-semibold mb-2">Another Card</h3>
                  <p className="text-sm text-[#4e4e4e]">Multiple cards can be displayed in a grid.</p>
                </Card>
              </div>
            </ComponentDemo>
          </div>
        );

      case 'divider':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Divider</h1>
              <p className="text-lg text-[#4e4e4e] leading-relaxed mb-6">
                Dividers separate content into distinct sections. 
                They provide visual separation and improve readability.
              </p>
            </div>

            <ComponentDemo
              title="Basic Usage"
              description="Horizontal divider"
              code={
                <CodeBlock language="jsx">
{`<div>
  <p>Content above</p>
  <Divider />
  <p>Content below</p>
</div>`}
                </CodeBlock>
              }
            >
              <div className="w-full max-w-md">
                <p className="text-[#1b1b1b] mb-4">Content above the divider</p>
                <Divider />
                <p className="text-[#1b1b1b] mt-4">Content below the divider</p>
              </div>
            </ComponentDemo>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="text-4xl font-bold text-[#1b1b1b] mb-4">Component Not Found</h1>
            <p className="text-lg text-[#4e4e4e]">Please select a component from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f9f9fb] overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-[#e0e0e6] overflow-y-auto flex-shrink-0 transition-all duration-300`}>
        <div className="p-4 border-b border-[#e0e0e6]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-[#1b1b1b]">RAY UI</h1>
              <p className="text-sm text-[#4e4e4e] mt-1">Component Library</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-[#f9f9fb] rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Button
            variant="outline"
            size="small"
            className="w-full"
            onClick={() => setCustomizerOpen(true)}
          >
            🎨 Customize Theme
          </Button>
        </div>
        {sidebarOpen && (
          <nav className="p-4">
            {componentCategories.map((category) => (
              <div key={category.title} className="mb-6">
                <h2 className="text-xs font-semibold text-[#4e4e4e] uppercase tracking-wider mb-2 px-2">
                  {category.title}
                </h2>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveComponent(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                          activeComponent === item.id
                            ? 'bg-[#0069c2] text-white font-medium shadow-sm'
                            : 'text-[#1b1b1b] hover:bg-[#f9f9fb]'
                        }`}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {renderComponent()}
        </div>
      </main>

      {/* Floating Customize Button */}
      <button
        onClick={() => setCustomizerOpen(true)}
        className="fixed bottom-6 right-6 bg-[#0069c2] text-white p-4 rounded-full shadow-xl hover:bg-[#005a9e] transition-all hover:scale-110 z-50"
        title="Customize Theme"
        style={{ borderRadius: '50%' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
        </svg>
      </button>

      {/* Theme Customizer Modal */}
      <ThemeCustomizer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        onApply={(theme) => {
          console.log('Theme applied:', theme);
        }}
      />
    </div>
  );
};

export default Showcase;
