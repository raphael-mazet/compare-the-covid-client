import React from "react";
import "./index.style.scss";

type option = {
  id?: string;
  value: string;
  option: string;
};

interface propTypes {
  label: string;
  required?: boolean;
  onChange: (e: any) => void;
  value?: string;
  error?: string;
  inLineLabel?: boolean;
  options: option[];
  hasDefaultValue?: boolean;
  placeholder?: string;
}

const SelectInput = (props: propTypes): JSX.Element => {
  const {
    label,
    required,
    onChange,
    value,
    error,
    inLineLabel,
    options,
    hasDefaultValue,
    placeholder,
  } = props;

  const inLineClass: string = inLineLabel ? "inLine" : "";
  const errorClass: string = error ? "error" : "";

  const optionItems = options.map((option) => (
    <option key={option.id || option.value} value={option.value}>
      {option.option}
    </option>
  ));

  if (hasDefaultValue) {
    optionItems.unshift(
      <option key="default" value="default">
        {placeholder}
      </option>
    );
  }

  return (
    <div className={["inputSt", inLineClass].join(" ")}>
      {label && (
        <span className="label">
          {label}
          {required ? <span style={{ color: "red" }}>*</span> : null}:
        </span>
      )}
      <select className={errorClass} value={value} onChange={onChange}>
        {optionItems}
      </select>
      {error && <span className="errorText">{error}</span>}
    </div>
  );
};

export default SelectInput;
