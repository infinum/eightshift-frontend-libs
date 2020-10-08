import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export const ParagraphToolbar = (props) => {
	const {
		paragraph: {
			align,
		},
		onChangeParagraphAlign,
	} = props;

	return (
		<Fragment>
			{onChangeParagraphAlign &&
				<AlignmentToolbar
					value={align}
					onChange={onChangeParagraphAlign}
				/>
			}
		</Fragment>
	);
};
