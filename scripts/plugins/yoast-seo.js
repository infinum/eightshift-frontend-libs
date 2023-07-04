import domReady from '@wordpress/dom-ready';
import _ from 'lodash';
import apiFetch from '@wordpress/api-fetch';
import { subscribe, select } from '@wordpress/data';

/* global YoastSEO */

/**
 * Attributes with this key will be passed as custom data to YoastSEO's analysis.
 * See https://developer.yoast.com/customization/yoast-seo/adding-custom-data-analysis for more info.
 */
export const yoastSeo = () => {
	domReady(() => {
		// Bailout if plugin is missing.
		if (typeof YoastSEO === 'undefined' && typeof YoastSEO?.app === 'undefined') {
			return;
		}

		// Local variable content, used to update Yoast modifications.
		let content = '';
		let isDataAvailable = false;

		YoastSEO.app.registerPlugin('EightshiftCustomSeo', { status: 'ready' });
		YoastSEO.app.registerModification('content', () => content, 'EightshiftCustomSeo', 5);

		// Subscribe to changes.
		subscribe(
			// Small debounce for more optimisations in loading.
			_.debounce(() => {
				// Filter only when saved or autosaved.
				const isSavingPost = wp.data.select('core/editor').isSavingPost();
				const isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();

				// Get the new current post when ready.
				const currentPost = select('core/editor').getCurrentPost();

				// Filter subscribes. Check only if post is saving, autosaving or initial load.
				if (_.isEmpty(currentPost) || (isDataAvailable && !isSavingPost && !isAutosavingPost)) {
					return;
				}

				isDataAvailable = true;

				// Find API url for single item.
				const apiUrl = currentPost['_links']['wp:action-publish'][0].href;

				if (typeof apiUrl === 'undefined') {
					return;
				}

				// Fetch content from the api with only content data in it.
				apiFetch({
					url: `${apiUrl}?_fields=content`,
					method: 'GET',
				}).then((response) => {
					const fetchedContent = response?.content?.rendered;

					if (typeof content === 'undefined' && fetchedContent === content) {
						return;
					}
					// Updating global variable content.
					content = fetchedContent;
					// Refreshing Yoast input.
					YoastSEO.app.pluggable.refresh();
				});
			}, 50)
		);
	}
	);
};
