import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { LinkToolbarButton } from '@eightshift/frontend-libs/scripts/components';
import { useRef } from '@wordpress/element';
import manifest from '../manifest.json';

export const LinkToolbar = (attributes) => {
	const { title } = manifest;

	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		options = options,
		linkShowControls = true,

		linkUse = checkAttr('linkUse', attributes, manifest, componentName),
		linkAlign = checkAttr('linkAlign', attributes, manifest, componentName),
		linkIsNewTab = checkAttr('linkIsNewTab', attributes, manifest, componentName),
		linkUrl = checkAttr('linkUrl', attributes, manifest, componentName),

		showLinkAlign = true,
		showLinkUrl = true,
	} = attributes;

	if (!linkShowControls) {
		return null;
	}

	const ref = useRef();

	return (
		<>
			{linkUse &&
				<>
					{showLinkAlign &&
						<AlignmentToolbar
							value={linkAlign}
							options={getOptions(manifest, componentName, 'align', options)}
							label={sprintf(__('%s text align', 'eightshift-frontend-libs'), label)}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}

					{showLinkUrl &&
						<LinkToolbarButton
							componentName={componentName}
							url={linkUrl}
							opensInNewTab={linkIsNewTab}
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
