document.addEventListener('DOMContentLoaded', () => {
  const drawerSelector = '.js-drawer';
  const drawerElem = document.querySelector(drawerSelector);

  if (drawerElem) {
    import('./drawer').then(({ Drawer }) => {
      const drawer = new Drawer();
      drawer.drawerInit();
    });
  }
}, false);
