import React from 'react';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const HeadingToolbar = (attributes) => {
	const {
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		headingShowControls = true,

		headingUse = checkAttr('headingUse', attributes, manifest, componentName),

		headingLevel = checkAttr('headingLevel', attributes, manifest, componentName),

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
				</>
			}
		</>
	);
};
