import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export const ParagraphToolbar = (props) => {
	const {
		paragraph: {
			align,
			use = true,
		},
		showControls = true,
		onChangeParagraphAlign,
	} = props;

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>
			{use &&
				<Fragment>
					{onChangeParagraphAlign &&
						<AlignmentToolbar
							value={align}
							onChange={onChangeParagraphAlign}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
