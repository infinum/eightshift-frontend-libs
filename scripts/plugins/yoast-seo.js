import domReady from '@wordpress/dom-ready';
import _ from 'lodash';
import apiFetch from '@wordpress/api-fetch';
import { subscribe, select } from '@wordpress/data';

/* global YoastSEO */

/**
 * Searches all blocks and component manifests and returns attributes that have `"seo": "true"` set.
 * Attributes with this key will be passed as custom data to YoastSEO's analysis. 
 * See https://developer.yoast.com/customization/yoast-seo/adding-custom-data-analysis for more info.
 *
 * Usage:
 * ```js
 * import { yoastSeo } from '@eightshift/frontend-libs/scripts/editor';
 *
 * yoastSeo();
 * ```
 */
export const yoastSeo = () => {
	domReady(() => {
		// Bailout if plugin is missing.
		if (typeof YoastSEO?.app !== 'undefined') {

			// Check if data is available from the state.
			let isDataAvailable = false;

			// Subscribe to changes.
			subscribe(
				// Small debounce for more optimisations in loading.
				_.debounce(() => {
					// Get the new current post when ready.
					const currentPost = select('core/editor').getCurrentPost();

					// Stop subscription when currentPost is available.
					if (!_.isEmpty(currentPost) && !isDataAvailable) {
						isDataAvailable = true;

						// Find API url for single item.
						const apiUrl = currentPost['_links']['wp:action-unfiltered-html'][0]['href'];

						if (typeof apiUrl !== 'undefined') {
							// Fetch content from the api with only content data in it.
							apiFetch({
								url: `${apiUrl}?_fields=content`,
								method: 'GET',
							}).then((response) => {

								const content = response?.content?.rendered;

								// Add Seo plugin updates for the new content.
								if (typeof content !== 'undefined' ) {
									YoastSEO.app.registerPlugin('EightshiftCustomSeo', {status: 'ready'});
									YoastSEO.app.registerModification('content', () => content, 'EightshiftCustomSeo', 5);
								}
							});
						}
					}
				}, 50)
			);
		}
	});
};
