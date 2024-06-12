import { useState } from 'react';

const validateRules = [
  {
    type: 'email',
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '이메일 형식이 올바르지 않습니다.'
  },
  {
    type: 'password',
    regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: '비밀번호는 숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.'
  },
  {
    type: 'passwordCheck',
    message: '비밀번호가 일치하지 않습니다.'
  }
];

function useInputValidator(initialValue, type) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);

    // 유효성 검사
    validateRules.forEach((rule) => {
      if (rule.type === type) {
        if (rule.regex) {
          const isValid = rule.regex.test(value);
          setIsValid(isValid);
        } else {
          setIsValid(value === initialValue);
        }
      }
    });
  };

  return [value, isValid, handleChange];
}

export default useInputValidator;
