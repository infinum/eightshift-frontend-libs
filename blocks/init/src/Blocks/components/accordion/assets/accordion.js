export class Accordion {
	constructor(options) {
		this.accordion = options.accordion;
		this.accordionSelector = options.accordionSelector;
		this.triggerSelector = options.triggerSelector;
		this.panelSelector = options.panelSelector;
		this.panelElement = options.accordion.querySelector(options.panelSelector);

		this.trigger = this.accordion.querySelectorAll(this.triggerSelector);

		// Initialize max-height in case accordion is open by default.
		this.panelElement?.style?.setProperty('--max-height', `${this.panelElement.scrollHeight}px`);
	}

	init() {
		[...this.trigger].forEach((item) => {
			item.addEventListener('click', () => this.toggleOpen(item.parentNode));
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

	closeAdjacent(item) {
		// Get the main wrapper.
		const parent = item?.parentElement?.parentElement?.parentElement;

		if (!parent) {
			return;
		}

		// Traverse the DOM and collapse adjacent accordions.
		let prev = parent.previousElementSibling;
		let next = parent.nextElementSibling;

		while(prev && prev?.querySelector(this.accordionSelector)) {
			const prevItem = prev?.querySelector(this.accordionSelector);
			const prevPanel = prev?.querySelector(this.panelSelector);
			this.close(prevItem, prevPanel);
			prev = prev.previousElementSibling;
		}

		while(next && next?.querySelector(this.accordionSelector)) {
			const nextItem = next?.querySelector(this.accordionSelector);
			const nextPanel = next?.querySelector(this.panelSelector);
			this.close(nextItem, nextPanel);
			next = next.nextElementSibling;
		}
	}

	isOpen = (item) => item.dataset.accordionOpen === 'true';

	close(item, panel) {
		if (!item || !panel) {
			return;
		}

		item.dataset.accordionOpen = false;
		item.querySelector(this.triggerSelector)?.setAttribute('aria-expanded', 'false');
		panel.setAttribute('aria-hidden', 'true');
	}

	open(item, panel) {
		if (!item || !panel) {
			return;
		}

		panel.style.setProperty('--max-height', `${panel.scrollHeight}px`);
		item.dataset.accordionOpen = true;
		item.querySelector(this.triggerSelector)?.setAttribute('aria-expanded', 'true');
		panel.setAttribute('aria-hidden', 'false');

		if (item.dataset.closeOthers === 'true') {
			this.closeAdjacent(item);
		}
	}
}
