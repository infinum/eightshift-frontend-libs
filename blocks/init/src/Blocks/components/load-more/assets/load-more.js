export class LoadMore {
	constructor(options) {
		this.container = options.container;
		this.trigger = options.trigger;
		this.loader = options.loader;
		this.IS_HIDDEN = 'is-hidden';
		this.IS_LOADING = 'is-loading';

		// Load params that don't change.
		this.attrPage = 2;

		this.id = this.trigger.getAttribute('data-load-more-id');
		this.container = document.querySelector(`[data-load-more-id="${this.id}"]`);

		// Create an url from params.
		this.route = new URL(this.trigger.getAttribute('data-load-more-route'));
	}

	init() {
		this.trigger.addEventListener('click', (event) => {
			event.preventDefault();

			console.log(this.route.searchParams.get('page'));
			

			// This param changes every click.
			this.attrPage = parseInt(this.route.searchParams.get('page'), 10);

			this.fetchData(this.route.href, this.container);
		});
	}

	fetchData = (route, container) => {
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

		this.showLoader();

		fetch(route, body)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (response.data.status === 200) {
					container.insertAdjacentHTML('beforeend', response.data.body);

					this.route.searchParams.set('page', this.attrPage + 1);
					this.trigger.setAttribute('data-load-more-route', this.route.href);

					if (response.headers['X-WP-TotalPages'] === this.attrPage) {
						this.removeTrigger();
					}
				} else {
					this.removeTrigger();
				}

				this.removeLoader();

			});
	};

	showLoader() {
		this.container.classList.add(this.IS_LOADING);
	}

	removeLoader() {
		setTimeout(() => {
			this.container.classList.remove(this.IS_LOADING);
		}, 500);
	}

	removeTrigger() {
		this.trigger.classList.add(this.IS_HIDDEN);
	}
}
