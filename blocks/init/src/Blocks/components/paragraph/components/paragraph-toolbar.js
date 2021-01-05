import React from 'react';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options } = manifest;

export const ParagraphToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		paragraphShowControls = true,

		paragraphUse = checkAttr('paragraphUse', attributes, manifest, componentName),

		paragraphAlign = checkAttr('paragraphAlign', attributes, manifest, componentName),

		showParagraphAlign = true,
	} = attributes;

	if (!paragraphShowControls) {
		return null;
	}

	return (
		<Fragment>
			{paragraphUse &&
				<Fragment>
					{showParagraphAlign &&
						<AlignmentToolbar
							value={paragraphAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
