/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

interface InputProps{
  type: string;
  name: string;
  placeholder: string;
  handleChange: any;
}

interface SubmitProps{
  name: string;
  handleSubmit: any;
}
const InputForm = ({type, name, placeholder, handleChange}:InputProps) => (
  <div className="row">
    <label>
      Your
      {type}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);

const SubmitButton = ({handleSubmit, name}:SubmitProps) => (
  <div className="row">
    <button
      onClick={handleSubmit}
    >
      {name}
    </button>
  </div>
);

export { InputForm, SubmitButton };
