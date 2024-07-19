import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Inserter } from '@wordpress/block-editor';
import { Button } from '@eightshift/ui-components';
import { icons } from '@eightshift/ui-components/icons';
import { clsx } from '@eightshift/ui-components/utilities';

/**
 * A replacement for the default Gutenberg inserter, whose styling can vary between WP versions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.clientId - Client ID of the block in which the inserter belongs.
 * @param {boolean|string|JSX.Element} [props.label] - Label of the inserter.
 * @param {boolean} [props.small] - If `true`, the button's size is reduced, perfect for added visual separation in hierarchical InnerBlocks.
 * @param {string} [props.className] - Additional classes to add to the control base.
 * @param {boolean} [props.prioritizePatterns] - Whether to show patterns before blocks in the inserter.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The BlockInserter component.
 *
 * @example
 * <InnerBlocks renderAppender={() => <BlockInserter />} />
 *
 * @preserve
 */
export const BlockInserter = (props) => {
	const { clientId, label, small = false, className, prioritizePatterns = false, hidden } = props;

	if (hidden) {
		return null;
	}

	return (
		<Inserter
			rootClientId={clientId}
			prioritizePatterns={prioritizePatterns}
			__experimentalIsQuick
			isAppender
			isQuick
			renderToggle={(appenderProps) => {
				const { onToggle, disabled, hasSingleBlockType, blockTitle } = appenderProps;

				let labelText = label;

				if (label === true) {
					labelText = sprintf(__('Add %s', 'eightshift-frontend-libs'), hasSingleBlockType ? blockTitle : __('a block', 'eightshift-frontend-libs'));
				}

				return (
					<Button
						onPress={onToggle}
						disabled={disabled}
						icon={icons.add}
						size={small ? 'small' : 'default'}
						className={clsx(className, 'es-uic-font-sans')}
					>
						{labelText}
					</Button>
				);
			}}
		/>
	);
};
