import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';
import { getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const HeadingToolbar = (attributes) => {
	const { title } = manifest;

	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		options = options,
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
		<>
			{headingUse &&
				<>
					{showHeadingLevel &&
						<HeadingLevel
							selectedLevel={headingLevel}
							onChange={(value) => setAttributes({ [`${componentName}Level`]: value })}
						/>
					}

					{showHeadingAlign &&
						<AlignmentToolbar
							value={headingAlign}
							options={getOptions(manifest, componentName, 'align', options)}
							label={sprintf(__('%s text align', 'eightshift-frontend-libs'), label)}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</>
			}
		</>
	);
};
