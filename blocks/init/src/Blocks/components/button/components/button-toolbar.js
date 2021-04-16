import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { LinkToolbarButton } from '@eightshift/frontend-libs/scripts/components';
import { useRef } from '@wordpress/element';
import manifest from './../manifest.json';

export const ButtonToolbar = (attributes) => {
	const { title } = manifest;

	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		options = options,
		buttonShowControls = true,

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),
		buttonAlign = checkAttr('buttonAlign', attributes, manifest, componentName),
		buttonUrl = checkAttr('buttonUrl', attributes, manifest, componentName),
		buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest, componentName),

		showButtonAlign = true,
		showButtonUrl = true,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	const ref = useRef();

	return (
		<>
			{buttonUse &&
				<>
					{showButtonAlign &&
						<AlignmentToolbar
							value={buttonAlign}
							options={getOptions(manifest, componentName, 'align', options)}
							label={sprintf(__('%s text align', 'eightshift-frontend-libs'), label)}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}

					{showButtonUrl &&
						<LinkToolbarButton
							componentName={componentName}
							url={buttonUrl}
							opensInNewTab={buttonIsNewTab}
							setAttributes={setAttributes}
							anchorRef={ref}
							title={label}
							textDomain={'eightshift-frontend-libs'}
						/>
					}
				</>
			}
		</>
	);
};
