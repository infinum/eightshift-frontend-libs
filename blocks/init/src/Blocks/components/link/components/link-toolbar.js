import React from 'react';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { options } = manifest;

export const LinkToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		linkShowControls = true,

		linkUse = checkAttr('linkUse', attributes, manifest, componentName),

		linkAlign = checkAttr('linkAlign', attributes, manifest, componentName),

		showLinkAlign = true,
	} = attributes;

	if (!linkShowControls) {
		return null;
	}

	return (
		<Fragment>
			{linkUse &&
				<Fragment>
					{showLinkAlign &&
						<AlignmentToolbar
							value={linkAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
