import { truncate, unescapeHTML } from '@eightshift/ui-components/utilities';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

/**
 * Returns the fetch callback function for getting data from WP API.
 *
 * @typedef {'post_title'|'post_content'|'post_excerpt'} SearchParam
 *
 * @param {string} endpoint     Endpoint to fetch from (usually post type or taxonomy).
 * @param {object} [options={}] Additional options for fine tunning.
 *
 * @param {function} options.processId                        Function that allows custom id processing.
 * @param {function} options.processLabel                     Function that allows custom select option label processing.
 * @param {function} options.processMetadata                  Function that allows modifying output data (e.g. for adding metadata for grouping inside a CustomSelect).
 * @param {integer}  [options.perPage=30]                     Define max perPage items to fetch.
 * @param {string}   [options.routePrefix='wp/v2']            Define if using custom or native WP routes.
 * @param {object}   [options.additionalParam={}]             Define additional query params to fetch.
 * @param {string}   [options.cacheTime='86400000']           Define amount of time the cache is stored in seconds. Default 1 day
 * @param {fields}   [options.fields='id,title']              Fields to return for optimized response.
 * @param {fields}   [options.noCache=false]                  If `true`, bypasses cache when fetching items.
 * @param {SearchParam|SearchParam[]} [options.searchColumns] If passed, allows specifying the search scope.
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
		processLabel = ({ title }) => unescapeHTML(title),
		processMetadata = () => null,
		perPage = 30,
		routePrefix = 'wp/v2',
		additionalParam = {},
		cacheTime = '86400000', // One day.
		fields = 'id,title',
		noCache = false,
		searchColumns,
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
			...additionalParam,
		};

		// Add fields in the params for optimisations.
		if (fields?.length > 0) {
			params['_fields'] = fields;
		}

		if (searchColumns?.length > 0) {
			params['search_columns'] = Array.isArray(searchColumns) ? searchColumns.join(',') : searchColumns;
		}

		// Fetch fresh if you are searching something.
		if (searchText?.length > 0) {
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

		if (noCache) {
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
		if (!cachedItem || cachedItem?.time < (Date.now() - parseInt(cacheTime)) || !cachedItem?.data?.length > 0) {
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

/**
 * Create valid url for fetching.
 *
 * @param {string} endpoint Main endpoint to fetch.
 * @param {object} params Additional search params.
 * @param {string} routePrefix Route prefix for endpoint.
 *
 * @returns API valid url.
 */
 const getRoute = (endpoint, params = {}, routePrefix) => {
	const url = new URL(`${window.location.origin}/${routePrefix}/${endpoint}/`);

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.append(key, value);
	}

	return `${url.pathname}${url.search}`;
};

/**
 * Returns a function that fetches data from WordPress REST API.
 *
 * @param {string} endpoint - Endpoint to fetch from.
 * @param {Object} options - Additional options.
 * @param {Function} [options.processId] - Function to process the ID. `(itemData: Object) => id: string | Number`
 * @param {Function} [options.processLabel] - Function to process the label. `(itemData: Object) => label: string`
 * @param {string} [options.labelProp='title'] - Property to use as a label. Overriden by `processLabel`.
 * @param {Function} [options.processMetadata] - Function to process the metadata. `(itemData: Object) => metadata: Object`
 * @param {number} [options.perPage=30] - Number of items to fetch per page.
 * @param {string} [options.routePrefix='wp/v2'] - Route prefix for the API.
 * @param {string} [options.fields='id,title'] - A comma-separated list of field names to fetch from the API. Good to include as it makes the query faster and the output terser.
 * @param {SearchColumnsConfig} [options.searchColumns] - Allows narrowing the search scope.
 * @param {boolean} [options.noUnescapeTitle] - If `true`, the post title will not unescape HTML entities.
 * @param {Number?} [options.truncateTitle=32] - If set, the title will be truncated to this length.
 *
 * @returns {Function} The `(searchText, [abortSignal]) => Promise` function.
 *
 * @typedef {'post_title' | 'post_excerpt' | 'post_content'} SearchColumnsConfig
 *
 * @example
 * const fetchFn = getFetchWpApi('pages');
 * const data = await fetchFn('search text');
 * const json = await data.json();
 *
 * console.log(json);
 *
 * @example
 * <LinkInput
 *  value={buttonUrl}
 *  onChange={({url}) => setAttributes({ [getAttrKey('buttonUrl', attributes, manifest)]: url })}
 *  fetchSuggestions={getFetchWpApi('search')}
 * />
 *
 */
export function fetchFromWpRest(endpoint, options = {}) {
	const {
		processId = ({ id }) => id,
		labelProp = 'title',
		processLabel = (item) => item[labelProp],
		processMetadata = () => null,
		perPage = 30,
		routePrefix = 'wp/v2',
		fields = 'id,title',
		searchColumns,
		noUnescapeTitle = false,
		truncateTitle = 32,
		...additionalParams
	} = options;

	return async (searchText = '', abortSignal) => {
		let params = {
			per_page: perPage,
		};

		if (fields?.length > 0) {
			params['_fields'] = fields;
		}

		if (searchColumns?.length > 0) {
			params.search_columns = Array.isArray(searchColumns) ? searchColumns.join(',') : searchColumns;
		}

		if (Object.keys(params).length > 0) {
			params = {
				...params,
				...additionalParams,
			};
		}

		if (searchText?.length > 0) {
			params.search = searchText;
		}

		const newData = await apiFetch({
			path: addQueryArgs(`${routePrefix}/${endpoint}/`, params),
			signal: abortSignal,
		});

		return newData.map((item) => {
			const rawLabel = !noUnescapeTitle ? unescapeHTML(processLabel(item)) : processLabel(item);
			const truncatedLabel = Number.isInteger(truncateTitle) && truncateTitle > 0 ? truncate(rawLabel, truncateTitle) : rawLabel;

			return {
				label: truncatedLabel,
				value: processId(item),
				metadata: processMetadata(item),
			};
		});
	};
}

export const wpSearchRoute = fetchFromWpRest('search', {
	processId: ({ url }) => url,
	labelProp: 'title',
	processMetadata: ({ type, subtype }) => ({ type, subtype }),
	additionalParam: {
		type: 'post',
		_locale: 'user',
		per_page: 5,
	},
	noCache: true,
	searchColumns: 'post_title',
	fields: 'id,title,type,subtype,url',
});
