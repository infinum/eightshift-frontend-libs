import React from 'react';
import { checkAttr, getAttrKey, ComponentUseToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const BlockquoteOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		blockquoteShowControls = true,

		showBlockquoteUse = false,
		showLabel = false,
	} = attributes;

	if (!blockquoteShowControls) {
		return null;
	}

	const blockquoteUse = checkAttr('blockquoteUse', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={blockquoteUse}
				onChange={(value) => setAttributes({ [getAttrKey('blockquoteUse', attributes, manifest)]: value })}
				showUseToggle={showBlockquoteUse}
				showLabel={showLabel}
			/>

			{blockquoteUse &&
				<>
				</>
			}
		</>
	);
};
