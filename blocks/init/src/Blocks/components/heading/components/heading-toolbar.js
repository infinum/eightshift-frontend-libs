import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';

export const HeadingToolbar = (props) => {
	const {
		heading: {
			level,
			align,
		},
		onChangeHeadingLevel,
		onChangeHeadingAlign,
	} = props;

	return (
		<Fragment>
			{onChangeHeadingLevel &&
				<HeadingLevel
					selectedLevel={level}
					onChange={onChangeHeadingLevel}
				/>
			}

			{onChangeHeadingAlign &&
				<AlignmentToolbar
					value={align}
					onChange={onChangeHeadingAlign}
				/>
			}

		</Fragment>
	);
};
