import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addAction } from '@wordpress/hooks';
import { select } from '@wordpress/data';

/* global YoastSEO */

/**
 * Attributes with this key will be passed as custom data to YoastSEO's analysis.
 * See https://developer.yoast.com/customization/yoast-seo/adding-custom-data-analysis for more info.
 */
export const yoastSeo = (options) => {
	const filterPriority = options?.filterPriority || 20;
	const filterName = options?.filterName || 'EightshiftCustomSeo';

	domReady(() => {
		// Ensure YoastSEO.js is present and can access the necessary features.
		if (
			typeof YoastSEO === 'undefined' ||
			typeof YoastSEO.analysis === 'undefined' ||
			typeof YoastSEO.analysis.worker === 'undefined'
		) {
			return;
		}

		// Initialize the state and dirty flag.
		let state = '';
		let isDirty = true;

		/**
		 * This function fetches the content of the post from the API.
		 * It will only fetch the content data and will not refresh the content.
		 *
		 * @param {boolean} shouldReload Should the content be refreshed after fetching.
		 */
		const fetchContent = async (shouldReload = true) => {
			// Set the dirty flag to false.
			isDirty = false;

			// Find API url for single item.
			const apiUrl = select('core/editor')?.getCurrentPost()?.['_links']?.['wp:action-publish']?.[0]?.href;

			if (typeof apiUrl === 'undefined') {
				return;
			}

			// Fetch content from the api with only content data in it.
			const response = await apiFetch({
				url: `${apiUrl}?_fields=content`,
				method: 'GET',
			});

			// Set the content to the state.
			state = response?.content?.rendered || '';

			// Refresh the content if needed.
			if (shouldReload) {
				YoastSEO.app.refresh();
			}
		};

		/**
		 * This function is called by the editor to save the content of the post.
		 * It will refresh the content after the save is done.
		 *
		 * @param {string} edits The content of the post.
		 *
		 * @return {string} The content of the post.
		 */
		const onSaveCallback = (edits) => {
			fetchContent();

			return edits;
		};

		/**
		 * This function is called by YoastSEO to get the content of the post.
		 *
		 * @return {string} The content of the post.
		 */
		const registerYoastSeoPlugin = () => {
			// Set the dirty flag to true.
			if (isDirty) {
				fetchContent(false);
			}

			return state;
		};

		// Register the filter and the plugin.
		addAction('editor.savePost', filterName, onSaveCallback);
		YoastSEO.app.registerPlugin(filterName, { status: 'ready' });
		YoastSEO.app.registerModification('content', registerYoastSeoPlugin, filterName, filterPriority);
	});
};
