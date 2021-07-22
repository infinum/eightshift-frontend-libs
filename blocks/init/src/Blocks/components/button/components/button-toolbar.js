import React from 'react';
import { LinkToolbarButton, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
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
							title={label}
							textDomain={'eightshift-frontend-libs'}
							urlAttrName={getAttrKey('buttonUrl', attributes, manifest)}
							isNewTabAttrName={getAttrKey('buttonIsNewTab', attributes, manifest)}
						/>
					}
				</>
			}
		</>
	);
};
