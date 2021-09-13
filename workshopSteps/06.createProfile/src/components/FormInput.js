// BEGIN: code we are writing in this step
import React from 'react';

export default function FormInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input"
        id={id}
        placeholder={label}
        required
        autoComplete="off"
      />
    </div>
  );
}
// END: code we are writing in this step
