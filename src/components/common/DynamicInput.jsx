import { useState } from 'react';

function DynamicInput({ type, value, onChange, placeholder }) {
  const [isFocused, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <div className="h-14 w-[20.625rem]">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`p2-reg peer h-12 w-full rounded-md border bg-[#d5d5d5] bg-opacity-60  px-4 py-3 text-[20px] placeholder:text-[#303030]  disabled:text-gray-300 ${
          isFocused ? 'border-yel' : ''
        }`}
        required
        autoComplete="off"
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default DynamicInput;
