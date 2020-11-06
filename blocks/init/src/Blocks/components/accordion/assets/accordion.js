export class Accordion {
	constructor(options) {
		this.accordion = options.accordion;
		this.accordionSelector = options.accordionSelector;

		this.parentSelector = `${options.accordionSelector}-parent`;
		this.triggerSelector = `${options.accordionSelector}-trigger`;
		this.panelSelector = `${options.accordionSelector}-panel`;

		this.trigger = this.accordion.querySelectorAll(this.triggerSelector);
		
		this.ATTR_HIDDEN = 'aria-hidden';
		this.ATTR_OPENED = 'data-accordion-opened';
		this.ATTR_PREVENT_CLOSE = 'data-accordion-prevent-close';
	}

	init() {
		[...this.trigger].forEach((item) => {
			item.addEventListener('click', () => {
				this.toggleOpened(item.parentNode);
			});
		});
	}

	toggleOpened(item) {
		const panel = item.querySelector(this.panelSelector);

		if (this.isOpened(item)) {
			this.close(item, panel);
		} else {
			this.open(item, panel);
		}
	}

	closeAll(item) {
		const parents = item.parentNode.querySelectorAll(this.parentSelector);
		const panels = item.parentNode.querySelectorAll(this.panelSelector);

		[...parents].forEach((parent) => {
			parent.setAttribute(this.ATTR_OPENED, 'false');
		});

		[...panels].forEach((panel) => {
			panel.setAttribute(this.ATTR_HIDDEN, 'true');
		});
	}

	isOpened(item) {
		return item.getAttribute(this.ATTR_OPENED) === 'true';
	}

	close(item, panel) {
		item.setAttribute(this.ATTR_OPENED, 'false');
		panel.setAttribute(this.ATTR_HIDDEN, 'true');
	}

	open(item, panel) {
		item.setAttribute(this.ATTR_OPENED, 'true');
		panel.setAttribute(this.ATTR_HIDDEN, 'false');
	}

}
