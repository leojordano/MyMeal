import React, { useRef, useState } from 'react';

import './style.scss';

interface ITextInput {
  label: string;
  validation: (value: string) => boolean;
  value: string;
  setValue: (value: string) => void;
  type?: string;
}

const TextInput: React.FC<ITextInput> = ({
  label,
  validation,
  setValue,
  value,
  type
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const validadeInput = () => {
    let isValid = false;
    if (inputRef.current) {
      const target = inputRef.current;
      const parent = inputRef.current.parentElement;
      const isValid = validation(target.value);

      if (!isValid) {
        if (parent) {
          parent.classList.add('invalid');
        }
      } else {
        if (parent) {
          parent.classList.remove('invalid');
        }
      }

      setValue(target.value);
    }
    return isValid;
  };

  const checkFloatLabel = (): boolean => {
    let isFloat = false;

    if (inputFocus) {
      isFloat = true;
    }

    if (inputRef.current) {
      if (inputRef.current.value !== '' || inputRef.current.value.length > 0) {
        isFloat = true;
      }
    }

    return isFloat;
  };

  return (
    <label className={`textInput ${checkFloatLabel() && 'inFocus'}`}>
      <p>{label}</p>
      <input
        type={type}
        ref={inputRef}
        value={value}
        onChange={validadeInput}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
    </label>
  );
};

export default TextInput;
