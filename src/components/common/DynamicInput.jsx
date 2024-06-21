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
        className={`p2-reg peer h-12 w-full rounded-md border bg-[#ededed] bg-opacity-60 font-NotoSansKR  px-4 py-3 text-[15px] placeholder:text-[#242424]  disabled:text-gray-300 ${
          isFocused ? 'border-mainBlue' : ''
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
