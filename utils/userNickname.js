export const userNickName = (nickname) => {
  const regex = /^(.*shibaDog\d{0,4}).*/;
  const match = nickname.match(regex);
  const name = match ? match[1] : nickname.replace(/^\d{0,4}/, '').slice(0, 12);
  return name;
};
