export class LoadMore {
	constructor(options) {
		// All trigger elements.
		this.triggerElements = options.triggerElements;

		// Simple selectors.
		this.container = options.container;
		this.loader = options.loader;

		// Ajax.
		this.ajaxHandler = options.ajaxHandler;
		this.ajaxUrl = options.ajaxUrl;

		// Get classes.
		this.CLASS_IS_HIDDEN = 'is-hidden';
		this.CLASS_IS_LOADING = 'is-loading';

		// Get attrs.
		this.ATTR_COUNT = 'data-load-more-count';
		this.ATTR_TYPE = 'data-load-more-type';
		this.ATTR_QUERY = 'data-load-more-query';
		this.ATTR_ID = 'data-load-more-id';
	}

	/**
	 * Init all event-listeners.
	 */
	init() {
		// Loop all triggers.
		[...this.triggerElements].forEach((trigger) => {

			// Prepare params.
			this.id = trigger.getAttribute(this.ATTR_ID);
			this.container = document.querySelector(`[${this.ATTR_ID}="${this.id}"]`);

			// Add listener on trigger click.
			trigger.addEventListener('click', (event) => {
				event.preventDefault();

				// Prevent clicking on the button until loading state is active.
				if (!event.target.classList.contains(this.CLASS_IS_LOADING)) {

					// Prepare data.
					const data = {
						action: this.ajaxHandler,
						type: trigger.getAttribute(this.ATTR_TYPE),
						query: trigger.getAttribute(this.ATTR_QUERY),
						count: parseInt(trigger.getAttribute(this.ATTR_COUNT), 10),
					};

					// Fetch new data.
					this.fetchData(
						trigger,
						data,
						this.container
					);
				}
			});
		});
	}

	/**
	 * Prepare form data for fetch.
	 *
	 * @param {object} dataItems Object to build data.
	 * @returns 
	 */
	getFormData = (dataItems) => {
		const data = new FormData();

		Object.entries(dataItems).forEach(([key, value]) => data.append(key, value));

		return data;
	}

	/**
	 * Fetch new data.
	 *
	 * @param {object} trigger Element for trigger.
	 * @param {object} data Data object.
	 * @param {object} container Element for container.
	 */
	fetchData = (trigger, data, container) => {
		const body = {
			method: 'POST',
			mode: 'same-origin',
			headers: {
				Accept: 'application/json',
			},
			credentials: 'same-origin',
			redirect: 'follow',
			referrer: 'no-referrer',
			body: this.getFormData(data),
		};

		this.showLoader(container);

		fetch(this.ajaxUrl, body)
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					container.insertAdjacentHTML('beforeend', response.data.body);

					trigger.setAttribute(this.ATTR_COUNT, data.count + 1);

					if (response.data.maxCount === response.data.currentCount) {
						this.removeTrigger(trigger);
					}
				} else {
					this.removeTrigger(trigger);
				}

				this.removeLoader(container);

			});
	};

	/**
	 * Add container loading class.
	 *
	 * @param {object} container Element for container.
	 */
	showLoader(container) {
		container.classList.add(this.CLASS_IS_LOADING);
	}

	/**
	 * Remove container loading class.
	 *
	 * @param {object} container Element for container.
	 */
	removeLoader(container) {
		setTimeout(() => {
			container.classList.remove(this.CLASS_IS_LOADING);
		}, 500);
	}

	/**
	 * Add trigger hidden class.
	 *
	 * @param {object} trigger Element for trigger.
	 */
	removeTrigger(trigger) {
		trigger.classList.add(this.CLASS_IS_HIDDEN);
	}
}
