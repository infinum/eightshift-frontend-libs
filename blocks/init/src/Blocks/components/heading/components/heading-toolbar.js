import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';
import manifest from './../manifest.json';

const { options } = manifest;

export const HeadingToolbar = (attributes) => {
	const {
		setAttributes,
		headingShowControls = true,

		headingUse,
		headingAlign,
		headingLevel,

		showHeadingAlign = true,
		showHeadingLevel = true,
	} = attributes;

	if (!headingShowControls) {
		return null;
	}

	return (
		<Fragment>
			{headingUse &&
				<Fragment>
					{showHeadingLevel &&
						<HeadingLevel
							selectedLevel={headingLevel}
							onChange={(value) => setAttributes({ headingLevel: value })}
						/>
					}

					{showHeadingAlign &&
						<AlignmentToolbar
							value={headingAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ headingAlign: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
