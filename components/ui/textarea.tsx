// components/ui/textarea.tsx
import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: Props) => {
  return (
    <textarea
      style={{
        width: '100%',
        padding: '0.5em',
        border: '1px solid #ccc',
        borderRadius: '6px',
      }}
      {...props}
    />
  );
};
