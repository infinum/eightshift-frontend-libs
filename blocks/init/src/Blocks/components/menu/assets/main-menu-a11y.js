export class AccessibleMenu {
	constructor(options) {
		this.menuSelector = options.menuSelector;
		this.anchor = options.anchor;
		this.subMenu = options.subMenu;

		this.mainMenu = document.querySelector(this.menuSelector);
		this.links = this.mainMenu.querySelectorAll(this.anchor);

		this.IS_FOCUSED_CLASS = 'is-focused';
	}

	addClassName(el, cls) {
		if (!el.className.match(`(?:^|\\s)${cls}(?!\\S)`)) {
			el.className += ` ${cls}`;
		}
	}

	hasClassName(el, cls) {
		return !!el.className.match(`(?:^|\\s)${cls}(?!\\S)`);
	}

	delClassName(el, cls) {
		el.className = el.className.replace(new RegExp(`(?:^|\\s)${cls}(?!\\S)`), '');
	}

	tabCloseMenu() {
		const navActive = this.mainMenu.querySelectorAll(`.${this.IS_FOCUSED_CLASS}`);

		for (let i = 0; i < navActive.length; i++) {
			this.delClassName(navActive[i], this.IS_FOCUSED_CLASS);
			navActive[i].querySelector(this.anchor).setAttribute('aria-expanded', 'false');
		}
	}

	addAriaExpanded(element) {
		element.setAttribute('aria-expanded', 'true');
	}

	toggleMenus(event) {
		const currentElement = event.target;
		const parentEl = currentElement.parentElement;
		const insideSubMenu = currentElement.closest(this.subMenu);
		const containsSubMenu = parentEl.querySelector(this.subMenu);

		/*
		If link contains a submenu we need to focus it,
		if we are inside a submenu, we need to focus the parent list item.
		Current implementation will work for level 2 submenus.
		*/
		if (containsSubMenu) {
			this.addClassName(parentEl, this.IS_FOCUSED_CLASS);
			this.addAriaExpanded(parentEl.querySelector(this.anchor));
		}

		if (insideSubMenu) {
			const subMenuParent = insideSubMenu.parentElement;

			this.addClassName(subMenuParent, this.IS_FOCUSED_CLASS);
			this.addAriaExpanded(subMenuParent.querySelector(this.anchor));

			const insideSubSubMenu = insideSubMenu.parentElement.closest(this.subMenu);

			if (insideSubSubMenu) {
				const subSubMenuParent = insideSubSubMenu.parentElement;

				this.addClassName(subSubMenuParent, this.IS_FOCUSED_CLASS);
				this.addAriaExpanded(subSubMenuParent.querySelector(this.anchor));
			}
		}

		// Previous main menu list element (top parent).
		const prevLi = parentEl.previousElementSibling;

		if (prevLi && this.hasClassName(prevLi, this.IS_FOCUSED_CLASS)) {
			this.delClassName(prevLi, this.IS_FOCUSED_CLASS);

			prevLi.querySelectorAll(this.anchor).forEach((anchor) => {
				anchor.setAttribute('aria-expanded', 'false');
			});
		}

		// Next main menu list element (top parent). When going backwards.
		const nextLi = parentEl.nextElementSibling;

		if (nextLi && this.hasClassName(nextLi, this.IS_FOCUSED_CLASS)) {
			this.delClassName(nextLi, this.IS_FOCUSED_CLASS);

			nextLi.querySelectorAll(this.anchor).forEach((anchor) => {
				anchor.setAttribute('aria-expanded', 'false');
			});
		}
	}

	init() {
		this.mainMenu.addEventListener('blur', () => this.tabCloseMenu());
		this.mainMenu.addEventListener('mouseleave', setTimeout(() => this.tabCloseMenu(), 500));

		this.links[this.links.length - 1].addEventListener('blur', () => this.tabCloseMenu());
		this.links[0].addEventListener('blur', () => this.tabCloseMenu());

		for (let i = 0; i < this.links.length; i++) {

			// When hovered on links with aria-expanded, expand them.
			this.links[i].addEventListener('mouseenter', (event) => this.toggleMenus(event));
			this.links[i].addEventListener('focus', (event) => this.toggleMenus(event));
		}
	}
}
