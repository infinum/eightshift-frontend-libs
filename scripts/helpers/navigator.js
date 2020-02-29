export const getNavigatorVibrate = () => {
  return navigator.vibrate ||
  navigator.webkitVibrate ||
  navigator.mozVibrate ||
  navigator.msVibrate;
};
