import React from 'react';

export default function FormInput({ label, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13 }}>{label}</label>}
      <input
        {...props}
        style={{
          padding: 10,
          borderRadius: 6,
          border: '1px solid #cfcfcf',
          fontSize: 15,
        }}
      />
    </div>
  );
}
