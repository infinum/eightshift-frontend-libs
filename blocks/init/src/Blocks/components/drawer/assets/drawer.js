export class Drawer {
	constructor({ drawerElement }) {
		this.drawerElement = drawerElement;
		this.CLASS_MENU_OPEN = 'is-menu-open';
		this.CLASS_NO_SCROLL = 'u-no-scroll';

		const triggerSelector = drawerElement?.dataset?.trigger;

		if (triggerSelector) {
			this.trigger = document.querySelector(`.${triggerSelector}`);
		}

		this.supportsHasSelector = CSS.supports('selector(:has(*))');
	}

	init() {
		this.trigger.addEventListener('click', () => {
			const expanded = this.drawerElement.getAttribute('aria-expanded');

			this.trigger.disabled = true;

			if (expanded === 'true') {
				const closeAnimation = this.drawerElement.animate([
					{ gridTemplateRows: '1fr' },
					{ gridTemplateRows: '0fr' }
				], {
					duration: 300,
					easing: 'cubic-bezier(0.36, 0, 0.66, -0.56)', // ease-in-back
					fill: 'both',
				});

				closeAnimation.onfinish = () => {
					this.drawerElement.setAttribute('aria-expanded', false);
					this.trigger.disabled = false;

					if (!this.supportsHasSelector) {
						this.trigger?.classList.remove(this.CLASS_MENU_OPEN);
						document.body.classList.remove(this.CLASS_MENU_OPEN);

						// Enable scroll.
						document.body.classList.remove(this.CLASS_NO_SCROLL);
					}

				};
			} else {
				this.drawerElement.setAttribute('aria-expanded', true);

				const enterAnimation = this.drawerElement.animate([
					{ gridTemplateRows: '0fr' },
					{ gridTemplateRows: '1fr' }
				], {
					duration: 500,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // ease-out-back
					fill: 'both',
				});

				enterAnimation.onfinish = () => {
					this.trigger.disabled = false;

					if (!this.supportsHasSelector) {
						this.trigger?.classList.add(this.CLASS_MENU_OPEN);
						document.body.classList.add(this.CLASS_MENU_OPEN);

						// Prevent scroll.
						document.body.classList.add(this.CLASS_NO_SCROLL);
					}
				};
			}
		});
	}

}
