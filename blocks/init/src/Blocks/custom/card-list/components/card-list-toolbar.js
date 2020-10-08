import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockAlignmentToolbar } from '@wordpress/block-editor';
import { ImageToolbar } from '../../../components/image/components/image-toolbar';

export const cardListMediaPosition = [
	'left', 'right',
];

export const CardListToolbar = ({ attributes, actions }) => {
	const {
		mediaPosition,
	} = attributes;

	const {
		onChangeMediaPosition,
	} = actions;

	return (
		<Fragment>

			<ImageToolbar
				{...attributes}
				{...actions}
			/>

			{onChangeMediaPosition &&
				<BlockAlignmentToolbar
					value={mediaPosition}
					onChange={onChangeMediaPosition}
					controls={cardListMediaPosition}
				/>
			}

		</Fragment>
	);
};
