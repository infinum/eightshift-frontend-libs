import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';

export const HeadingToolbar = (props) => {
	const {
		heading: {
			level,
			styleAlign,
		},
		onChangeHeadingLevel,
		onChangeHeadingStyleAlign,
	} = props;

	return (
		<Fragment>
			{onChangeHeadingLevel &&
				<HeadingLevel
					selectedLevel={level}
					onChange={onChangeHeadingLevel}
				/>
			}

			{onChangeHeadingStyleAlign &&
				<AlignmentToolbar
					value={styleAlign}
					onChange={onChangeHeadingStyleAlign}
				/>
			}

		</Fragment>
	);
};
