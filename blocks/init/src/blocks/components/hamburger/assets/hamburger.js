import { getNavigatorVibrate } from './navigator';

const CLASS_IS_OPEN = 'menu-is-open';
const CLASS_NO_SCROLL = 'u-no-scroll';
const selector = '.js-hamburger';
const hamburger = document.querySelector(selector);
const overlay = document.querySelector(`.${hamburger.getAttribute('data-overlay')}`);

export const preventScroll = () => {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.classList.add(CLASS_NO_SCROLL);
};

export const enableScroll = () => {
  const scrollY = document.body.style.top;
  document.body.classList.remove(CLASS_NO_SCROLL);
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
};

export const openMobileMenu = () => {
  document.body.classList.add(CLASS_IS_OPEN);
  preventScroll();
};

export const closeMobileMenu = () => {
  document.body.classList.remove(CLASS_IS_OPEN);
  enableScroll();
};

export const hamburgerInit = () => {
  hamburger.addEventListener('click', () => {
    navigator.vibrate = getNavigatorVibrate();

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    if (document.body.classList.contains(CLASS_IS_OPEN)) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
};

export const closeMobileMenuOnOverlayClick = () => {
  overlay.addEventListener('click', () => {
    closeMobileMenu();
  });
};
