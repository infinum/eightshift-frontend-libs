import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { getOptions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

export const ParagraphToolbar = (attributes) => {
	const {
		componentName: manifestComponentName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		options = manifestOptions,
		paragraphShowControls = true,

		paragraphUse = checkAttr('paragraphUse', attributes, manifest, componentName),

		paragraphAlign = checkAttr('paragraphAlign', attributes, manifest, componentName),

		showParagraphAlign = true,
	} = attributes;

	if (!paragraphShowControls) {
		return null;
	}

	return (
		<>
			{paragraphUse &&
				<>
					{showParagraphAlign &&
						<AlignmentToolbar
							value={paragraphAlign}
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
