import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { icons } from '../../editor';
import { classnames } from '../../helpers';

/**
 * @since 8.0.0
 *
 * A replacement for the default Gutenberg inserter, whose styling can vary between WP versions.
 *
 * @param {object} props                               - BlockInserter options.
 * @param {React.Component?} [props.clientId]          - Client ID of the block in which the inserter belongs.
 * @param {React.Component?} [props.hasLabel=false]    - Client ID of the block in which the inserter belongs.
 * @param {React.Component?} [props.small=false]       - If `true`, the button's size is reduced, perfect for added visual separation in hierarchical InnerBlocks.
 * @param {React.Component?} [props.additionalClasses] - Classes to add to the control base.
 */
export const BlockInserter = (props) => {
	const {
		clientId,
		hasLabel = false,
		small = false,
		additionalClasses,
	} = props;

	return (
		<Inserter
			rootClientId={clientId}
			position='bottom center'
			isAppender

			renderToggle={(appenderProps) => {
				const {
					onToggle,
					disabled,
					hasSingleBlockType,
					blockTitle
				} = appenderProps;

				const labelText = hasSingleBlockType ? sprintf(__('Add a %s', 'eightshift-frontend-libs'), blockTitle) : __('Add a block', 'eightshift-frontend-libs');

				return (
					<Button
						onClick={onToggle}
						disabled={disabled}
						label={!hasLabel && labelText}
						icon={icons.add}
						className={classnames(
							'es-slight-button-border-cool-gray-400 es-hover-slight-button-border-admin-accent es-active-slight-button-border-admin-accent es-focus-slight-button-border-admin-accent',
							'es-border-pure-white es-border-w-2px',
							'es-bg-pure-white! es-mx-auto es-text-3! es-color-cool-gray-650',
							!hasLabel && !small && 'es-w-9!',
							small ? 'es-h-7! es-w-7! es-min-w-7! es-rounded-1! es-button-icon-18' : 'es-button-icon-20 es-rounded-1.5! es-h-9!',
							additionalClasses,
						)}
						showTooltip={!hasLabel}
					>
						{hasLabel && <span className='es-color-cool-gray-500'>{labelText}</span>}
					</Button>
				);
			}}
		/>
	);
};
