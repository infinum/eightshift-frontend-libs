import { debounce } from '@eightshift/frontend-libs/scripts/helpers/debounce';

export class Drawer {
	constructor({ drawerElement }) {
		this.drawerElement = drawerElement;
		this.CLASS_MENU_OPEN = 'is-menu-open';
		this.CLASS_NO_SCROLL = 'u-no-scroll';

		const triggerSelector = drawerElement?.dataset?.trigger;

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
		this.trigger?.classList.add(this.CLASS_MENU_OPEN);
		this.drawerElement.style.display = 'block';

		const addClass = debounce(() => document.body.classList.add(this.CLASS_MENU_OPEN), 300);
		addClass();

		this.preventScroll();
	}
	
	closeMobileMenu() {
		this.trigger?.classList.remove(this.CLASS_MENU_OPEN);
		document.body.classList.remove(this.CLASS_MENU_OPEN);

		const setDisplayNone = debounce(() => this.drawerElement.style.display = 'none', 300);
		setDisplayNone();

		this.enableScroll();
	}
	
	init() {
		this.trigger.addEventListener('click', () => {
			if (this.trigger?.classList.contains(this.CLASS_MENU_OPEN)) {
				this.closeMobileMenu();
			} else {
				this.openMobileMenu();
			}
		});
	}

}
