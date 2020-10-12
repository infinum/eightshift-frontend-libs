import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';

export const HeadingToolbar = (props) => {
	const {
		heading: {
			level,
			align,
			use = true,
		},
		showControls = true,
		onChangeHeadingLevel,
		onChangeHeadingAlign,
	} = props;

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>
			{use &&
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
			}
		</Fragment>
	);
};
