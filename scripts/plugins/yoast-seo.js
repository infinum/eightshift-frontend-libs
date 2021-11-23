import domReady from '@wordpress/dom-ready';

/* global YoastSEO */

class YoastSEOCustomData {
	constructor() {

		// Ensure YoastSEO.js is present and can access the necessary features.
		if ( typeof YoastSEO.analysis === 'undefined' || typeof YoastSEO.analysis.worker === 'undefined' ) {
			return;
		}

		// Register custom class.
		YoastSEO.app.registerPlugin( 'YoastSEOCustomData', { status: 'ready' } );

		// Custom implementation.
		this.registerModifications();
	}

	/**
	 * Registers the addContent modification.
	 *
	 * @returns {void}
	 */
	registerModifications() {
			const callback = this.addContent.bind( this );

			// Ensure that the additional data is being seen as a modification to the content.
			YoastSEO.app.registerModification( 'content', callback, 'YoastSEOCustomData', 10 );
	}

	/**
	 * Adds to the content to be analyzed by the analyzer.
	 *
	 * @param {string} data The current data string.
	 *
	 * @returns {string} The data string parameter with the added content.
	 */
	addContent( data ) {

			// First iteration always returns empty string so just skip this.
			if(data === '') {
				return data;
			}

			let newData = data;

			newData += this.checkData(require.context(`./../../../../../src/Blocks/components`, true, /manifest.json$/), newData);
			newData += this.checkData(require.context(`./../../../../../src/Blocks/custom`, true, /manifest.json$/), newData);

			// Replace unicode characters so that Yoast can parse them.
			newData = newData.replace(/\\u0022/g, '"').replace(/\\u0026/g, '&').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>');

			return newData;
	}

	// Check for the manifest data and append.
	checkData(dataType, data) {
		let output = '';

		this.findManifests(dataType).forEach((element) => {
			output += this.findStrings(element, data).map((item) => {
				return item;
			});
		});

		return output;
	}

	// Find all manifests in the provided require.context.
	findManifests(items) {
		const output = [];

		// Find all attributes in that contains.
		items.keys().map(items).forEach((item) => {

			// Be sure tha that attributes key exists.
			if (Object.prototype.hasOwnProperty.call(item, 'attributes')) {

				// Loop attributes and find 'seo' key.
				for (const property in item.attributes) {
					if (Object.prototype.hasOwnProperty.call(item.attributes[property], 'seo')) {
						output.push(property);
					}
				}
			}
		});

		return output;
	}

	// Find all strings using regex in the provided data set of dynamic attributes.
	findStrings(key, data) {
		const regex = new RegExp(`"${key}":"(.*?)"`, 'gm');
		const output = [];
		let iterator;

		// Look regex items.
		while ((iterator = regex.exec(data)) !== null) {

			// This is necessary to avoid infinite loops with zero-width matches.
			if (iterator.index === regex.lastIndex) {
					regex.lastIndex++;
			}

			// Find all the images. They are in blocks so the attribute imageUrl will have a prefix.
			if (/ImageUrl$/.test(key)) {
				output.push(`<img src="${iterator[1]}"/>`);
			}

			// Get the matched content only.
			output.push(iterator[1]);
		}

		return output;
	}
}

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

		/**
		* Adds event listener to load the plugin.
		*/
		if ( typeof YoastSEO !== 'undefined' && typeof YoastSEO.app !== 'undefined' ) {
			new YoastSEOCustomData();
		} else {
			window.addEventListener('YoastSEO:ready', () => {
				new YoastSEOCustomData();
			});
		}
	});
};
