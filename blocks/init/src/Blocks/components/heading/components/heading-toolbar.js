import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';
import manifest from './../manifest.json';

const { attributes: defaults, options } = manifest;

export const HeadingToolbar = (props) => {
	const {
		setAttributes,
		headingShowControls = true,

		headingUse = defaults.headingUse.default,
		headingAlign = defaults.headingAlign.default,
		headingLevel = defaults.headingLevel.default,

		showHeadingAlign = true,
		showHeadingLevel = true,
	} = props;

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
