/**
 * Sets attributes on all `innerBlocks`. This value will be stored in the Block editor store and set to a block.
 *
 * @param {function} select State function.
 * @param {string} clientId Unique block ID from block editor.
 * @param {object} attributesObject Object of attributes to apply.
 * @param {array} exclude Array of block names to exclude.
 *
 * Usage:
 * ```js
 * import { useSelect } from '@wordpress/data';
 *
 * useSelect((select) => {
 *   overrideInnerBlockAttributes(
 *     select,
 *     props.clientId,
 *     {
 *       wrapperDisable: true,
 *     }
 *   );
 * });
 * ```
 */
 export const overrideInnerBlockAttributes = (select, clientId, attributesObject = {}, exclude = []) => {
	const { getBlock } = select('core/block-editor');

	const block = getBlock(clientId);

	block.innerBlocks.map((item) => {
		const {
			attributes,
			name,
		} = item;

		if (!exclude.includes(name)) {
			for (const attribute in attributesObject) {
				if (Object.prototype.hasOwnProperty.call(attributesObject, attribute)) {
					if (attribute !== attributes[attribute]) {
						console.log(attributes, attributesObject[attribute]);
						attributes[attribute] = attributesObject[attribute];
					}
				}
			}
		}

		return item;
	});
};

/**
 * Sets attributes on all `innerBlocks`, with Simple wrapper options preset. This value will be stored in the Block editor store and set to a block.
 *
 * @param {function} select State function.
 * @param {string} clientId Unique block ID from block editor.
 * @param {array} exclude Array of block names to exclude.
 *
 * Usage:
 * ```js
 * import { useSelect } from '@wordpress/data';
 *
 * useSelect((select) => {
 *   overrideInnerBlockSimpleWrapperAttributes(
 *     select,
 *     props.clientId
 *   );
 * });
 * ```
 */
export const overrideInnerBlockSimpleWrapperAttributes = (select, clientId, exclude = []) => {
	overrideInnerBlockAttributes(
		select,
		clientId,
		{
			wrapperUseSimple: true,
			wrapperUseSimpleShowControl: false,
			wrapperUseShowControl: false,
		},
		exclude
	);
};
