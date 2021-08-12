import React from 'react';
import { LinkToolbarButton, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ButtonToolbar = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
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

	if (!buttonUse) {
		return null;
	}

	return (
		<>
			{showButtonUrl &&
				<LinkToolbarButton
					url={buttonUrl}
					opensInNewTab={buttonIsNewTab}
					setAttributes={setAttributes}
					urlAttrName={getAttrKey('buttonUrl', attributes, manifest)}
					isNewTabAttrName={getAttrKey('buttonIsNewTab', attributes, manifest)}
					title={label}
				/>
			}
		</>
	);
};
