import { useState } from 'react';
import GSAPLoader from './GSAPLoader';
import './LoaderDemo.css';

const LoaderDemo = () => {
  const [selectedType, setSelectedType] = useState('spinner');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('#4318FF');
  const [customText, setCustomText] = useState('Loading...');
  const [showText, setShowText] = useState(true);
  const [duration, setDuration] = useState(2);

  const loaderTypes = [
    { value: 'spinner', label: 'Spinner' },
    { value: 'dots', label: 'Dots' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'wave', label: 'Wave' },
    { value: 'gear', label: 'Gear' },
    { value: 'ripple', label: 'Ripple' },
    { value: 'bounce', label: 'Bounce' }
  ];

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' }
  ];

  const colors = [
    { value: '#4318FF', label: 'Primary Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Yellow' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#06B6D4', label: 'Cyan' }
  ];

  return (
    <div className="loader-demo">
      <div className="demo-header">
        <h1>GSAP Loader Demo</h1>
        <p>Universal GSAP-powered loading animations for your React application</p>
      </div>

      <div className="demo-controls">
        <div className="control-group">
          <label>Loader Type:</label>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="control-select"
          >
            {loaderTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Size:</label>
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
            className="control-select"
          >
            {sizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Color:</label>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            className="control-select"
          >
            {colors.map(color => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Duration (seconds):</label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="control-range"
          />
          <span className="duration-value">{duration}s</span>
        </div>

        <div className="control-group">
          <label>Text:</label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="control-input"
            placeholder="Enter loading text..."
          />
        </div>

        <div className="control-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showText}
              onChange={(e) => setShowText(e.target.checked)}
              className="control-checkbox"
            />
            Show Text
          </label>
        </div>
      </div>

      <div className="demo-preview">
        <div className="preview-container">
          <GSAPLoader
            type={selectedType}
            size={selectedSize}
            color={selectedColor}
            text={customText}
            duration={duration}
            showText={showText}
            className="demo-loader"
          />
        </div>
      </div>

      <div className="demo-examples">
        <h2>All Loader Types</h2>
        <div className="examples-grid">
          {loaderTypes.map(type => (
            <div key={type.value} className="example-item">
              <h3>{type.label}</h3>
              <GSAPLoader
                type={type.value}
                size="medium"
                color="#4318FF"
                text={type.label}
                duration={2}
                showText={true}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="demo-code">
        <h2>Usage Example</h2>
        <pre className="code-block">
{`import GSAPLoader from './components/ui/GSAPLoader';

// Basic usage
<GSAPLoader type="spinner" />

// With custom props
<GSAPLoader
  type="${selectedType}"
  size="${selectedSize}"
  color="${selectedColor}"
  text="${customText}"
  duration={${duration}}
  showText={${showText}}
  className="custom-loader"
/>`}
        </pre>
      </div>

      <div className="demo-props">
        <h2>Props Reference</h2>
        <div className="props-table">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>type</td>
                <td>string</td>
                <td>'spinner'</td>
                <td>Loader animation type: spinner, dots, pulse, wave, gear, ripple, bounce</td>
              </tr>
              <tr>
                <td>size</td>
                <td>string</td>
                <td>'medium'</td>
                <td>Loader size: small, medium, large, xlarge</td>
              </tr>
              <tr>
                <td>color</td>
                <td>string</td>
                <td>'#4318FF'</td>
                <td>Color of the loader animation</td>
              </tr>
              <tr>
                <td>text</td>
                <td>string</td>
                <td>''</td>
                <td>Text to display below the loader</td>
              </tr>
              <tr>
                <td>duration</td>
                <td>number</td>
                <td>2</td>
                <td>Animation duration in seconds</td>
              </tr>
              <tr>
                <td>showText</td>
                <td>boolean</td>
                <td>true</td>
                <td>Whether to show the text below the loader</td>
              </tr>
              <tr>
                <td>className</td>
                <td>string</td>
                <td>''</td>
                <td>Additional CSS classes</td>
              </tr>
              <tr>
                <td>onComplete</td>
                <td>function</td>
                <td>null</td>
                <td>Callback function when animation completes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoaderDemo; 