import React from 'react';

export default function Button({ children, onClick, style = {}, ...rest }) {
  return (
    <button
      onClick={onClick}
      {...rest}
      style={{
        padding: '10px 14px',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#2563eb',
        color: '#fff',
        fontWeight: 600,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
