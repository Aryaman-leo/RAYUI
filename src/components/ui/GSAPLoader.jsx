import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './GSAPLoader.css';

const GSAPLoader = ({ 
  type = 'spinner', 
  size = 'medium', 
  color = '#4318FF', 
  text = '', 
  duration = 2,
  showText = true,
  className = '',
  onComplete = null 
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const tl = gsap.timeline({ repeat: -1 });

    // Clean up previous animations
    gsap.set(container, { clearProps: "all" });

    switch (type) {
      case 'spinner':
        animateSpinner(tl, container, color, duration);
        break;
      case 'dots':
        animateDots(tl, container, color, duration);
        break;
      case 'pulse':
        animatePulse(tl, container, color, duration);
        break;
      case 'wave':
        animateWave(tl, container, color, duration);
        break;
      case 'gear':
        animateGear(tl, container, color, duration);
        break;
      case 'ripple':
        animateRipple(tl, container, color, duration);
        break;
      case 'bounce':
        animateBounce(tl, container, color, duration);
        break;
      case 'neural':
        animateNeural(tl, container, color, duration);
        break;
      case 'dataflow':
        animateDataFlow(tl, container, color, duration);
        break;
      case 'brain':
        animateBrain(tl, container, color, duration);
        break;
      case 'matrix':
        animateMatrix(tl, container, color, duration);
        break;
      case 'quantum':
        animateQuantum(tl, container, color, duration);
        break;
      case 'dna':
        animateDNA(tl, container, color, duration);
        break;
      case 'particles':
        animateParticles(tl, container, color, duration);
        break;
      case 'fractal':
        animateFractal(tl, container, color, duration);
        break;
      default:
        animateSpinner(tl, container, color, duration);
    }

    return () => {
      tl.kill();
    };
  }, [type, color, duration]);

  const animateSpinner = (tl, container, color, duration) => {
    const spinner = container.querySelector('.spinner');
    if (!spinner) return;

    tl.to(spinner, {
      rotation: 360,
      duration: duration,
      ease: "none"
    });
  };

  const animateDots = (tl, container, color, duration) => {
    const dots = container.querySelectorAll('.dot');
    if (!dots.length) return;

    dots.forEach((dot, index) => {
      tl.to(dot, {
        y: -20,
        opacity: 0.3,
        duration: duration / 3,
        ease: "power2.out",
        delay: index * 0.1
      }, index * 0.1);
    });
  };

  const animatePulse = (tl, container, color, duration) => {
    const pulse = container.querySelector('.pulse');
    if (!pulse) return;

    tl.to(pulse, {
      scale: 1.2,
      opacity: 0.5,
      duration: duration / 2,
      ease: "power2.inOut"
    }).to(pulse, {
      scale: 1,
      opacity: 1,
      duration: duration / 2,
      ease: "power2.inOut"
    });
  };

  const animateWave = (tl, container, color, duration) => {
    const bars = container.querySelectorAll('.wave-bar');
    if (!bars.length) return;

    bars.forEach((bar, index) => {
      tl.to(bar, {
        scaleY: 0.3,
        duration: duration / 4,
        ease: "power2.inOut",
        delay: index * 0.1
      }, index * 0.1);
    });
  };

  const animateGear = (tl, container, color, duration) => {
    const gear = container.querySelector('.gear');
    if (!gear) return;

    tl.to(gear, {
      rotation: 360,
      duration: duration,
      ease: "none"
    });
  };

  const animateRipple = (tl, container, color, duration) => {
    const ripples = container.querySelectorAll('.ripple');
    if (!ripples.length) return;

    ripples.forEach((ripple, index) => {
      tl.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: duration,
        ease: "power2.out",
        delay: index * 0.3
      }, index * 0.3);
    });
  };

  const animateBounce = (tl, container, color, duration) => {
    const ball = container.querySelector('.bounce-ball');
    if (!ball) return;

    tl.to(ball, {
      y: -30,
      duration: duration / 2,
      ease: "power2.out"
    }).to(ball, {
      y: 0,
      duration: duration / 2,
      ease: "bounce.out"
    });
  };

  // New AI-themed animations
  const animateNeural = (tl, container, color, duration) => {
    const nodes = container.querySelectorAll('.neural-node');
    const connections = container.querySelectorAll('.neural-connection');
    
    if (!nodes.length) return;

    // Animate nodes with pulsing effect
    nodes.forEach((node, index) => {
      tl.to(node, {
        scale: 1.3,
        opacity: 0.8,
        duration: duration / 4,
        ease: "power2.inOut",
        delay: index * 0.2
      }, index * 0.2);
    });

    // Animate connections with flowing effect
    connections.forEach((connection, index) => {
      tl.to(connection, {
        strokeDashoffset: -20,
        duration: duration / 2,
        ease: "none",
        delay: index * 0.1
      }, index * 0.1);
    });
  };

  const animateDataFlow = (tl, container, color, duration) => {
    const dataBits = container.querySelectorAll('.data-bit');
    if (!dataBits.length) return;

    dataBits.forEach((bit, index) => {
      tl.to(bit, {
        x: 60,
        opacity: 0,
        duration: duration / 3,
        ease: "power2.out",
        delay: index * 0.1
      }, index * 0.1);
    });
  };

  const animateBrain = (tl, container, color, duration) => {
    const brainWaves = container.querySelectorAll('.brain-wave');
    if (!brainWaves.length) return;

    brainWaves.forEach((wave, index) => {
      tl.to(wave, {
        scaleY: 0.3,
        duration: duration / 6,
        ease: "power2.inOut",
        delay: index * 0.1
      }, index * 0.1);
    });
  };

  const animateMatrix = (tl, container, color, duration) => {
    const matrixChars = container.querySelectorAll('.matrix-char');
    if (!matrixChars.length) return;

    matrixChars.forEach((char, index) => {
      tl.to(char, {
        opacity: 1,
        y: 20,
        duration: duration / 4,
        ease: "power2.out",
        delay: index * 0.05
      }, index * 0.05);
    });
  };

  const animateQuantum = (tl, container, color, duration) => {
    const quantumOrbs = container.querySelectorAll('.quantum-orb');
    if (!quantumOrbs.length) return;

    quantumOrbs.forEach((orb, index) => {
      tl.to(orb, {
        rotation: 360,
        scale: 1.5,
        opacity: 0.7,
        duration: duration / 2,
        ease: "power2.inOut",
        delay: index * 0.3
      }, index * 0.3);
    });
  };

  const animateDNA = (tl, container, color, duration) => {
    const dnaStrands = container.querySelectorAll('.dna-strand');
    if (!dnaStrands.length) return;

    dnaStrands.forEach((strand, index) => {
      tl.to(strand, {
        rotation: 180,
        duration: duration,
        ease: "power2.inOut",
        delay: index * 0.2
      }, index * 0.2);
    });
  };

  const animateParticles = (tl, container, color, duration) => {
    const particles = container.querySelectorAll('.particle');
    if (!particles.length) return;

    particles.forEach((particle, index) => {
      const angle = (index / particles.length) * 360;
      const radius = 30;
      const x = Math.cos(angle * Math.PI / 180) * radius;
      const y = Math.sin(angle * Math.PI / 180) * radius;

      tl.to(particle, {
        x: x,
        y: y,
        opacity: 0.8,
        duration: duration / 2,
        ease: "power2.out",
        delay: index * 0.1
      }, index * 0.1);
    });
  };

  const animateFractal = (tl, container, color, duration) => {
    const fractalLevels = container.querySelectorAll('.fractal-level');
    if (!fractalLevels.length) return;

    fractalLevels.forEach((level, index) => {
      tl.to(level, {
        rotation: 90,
        scale: 0.8,
        duration: duration / 3,
        ease: "power2.inOut",
        delay: index * 0.2
      }, index * 0.2);
    });
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'loader-small';
      case 'large': return 'loader-large';
      case 'xlarge': return 'loader-xlarge';
      default: return 'loader-medium';
    }
  };

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="spinner-container">
            <div className="spinner" style={{ borderColor: color }}></div>
          </div>
        );
      
      case 'dots':
        return (
          <div className="dots-container">
            {[0, 1, 2].map((i) => (
              <div key={i} className="dot" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <div className="pulse-container">
            <div className="pulse" style={{ backgroundColor: color }}></div>
          </div>
        );
      
      case 'wave':
        return (
          <div className="wave-container">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="wave-bar" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );
      
      case 'gear':
        return (
          <div className="gear-container">
            <svg className="gear" width="40" height="40" viewBox="0 0 40 40">
              <path
                d="M20 4l-2.5 2.5-3.5-1.5-1.5 3.5L10 10l-2.5 2.5 1.5 3.5-1.5 3.5L10 20l2.5 2.5 1.5 3.5 3.5-1.5L20 26l2.5-2.5 3.5 1.5 1.5-3.5L30 20l2.5-2.5-1.5-3.5 1.5-3.5L30 10l-2.5-2.5-1.5-3.5-3.5 1.5L20 4z"
                fill={color}
              />
            </svg>
          </div>
        );
      
      case 'ripple':
        return (
          <div className="ripple-container">
            <div className="ripple-center" style={{ backgroundColor: color }}></div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="ripple" style={{ borderColor: color }}></div>
            ))}
          </div>
        );
      
      case 'bounce':
        return (
          <div className="bounce-container">
            <div className="bounce-ball" style={{ backgroundColor: color }}></div>
          </div>
        );

      case 'neural':
        return (
          <div className="neural-container">
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Neural network nodes */}
              <circle className="neural-node" cx="15" cy="15" r="3" fill={color} opacity="0.6" />
              <circle className="neural-node" cx="45" cy="15" r="3" fill={color} opacity="0.6" />
              <circle className="neural-node" cx="30" cy="30" r="3" fill={color} opacity="0.6" />
              <circle className="neural-node" cx="15" cy="45" r="3" fill={color} opacity="0.6" />
              <circle className="neural-node" cx="45" cy="45" r="3" fill={color} opacity="0.6" />
              
              {/* Connections */}
              <line className="neural-connection" x1="15" y1="15" x2="30" y2="30" stroke={color} strokeWidth="1" strokeDasharray="5,5" />
              <line className="neural-connection" x1="45" y1="15" x2="30" y2="30" stroke={color} strokeWidth="1" strokeDasharray="5,5" />
              <line className="neural-connection" x1="30" y1="30" x2="15" y2="45" stroke={color} strokeWidth="1" strokeDasharray="5,5" />
              <line className="neural-connection" x1="30" y1="30" x2="45" y2="45" stroke={color} strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </div>
        );

      case 'dataflow':
        return (
          <div className="dataflow-container">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="data-bit" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );

      case 'brain':
        return (
          <div className="brain-container">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="brain-wave" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );

      case 'matrix':
        return (
          <div className="matrix-container">
            {['0', '1', '0', '1', '1', '0', '1', '0', '1'].map((char, i) => (
              <div key={i} className="matrix-char" style={{ color: color }}>{char}</div>
            ))}
          </div>
        );

      case 'quantum':
        return (
          <div className="quantum-container">
            {[0, 1, 2].map((i) => (
              <div key={i} className="quantum-orb" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );

      case 'dna':
        return (
          <div className="dna-container">
            <svg width="40" height="60" viewBox="0 0 40 60">
              <path className="dna-strand" d="M10 10 Q20 20 10 30 Q20 40 10 50" stroke={color} strokeWidth="2" fill="none" />
              <path className="dna-strand" d="M30 10 Q20 20 30 30 Q20 40 30 50" stroke={color} strokeWidth="2" fill="none" />
              <line x1="10" y1="20" x2="30" y2="20" stroke={color} strokeWidth="1" />
              <line x1="10" y1="40" x2="30" y2="40" stroke={color} strokeWidth="1" />
            </svg>
          </div>
        );

      case 'particles':
        return (
          <div className="particles-container">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="particle" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );

      case 'fractal':
        return (
          <div className="fractal-container">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="fractal-level" style={{ borderColor: color }}></div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="spinner-container">
            <div className="spinner" style={{ borderColor: color }}></div>
          </div>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`gsap-loader ${getSizeClass()} ${className}`}
    >
      {renderLoader()}
      {showText && text && (
        <div className="loader-text" style={{ color }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default GSAPLoader; 