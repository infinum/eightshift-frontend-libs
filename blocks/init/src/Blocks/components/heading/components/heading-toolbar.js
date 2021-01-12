import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const HeadingToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		headingShowControls = true,

		headingUse = checkAttr('headingUse', attributes, manifest, componentName),

		headingAlign = checkAttr('headingAlign', attributes, manifest, componentName),
		headingLevel = checkAttr('headingLevel', attributes, manifest, componentName),

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
							onChange={(value) => setAttributes({ [`${componentName}Level`]: value })}
						/>
					}

					{showHeadingAlign &&
						<AlignmentToolbar
							value={headingAlign}
							options={options.aligns}
							label={sprintf(__('%s text align', 'eightshift-frontend-libs'), label)}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
