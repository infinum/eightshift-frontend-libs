export class Accordion {
	constructor({
		containerElement,
		accordionItems,
		triggerSelector,
		panelSelector,
		itemSelector,
	}) {
		this.containerElement = containerElement;
		this.accordionItems = accordionItems;
		this.triggerSelector = triggerSelector;
		this.panelSelector = panelSelector;
		this.itemSelector = itemSelector;
	}

	init = () => {
		this.accordionItems.forEach((item) => {
			const trigger = item.querySelector(this.triggerSelector);
			const panel = item.querySelector(this.panelSelector);

			// Initialize max-height in case accordion is open by default.
			panel?.style?.setProperty('--max-height', `${panel?.scrollHeight ?? 10000}px`);

			trigger.addEventListener('click', this.toggleOpen);
		});
	};

	toggleOpen = ({ target }) => {
		const item = target.parentElement;

		if (item.dataset.open === 'true') {
			this.close(item);
		} else {
			this.open(item);
		}
	};

	close = (item) => {
		if (!item) {
			return;
		}

		if (item?.dataset?.open === 'false') {
			return;
		}

		const panel = item.querySelector(this.panelSelector);

		item.dataset.open = 'false';
		item.querySelector(this.triggerSelector)?.setAttribute('aria-expanded', 'false');
		panel.setAttribute('aria-hidden', 'true');
	};

	open = (item) => {
		if (!item) {
			return;
		}

		if (item?.dataset?.open === 'true') {
			return;
		}

		const panel = item.querySelector(this.panelSelector);

		if (this.containerElement.dataset.closeAdjacent === 'true') {
			this.accordionItems.forEach((el) => this.close(el));
		}

		panel.style.setProperty('--max-height', `${panel.scrollHeight}px`);

		item.dataset.open = 'true';

		item.querySelector(this.triggerSelector)?.setAttribute('aria-expanded', 'true');

		panel.setAttribute('aria-hidden', 'false');
	};
}
