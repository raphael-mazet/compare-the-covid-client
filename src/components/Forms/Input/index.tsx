import React from 'react';
import './index.style.scss';

type propTypes = {
  label: string;
  required: boolean;
  value: string;
  onChange: () => any;
  inLineLabel: boolean;
  id: string;
  autoComplete: string;
  error: string;
}

const Input = (props: propTypes): JSX.Element => {
  const {
    label,
    required,
    value,
    onChange,
    inLineLabel,
    id,
    autoComplete,
    error
  } = props;

  const inLineClass: string = inLineLabel ? "inLine" : "";
  const errorClass: string = error ? "error" : "";
  return (
    <div className={["inputSt", inLineClass].join(" ")}>
      {label && 
        <span className="label">
          {label}
          {required
            ? <span style={{ color: 'red' }}>*</span>
            : null
          }:
        </span>
      }
      <input className={errorClass} value={value} onChange={onChange} />
      {error &&
        <span className='errorText'>{error}</span>
      }
    </div>
  );
};

export default Input;