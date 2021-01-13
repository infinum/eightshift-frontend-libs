import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { options, title } = manifest;

export const LinkToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
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
							label={sprintf(__('%s text align', 'eightshift-frontend-libs'), label)}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
