export class Drawer {
	constructor({ drawerElement }) {
		this.drawerElement = drawerElement;
		this.CLASS_MENU_OPEN = 'is-menu-open';
		this.CLASS_OVERLAY_IS_SHOWING = 'page-overlay-shown';
		this.CLASS_NO_SCROLL = 'u-no-scroll';

		const overlaySelector = drawerElement?.dataset?.overlay;
		const triggerSelector = drawerElement?.dataset?.trigger;

		if (overlaySelector) {
			this.overlay = document.querySelector(`.${overlaySelector}`);
		}

		if (triggerSelector) {
			this.trigger = document.querySelector(`.${triggerSelector}`);
		}
	}
	
	preventScroll() {
		document.body.classList.add(this.CLASS_NO_SCROLL);
	}
	
	enableScroll() {
		document.body.classList.remove(this.CLASS_NO_SCROLL);
	}
	
	openMobileMenu() {
		if (this.overlay) {
			document.body.classList.add(this.CLASS_OVERLAY_IS_SHOWING);
			this.trigger?.classList.add(this.CLASS_MENU_OPEN);
		}

		document.body.classList.add(this.CLASS_MENU_OPEN);
		this.preventScroll();
	}
	
	closeMobileMenu() {
		if (this.overlay) {
			document.body.classList.remove(this.CLASS_OVERLAY_IS_SHOWING);
			this.trigger?.classList.remove(this.CLASS_MENU_OPEN);
		}

		document.body.classList.remove(this.CLASS_MENU_OPEN);
		this.enableScroll();
	}
	
	closeMobileMenuOnOverlayClick() {
		this.overlay?.addEventListener('click', () => this.closeMobileMenu());
	}

	init() {
		this.trigger.addEventListener('click', () => {
			if (document.body.classList.contains(this.CLASS_MENU_OPEN)) {
				this.closeMobileMenu();
			} else {
				this.openMobileMenu();
			}
		});

		this.closeMobileMenuOnOverlayClick();
	}
}
