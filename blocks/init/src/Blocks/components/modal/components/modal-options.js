import React from 'react';
import { ComponentUseToggle, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ModalOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,

		showModalUse = false,
		showLabel = false,
	} = attributes;

	const modalUse = checkAttr('modalUse', attributes, manifest);

	return (
		<>

			<ComponentUseToggle
				label={label}
				checked={modalUse}
				onChange={(value) => setAttributes({ [getAttrKey('modalUse', attributes, manifest)]: value })}
				showUseToggle={showModalUse}
				showLabel={showLabel}
			/>

			{modalUse &&
				<>
				</>
			}

		</>
	);
};
