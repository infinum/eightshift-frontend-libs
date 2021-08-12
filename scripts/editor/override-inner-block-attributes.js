/**
 * Sets attributes on all `innerBlocks`. This value will be stored in the Block editor store and set to a block.
 *
 * @param {function} select State function.
 * @param {string} clientId Unique block ID from block editor.
 * @param {object} attributesObject Object of attributes to apply.
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
export const overrideInnerBlockAttributes = (select, clientId, attributesObject = {}) => {
	const { getBlock } = select('core/block-editor');

	const block = getBlock(clientId);

	block.innerBlocks.map((item) => {
		const { attributes } = item;

		for (const attribute in attributesObject) {
			if (Object.prototype.hasOwnProperty.call(attributesObject, attribute)) {
				if (attribute !== attributes[attribute]) {
					attributes[attribute] = attributesObject[attribute];
				}
			}
		}

		return item;
	});
};

/**
 * Used to set attributes on all innerBlocks preset only for simple wrapper setup. This value will be stored in the block editor store and set to a block.
 *
 * @param {function} select State function.
 * @param {string} clientId Unique block ID from block editor.
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
export const overrideInnerBlockSimpleWrapperAttributes = (select, clientId) => {
	overrideInnerBlockAttributes(
		select,
		clientId,
		{
			wrapperUseSimple: true,
			wrapperUseSimpleShowControl: false,
			wrapperUseShowControl: false,
		}
	);
};
