import { getNavigatorVibrate } from 'EightshiftBlocksUtilityHelpersPath/navigator';

export class Hamburger {
  constructor(
    selector = '.js-hamburger',
    CLASS_IS_OPEN = 'menu-is-open',
    CLASS_NO_SCROLL = 'u-no-scroll'
  ) {
    this.CLASS_IS_OPEN = CLASS_IS_OPEN;
    this.CLASS_NO_SCROLL = CLASS_NO_SCROLL;
    this.hamburger = document.querySelector(selector);
    this.overlay = document.querySelector(`.${this.hamburger.getAttribute('data-overlay')}`);
  }
  
  preventScroll() {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add(this.CLASS_NO_SCROLL);
  }
  
  enableScroll() {
    const scrollY = document.body.style.top;
    document.body.classList.remove(this.CLASS_NO_SCROLL);
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }
  
  openMobileMenu() {
    document.body.classList.add(this.CLASS_IS_OPEN);
    this.preventScroll();
  }
  
  closeMobileMenu() {
    document.body.classList.remove(this.CLASS_IS_OPEN);
    this.enableScroll();
  }
  
  hamburgerInit() {
    this.hamburger.addEventListener('click', () => {
      navigator.vibrate = getNavigatorVibrate();
  
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
  
      if (document.body.classList.contains(this.CLASS_IS_OPEN)) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });
  }
  
  closeMobileMenuOnOverlayClick() {
    this.overlay.addEventListener('click', () => {
      this.closeMobileMenu();
    });
  }
}
