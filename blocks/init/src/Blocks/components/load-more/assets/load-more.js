export class LoadMore {
	constructor(options) {
		// All trigger elements.
		this.triggerElements = options.triggerElements;

		// Ajax.
		this.restUrl = options.restUrl;

		// Get classes.
		this.CLASS_IS_HIDDEN = 'is-hidden';
		this.CLASS_IS_LOADING = 'is-loading';

		// Get attrs.
		this.ATTR_PER_PAGE_OVERRIDE = 'data-load-more-per-page-override';
		this.ATTR_INITIAL_ITEMS = 'data-load-more-initial-items';
		this.ATTR_QUERY = 'data-load-more-query';
		this.ATTR_TYPE = 'data-load-more-type';
		this.ATTR_ID = 'data-load-more-id';

		// Get query var.
		this.QUERY_VAR = 'load-more-page';

		// Set internal store.
		this.data = {};
	}

	/**
	 * Store return object by ID.
	 *
	 * @param {string} id Trigger unique ID.
	 *
	 * @returns {object} Object of data based on the ID.
	 */
	getData(id) {
		return this.data[id];
	}

	/**
	 * Set top level initial store.
	 *
	 * @param {string} id Trigger unique ID.
	 * @param {object} value Object of data to store.
	 */
	setDataTop(id, value) {
		this.data = {
			...this.data,
			[id]: value,
		};
	}

	/**
	 * Set store by ID and parent object key.
	 *
	 * @param {string} id Trigger unique ID.
	 * @param {string} parent Key name in the object.
	 * @param {mixed} value Value stored to the key in the object.
	 */
	setData(id, parent, value) {
		this.data[id] = {
			...this.data[id],
			[parent]: value,
		};
	}

	/**
	 * Init all event-listeners.
	 */
	init() {
		// Loop all triggers.
		[...this.triggerElements].forEach((trigger) => {

			// Get trigger ID.
			const id = trigger.getAttribute(this.ATTR_ID);

			// Prepare data.
			this.prepareData(trigger, id);

			// Get container.
			const container = document.querySelector(`[${this.ATTR_ID}="${id}"]`);

			// Fetch data from url param.
			this.fetchDataFromUrl(trigger, id, container);

			// Set store to prevent corrections after initial load.
			this.setData(id, 'urlLoadMoreAction', false);

			// Add listener on trigger click.
			trigger.addEventListener('click', (event) => {
				event.preventDefault();

				// Prevent clicking on the button until loading state is active.
				if (!event.target.classList.contains(this.CLASS_IS_LOADING)) {
					// Fetch new data.
					this.fetchData(trigger, id, container);
				}
			});
		});
	}

	/**
	 * Check per page details.
	 *
	 * @param {object} trigger Element for trigger.
	 * @param {string} id Trigger unique ID.
	 *
	 * @returns {void}
	 */
	prepareData = (trigger, id) => {
		const initialItems = trigger.getAttribute(this.ATTR_INITIAL_ITEMS);
		const query = trigger.getAttribute(this.ATTR_QUERY);
		const type = trigger.getAttribute(this.ATTR_TYPE);
		const perPageOverride = trigger.getAttribute(this.ATTR_PER_PAGE_OVERRIDE);

		// Set store top level.
		this.setDataTop(id, {
			query,
			initialItems,
			id,
			type,
			perPageOverride,
			urlLoadMoreAction: false,
			preventAction: false,
		});
	};

	/**
	 * Fetch new data.
	 *
	 * @param {object} trigger Element for trigger.
	 * @param {string} id Trigger unique ID.
	 * @param {object} container Element for container.
	 *
	 * @returns {void}
	 */
	fetchData = (trigger, id, container) => {

		// Get data from store.
		const data = this.getData(id);

		// Bailout if there are no more actions.
		if (data.preventAction) {
			return;
		}

		// Prepare body data.
		const body = {
			method: 'GET',
			mode: 'same-origin',
			headers: {
				Accept: 'application/json',
			},
			credentials: 'same-origin',
			redirect: 'follow',
			referrer: 'no-referrer',
		};

		// Loader.
		this.showLoader(container);

		const params = new URLSearchParams(data).toString();

		// Fetch data from ajax.
		fetch(`${this.restUrl}?${params}`, body)
			.then((response) => response.json())
			.then((response) => {
				if (response.success) {
					// Get response data.
					const {
						currentPage,
						query,
						maxPages,
						body,
					} = response.data;

					// Append new content to DOM.
					container.insertAdjacentHTML('beforeend', body);

					// Update store with new data.
					this.setData(id, 'query', query);
					this.setData(id, 'currentPage', currentPage);

					// Update attribute on trigger.
					trigger.setAttribute(this.ATTR_QUERY, query);

					// Update url with new current page.
					this.setUrlQuery(currentPage);

					// Remove trigger if there is no more items to get.
					if (currentPage >= maxPages || maxPages === 0 || currentPage === 0) {
						// Prevent any more interactions.
						this.setData(id, 'preventAction', true);

						// Remove trigger.
						this.removeTrigger(trigger);
					}
				} else {
					// Prevent any more interactions.
					this.setData(id, 'preventAction', true);

					// Remove trigger.
					this.removeTrigger(trigger);
				}

				// Remove loader.
				this.removeLoader(container);
			});
	};

	/**
	 * Set and fetch data via url.
	 *
	 * @param {object} trigger Element for trigger.
	 * @param {string} id Trigger unique ID.
	 * @param {object} container Element for container.
	 */
	fetchDataFromUrl = (trigger, id, container) => {
		// Get query var from url.
		let urlPerPage = this.getUrlQuery(this.QUERY_VAR);

		// Bailout if var is wrong.
		if (urlPerPage === null || typeof urlPerPage !== 'string' || !this.isNumeric(urlPerPage)) {
			return;
		}

		// Convert to integer.
		urlPerPage = parseInt(urlPerPage, 10);

		// Bailout if page is to small to load.
		if (urlPerPage < 1) {
			return;
		}

		// Update the store with new data.
		this.setData(id, 'currentPage', urlPerPage);
		this.setData(id, 'urlLoadMoreAction', true);

		// Fetch new data.
		this.fetchData(trigger, id, container);
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

	/**
	 * Check if string is numeric.
	 *
	 * @param {string} value String to check.
	 *
	 * @returns 
	 */
	isNumeric(value) {
		return /^-?\d+$/.test(value);
	}

	/**
	 * Set url with new query.
	 *
	 * @param {string} value Value to update.
	 */
	setUrlQuery(value) {
		if (window.history.replaceState) {
			const params = new URLSearchParams(window.location.search);
			params.set(this.QUERY_VAR, value);

			window.history.replaceState({}, '', `${location.pathname}?${params}`);
		}
	}

	/**
	 * Get url query var.
	 *
	 * @param {string} value String to find.
	 */
	getUrlQuery(value) {
		const params = new URLSearchParams(window.location.search);

		return params.get(value);
	}
}
