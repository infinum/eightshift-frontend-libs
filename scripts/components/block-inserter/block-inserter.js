import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { icons } from '../../editor';

/**
 * @since 8.0.0
 *
 * A replacement for the default Gutenberg inserter, whose styling can vary between WP versions.
 *
 * @param {object} props                                - BlockInserter options.
 * @param {React.Component?} [props.icon]               - Icon to show next to the label
 */
export const BlockInserter = (props) => {
	return (
		<Inserter
			rootClientId={props.clientId}
			position='bottom center'
			isAppender

			renderToggle={(appenderProps) => {
				const {
					onToggle,
					disabled,
					hasSingleBlockType,
					blockTitle
				} = appenderProps;

				return (
					<Button
						onClick={onToggle}
						disabled={disabled}
						label={hasSingleBlockType ? sprintf(__('Add a %s', 'eightshift-frontend-libs'), blockTitle) : __('Add a block', 'eightshift-frontend-libs')}
						icon={icons.add}
						className='es-button-icon-20 es-h-9! es-w-9! es-rounded-1.5! es-slight-button-border-cool-gray-400 es-bg-pure-white!'
					/>
				);
			}}
		/>
	);
};
