import domReady from '@wordpress/dom-ready';
import _ from 'lodash';
import {parse} from '@wordpress/block-serialization-default-parser';

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
	addContent(data) {

		// First iteration always returns empty string so just skip this.
		if (data === '') {
			return data;
		}

		// Parse blocks
		const parsedData = parse(data);

		// Leave paragraphs, headings, images and check inner blocks.
		const allowedData = parsedData.map((block) => {
			let content;

			if (block.blockName.includes('heading') || block.blockName.includes('paragraph') || block.blockName.includes('image')) {
				content += this.parseContent(block);
			}

			if (!_.isEmpty(block.innerBlocks)) { // This needs to be solved using a recursion for inner blocks.
				block.innerBlocks.map((innerBlock) => {
					if (!_.isEmpty(innerBlock.innerBlocks)) {
						innerBlock.innerBlocks.map((innerInnerBlocks) => {
							content += this.parseContent(innerInnerBlocks);
						});
					} else {
						content += this.parseContent(innerBlock);
					}
				});
			}

			return content;
		});

		// // Replace unicode characters so that Yoast can parse them.
		return allowedData.join().replace(/\\u0022/g, '"').replace(/\\u0026/g, '&').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>');
	}

	parseContent = (block) => {
		let content;
		let level = 3;
		let url;
		let alt;

		if (typeof block.attrs !== 'undefined' && block.attrs !== null) {
			for (const [key, value] of Object.entries(block.attrs)) {
				if (key.toLowerCase().includes('content')) {
					content = value;
				}

				if (key.toLowerCase().includes('level')) {
					level = value;
				}

				if (key.toLowerCase().includes('imageurl')) {
					url = value;
				}

				if (key.toLowerCase().includes('imagealt')) {
					alt = value;
				}
			}

			if (block.blockName.includes('paragraph')) {
				return `<p>${content}</p>`;
			}

			if (block.blockName.includes('heading')) {
				return `<h${level}>${content}</h${level}>`;
			}

			if (block.blockName.includes('image')) {
				return `<h${level}>${content}</h${level}>`;
			}
		}
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
	let seoInstance;

	domReady(() => {

		/**
		* Adds event listener to load the plugin.
		*/
		if ( typeof YoastSEO !== 'undefined' && typeof YoastSEO.app !== 'undefined' ) {
			seoInstance = new YoastSEOCustomData();
		} else {
			window.addEventListener('YoastSEO:ready', () => {
				seoInstance = new YoastSEOCustomData();
			});
		}

	});

	return seoInstance;
};
