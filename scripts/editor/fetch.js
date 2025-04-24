import { truncate, unescapeHTML } from '@eightshift/ui-components/utilities';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

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
			const truncatedLabel =
				Number.isInteger(truncateTitle) && truncateTitle > 0 ? truncate(rawLabel, truncateTitle) : rawLabel;

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
	perPage: 5,
	additionalParam: {
		type: 'post',
		_locale: 'user',
	},
	noCache: true,
	searchColumns: 'post_title',
	fields: 'id,title,type,subtype,url',
});

/**
 * Returns a function that fetches data from WordPress REST API.
 *
 * @param {string} endpoint - Endpoint to fetch from.
 * @param {Object} options - Additional options.
 * @param {number} [options.perPage=30] - Number of items to fetch per page.
 * @param {string} [options.routePrefix='wp/v2'] - Route prefix for the API.
 * @param {string} [options.fields='id,title'] - A comma-separated list of field names to fetch from the API. Good to include as it makes the query faster and the output terser.
 * @param {string} [options.noSearch=false] - If `true`, only the URL will be returned, without the search query support.
 * @param {SearchColumnsConfig} [options.searchColumns] - Allows narrowing the search scope.
 *
 * @returns {Function} The `(searchText) => url: string` function, or URL as `string` if `noSearch` is set.
 *
 * @typedef {'post_title' | 'post_excerpt' | 'post_content'} SearchColumnsConfig
 *
 * @example
 * const data = await fetch(buildWpRestUrl('pages'));
 * const json = await data.json();
 *
 * console.log(json);
 *
 * @example
 * <AsyncSelect
 *  value={loremIpsum}
 *  onChange={(value) => setAttributes({ [getAttrKey('loremIpsum', attributes, manifest)]: value })}
 *  fetchUrl={buildWpRestUrl('pages')}
 * />
 *
 */
export function buildWpRestUrl(endpoint, options = {}) {
	const {
		perPage = 30,
		routePrefix = 'wp/v2',
		fields = 'id,title',
		searchColumns,
		noSearch,
		...additionalParams
	} = options;

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

	if (noSearch) {
		return addQueryArgs(`${routePrefix}/${endpoint}/`, params);
	}

	return (searchText) => {
		if (searchText?.length > 0) {
			params.search = searchText;
		}

		return addQueryArgs(`${routePrefix}/${endpoint}/`, params);
	};
}
