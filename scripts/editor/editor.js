import React from 'react';
import { dispatch } from '@wordpress/data';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';

/**
 * Given a block's client ID and an attribute key, locks post saving in Gutenberg.
 * A lock is created under the name undefined-lock-[blockClientId]-[attributeKey],
 * meaning that a lock can be created for each attribute key of each block.
 * Multiple locks can be present and all of them have to be removed before saving is unlocked.
 *
 * @param {string} blockClientId A block's client ID
 * @param {string} attributeKey The attribute key
 *
 * @access public
 *
 * @returns {void}
 *
 * Usage:
 * ```js
 * lockPostEditing(clientId, getAttrKey('headingContent', attributes, manifest), value);
 * ```
 */
export const lockPostEditing = (blockClientId, attributeKey) => {
	dispatch('core/editor').lockPostSaving(
		`undefined-lock-${blockClientId}-${attributeKey}`
	);
};

/**
 * Given a block's client ID and an attribute key, unlocks post saving in Gutenberg.
 * A lock is created under the name undefined-lock-[blockClientId]-[attributeKey],
 * meaning that a lock can be created for each attribute key of each block.
 * Multiple locks can be present and all of them have to be removed before saving is unlocked.
 *
 * @param {string} blockClientId A block's client ID
 * @param {string} attributeKey The attribute key
 *
 * @access public
 *
 * @returns {void}
 *
 * Usage:
 * ```js
 * unlockPostEditing(clientId, getAttrKey('headingContent', attributes, manifest), value);
 * ```
 */
export const unlockPostEditing = (blockClientId, attributeKey) => {
	dispatch('core/editor').unlockPostSaving(
		`undefined-lock-${blockClientId}-${attributeKey}`
	);
};

/**
 * Given a block's client ID, attribute key and new value, creates a lock, locks post saving in Gutenberg
 * if the value is undefined, null or an empty string and unlocks that attribute's lock otherwise.
 *
 * A lock is created under the name undefined-lock-[blockClientId]-[attributeKey],
 * meaning that a lock can be created for each attribute key of each block.
 * Multiple locks can be present and all of them have to be removed before saving is unlocked.
 *
 * @param {string} blockClientId A block's client ID
 * @param {string} attributeKey The attribute key
 *
 * @access public
 *
 * @returns {void}
 *
 * Usage:
 * ```js
 * onChange={(value) => {
 *  setAttributes({ [getAttrKey('headingContent', attributes, manifest)]: value });
 *  lockIfUndefined(clientId, getAttrKey('headingContent', attributes, manifest), value);
 * }}
 * ```
 */
export const lockIfUndefined = (blockClientId, attributeKey, value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		lockPostEditing(blockClientId, attributeKey);
		return;
	}
	unlockPostEditing(blockClientId, attributeKey);
};

/**
 * Initialize the block context with all necessary data
 *
 * @param {*} props                        - Props to be passed to the component via the context
 * @param {React.Component?} props.options - Options component
 * @param {React.Component?} props.toolbar - Toolbar component
 * @param {React.Component?} props.editor  - Editor component
 *
 * @access public
 * @since 9.3.0
 *
 * @returns React.Component
 */
export const GutenbergBlock = (props) => {
	const {
		options: OptionsComponent,
		toolbar: ToolbarComponent,
		editor: EditorComponent,
	} = props;

	return (
		<>
			{OptionsComponent && (
				<InspectorControls>
					<OptionsComponent {...props} />
				</InspectorControls>
			)}

			{ToolbarComponent && (
				<BlockControls>
					<ToolbarComponent {...props} />
				</BlockControls>
			)}

			{EditorComponent && <EditorComponent {...props} />}
		</>
	);
};

/**
 * Get the data for `ResponsiveLegacy` from Eightshift UI components.
 *
 * @param {Object} responsiveAttr - Responsive attribute data, usually from `manifest.responsiveAttributes`.
 * @param {Object} attributes - Component/block attributes.
 * @param {Object} manifest - Component/block manifest.
 * @param {function} setAttributes - The `setAttributes` function.
 *
 * @access public
 * @since 13.0.0
 *
 * @returns Object
 */
export const getResponsiveLegacyData = (
	responsiveAttr,
	attributes,
	manifest,
	setAttributes
) => ({
	attribute: Object.fromEntries(
		Object.entries(responsiveAttr).map(([breakpoint, attrName]) => [
			breakpoint,
			getAttrKey(attrName, attributes, manifest),
		])
	),
	value: attributes,
	onChange: (attributeName, value) => setAttributes({ [attributeName]: value }),
});
