import { unescapeHTML } from '../helpers/text-helpers';
import apiFetch from '@wordpress/api-fetch';

/**
 * Returns the fetch callback function for getting data from WP API.
 *
 * @param {string} endpoint     Endpoint to fetch from (usually post type or taxonomy).
 * @param {object} [options={}] Additional options for fine tunning.
 *
 * @param {function} processId              Function that allows custom id processing.
 * @param {function} processLabel           Function that allows custom select option label processing.
 * @param {function} processMetadata        Function that allows modifying output data (e.g. for adding metadata for grouping inside a CustomSelect).
 * @param {integer}  [perPage=30]           Define max perPage items to fetch.
 * @param {string}   [routePrefix='wp/v2']  Define if using custom or native WP routes.
 * @param {object}   [additionalParam={}]   Define additional query params to fetch.
 * @param {string}   [cacheTime='86400000'] Define amount of time the cache is stored in seconds. Default 1 day
 * @param {fields}   [fields='id,title']    Fields to return for optimised response.
 *
 * @access public
 *
 * @returns Callback function that can be passed to CustomSelect loadOptions
 *
 * Usage:
 * ```js
 * getFetchFunction('posts', { processLabel: ({ title: { rendered: renderedTitle } }) => unescapeHTML(renderedTitle) });
 * getFetchFunction('posts', { fields="id,title,type", processMetadata: ({ type }) => type });
 * getFetchFunction('categories', { fields: 'id,name' });
 * ```
 *
 * Output:
 * ```js
 * API Data object.
 * ```
 */
export function getFetchWpApi(endpoint, options = {}) {
	const {
		processId = ({ id }) => id,
		processLabel = ({ name }) => unescapeHTML(name),
		processMetadata = () => null,
		perPage = 30,
		routePrefix = 'wp/v2',
		additionalParam = {},
		cacheTime = '86400000', // One day.
		fields = 'id,title',
	} = options;

	/**
	 * Fetch all items based on the selected endpoint and search term.
	 *
	 * @param {string} searchText Text to search against
	 *
	 * @returns Array of items in { label: '', value: '' } format.
	 */
	const fetchItems = async (searchText = '') => {
		let params = {
			per_page: perPage,
		};

		// Add fields in the params for optimisations.
		if (fields?.length) {
			params['_fields'] = fields;
		}

		// Merge additional params to props.
		if (additionalParam?.length) {
			params = {
				...params,
				...additionalParam
			};
		}

		// Fetch fresh if you are searching something.
		if (searchText?.length) {
			params['search'] = searchText;

			const newData = await apiFetch({ path: getRoute(endpoint, params, routePrefix) });

			return await new Promise((resolve) => resolve([...newData].map((item) => {
				return {
					label: processLabel(item),
					value: processId(item),
					metadata: processMetadata(item),
				};
			})));
		}

		// Get the item from localStorage cache.
		let cachedItem = JSON.parse(window.localStorage.getItem(`es-cache-${endpoint}`));

		// If the item doesn't exist in cache, is older than 1 day (86400000 = one day) or doesn't have any data, do a fresh fetch
		if (!cachedItem || cachedItem?.time < (Date.now() - parseInt(cacheTime)) || !cachedItem?.data?.length) {
			const newData = await apiFetch({ path: getRoute(endpoint, params, routePrefix) });

			cachedItem = {
				time: Date.now(),
				data: [...newData].map((item) => {
					return {
						label: processLabel(item),
						value: processId(item),
						metadata: processMetadata(item),
					};
				}),
			};

			// Store data to local storage.
			window.localStorage.setItem(`es-cache-${endpoint}`, JSON.stringify(cachedItem));
		}

		return await new Promise((resolve) => resolve(cachedItem.data));
	};

	return fetchItems;
}

//---------------------------------------------------------------
// Private methods

/**
 * Create valid url for fetching.
 *
 * @param {string} endpoint Main endpoint to fetch.
 * @param {object} params Additional search params.
 * @param {string} routePrefix Route prefix for endpoint.
 *
 * @access private
 *
 * @returns API valid url.
 */
export const getRoute = (endpoint, params = {}, routePrefix) => {
	const url = new URL(`${window.location.origin}/${routePrefix}/${endpoint}/`);

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.append(key, value);
	}

	return `${url.pathname}${url.search}`;
};
