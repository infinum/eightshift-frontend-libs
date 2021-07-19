import React from 'react';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { LinkToolbarButton } from '@eightshift/frontend-libs/scripts/components';
import { useRef } from '@wordpress/element';
import manifest from './../manifest.json';

export const ButtonToolbar = (attributes) => {
	const {
		title: manifestTitle,
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		buttonShowControls = true,

		showButtonUrl = true,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	const buttonUse = checkAttr('buttonUse', attributes, manifest);
	const buttonUrl = checkAttr('buttonUrl', attributes, manifest);
	const buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest);

	const ref = useRef();

	return (
		<>
			{buttonUse &&
				<>
					{showButtonUrl &&
						<LinkToolbarButton
							componentName={componentName}
							url={buttonUrl}
							opensInNewTab={buttonIsNewTab}
							setAttributes={setAttributes}
							anchorRef={ref}
							title={label}
							textDomain={'eightshift-frontend-libs'}
							onChangeUrl={getAttrKey('buttonUrl', attributes, manifest)}
							onChangeIsNewTab={getAttrKey('buttonIsNewTab', attributes, manifest)}
						/>
					}
				</>
			}
		</>
	);
};
