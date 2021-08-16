import React from 'react';
import { HeadingLevel, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const HeadingToolbar = (attributes) => {
	const {
		setAttributes,
		headingShowControls = true,

		showHeadingLevel = true,
	} = attributes;

	if (!headingShowControls) {
		return null;
	}

	const headingUse = checkAttr('headingUse', attributes, manifest);
	const headingLevel = checkAttr('headingLevel', attributes, manifest);

	if (!headingUse) {
		return null;
	}

	return (
		<>
			{showHeadingLevel &&
				<HeadingLevel
					selectedLevel={headingLevel}
					onChange={(value) => setAttributes({ [getAttrKey('headingLevel', attributes, manifest)]: value })}
				/>
			}
		</>
	);
};
