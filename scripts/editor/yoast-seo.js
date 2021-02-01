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

			newData += this.checkData(require.context(`./../../components`, true, /manifest.json$/), newData);
			newData += this.checkData(require.context(`./../../custom`, true, /manifest.json$/), newData);

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

			// Be sure tha that attributes key exists because it is not necesery to be present.
			if (Object.prototype.hasOwnProperty.call(item, 'attributes')) {

				// Loop attributes and find seo key.
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

		const regex = new RegExp(`"${key}":".*?"`, 'gm')
		const output = [];
		let iterator;

		// Look regex items.
		while ((iterator = regex.exec(data)) !== null) {

			// This is necessary to avoid infinite loops with zero-width matches.
			if (iterator.index === regex.lastIndex) {
					regex.lastIndex++;
			}

			// The result can be accessed through the `iterator`-variable.
			iterator.forEach((match) => {

				// Split string, remove key, remove first and last quote.
				output.push((match.split(':').pop().substring(1).slice(0,-1)));
			});
		}

		return output;
	}
}

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
}
