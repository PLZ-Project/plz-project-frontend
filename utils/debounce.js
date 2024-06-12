const debounce = (cb, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export default debounce;
