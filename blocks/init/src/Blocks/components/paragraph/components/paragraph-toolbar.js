import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export const ParagraphToolbar = (props) => {
	const {
		paragraph: {
			styleAlign,
		},
		onChangeParagraphStyleAlign,
	} = props;

	return (
		<Fragment>
			{onChangeParagraphStyleAlign &&
				<AlignmentToolbar
					value={styleAlign}
					onChange={onChangeParagraphStyleAlign}
				/>
			}
		</Fragment>
	);
};
