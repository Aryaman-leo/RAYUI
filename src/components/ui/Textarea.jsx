import React from 'react';
import './Textarea.css';

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  const classes = [
    'textarea',
    error ? 'textarea-error' : '',
    className,
  ].filter(Boolean).join(' ');

  return <textarea className={classes} ref={ref} {...props} />;
});

Textarea.displayName = 'Textarea';

export default Textarea; 