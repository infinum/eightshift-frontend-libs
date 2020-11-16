export class Accordion {
	constructor(options) {
		this.accordion = options.accordion;
		this.accordionSelector = options.accordionSelector;

		this.triggerSelector = `${options.accordionSelector}-trigger`;
		this.panelSelector = `${options.accordionSelector}-panel`;

		this.trigger = this.accordion.querySelectorAll(this.triggerSelector);
		
		this.ATTR_HIDDEN = 'aria-hidden';
		this.ATTR_OPEN = 'data-accordion-open';
		this.ATTR_PREVENT_CLOSE = 'data-accordion-prevent-close';
	}

	init() {
		[...this.trigger].forEach((item) => {
			item.addEventListener('click', () => {
				this.toggleOpen(item.parentNode);
			});
		});
	}

	toggleOpen(item) {
		const panel = item.querySelector(this.panelSelector);

		if (this.isOpen(item)) {
			this.close(item, panel);
		} else {
			this.open(item, panel);
		}
	}

	closeAll(item) {
		const parents = item.parentNode.querySelectorAll(this.accordion);
		const panels = item.parentNode.querySelectorAll(this.panelSelector);

		[...parents].forEach((parent) => {
			parent.setAttribute(this.ATTR_OPEN, 'false');
		});

		[...panels].forEach((panel) => {
			panel.setAttribute(this.ATTR_HIDDEN, 'true');
		});
	}

	isOpen(item) {
		return item.getAttribute(this.ATTR_OPEN) === 'true';
	}

	close(item, panel) {
		item.setAttribute(this.ATTR_OPEN, 'false');
		panel.setAttribute(this.ATTR_HIDDEN, 'true');
	}

	open(item, panel) {
		item.setAttribute(this.ATTR_OPEN, 'true');
		panel.setAttribute(this.ATTR_HIDDEN, 'false');
	}

}
