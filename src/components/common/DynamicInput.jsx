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
    <div className="relative h-[3.125rem] w-[17.75rem]">
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        className={`p2-reg peer w-full rounded-md border bg-white  px-4 py-3 placeholder:text-gray-400 disabled:border-mainBlue-300 disabled:text-gray-300 ${
          isFocused ? 'border-mainBlue' : ''
        }`}
        required
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor={type}
        className={`peer-placeholder-shown:p2-reg 
        peer-focus:caption-reg caption-reg 
         peer-focus:text-mainborder-mainBlue pointer-events-none absolute -top-3 left-4 z-[1] bg-white px-1 py-0.5 transition-all duration-200 ease-in-out peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:bg-white peer-focus:py-0.5 ${
           isFocused ? 'text-mainborder-mainBlue' : 'text-gray-400'
         }`}
      >
        {placeholder}
      </label>
    </div>
  );
}

export default DynamicInput;
