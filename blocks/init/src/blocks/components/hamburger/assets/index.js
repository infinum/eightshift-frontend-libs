document.addEventListener('DOMContentLoaded', () => {
  const hamburgerSelector = '.js-hamburger';
  const hamburgerElem = document.querySelector(hamburgerSelector);

  if (hamburgerElem) {
    import('./hamburger').then(({ Hamburger }) => {
      const hamburger = new Hamburger();
      hamburger.hamburgerInit();
      hamburger.closeMobileMenuOnOverlayClick();
    });
  }
}, false);
