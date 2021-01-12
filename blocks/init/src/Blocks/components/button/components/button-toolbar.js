import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const ButtonToolbar = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		buttonShowControls = true,

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),
		buttonAlign = checkAttr('buttonAlign', attributes, manifest, componentName),

		showButtonAlign = true,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	return (
		<Fragment>
			{buttonUse &&
				<Fragment>
					{showButtonAlign &&
						<AlignmentToolbar
							value={buttonAlign}
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
