import React from 'react';
import { __ } from '@wordpress/i18n';
import { IconToggle, ComponentUseToggle, checkAttr, getAttrKey, icons } from '@eightshift/frontend-libs/scripts';
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
		showModalExitButton = true,
	} = attributes;

	const modalUse = checkAttr('modalUse', attributes, manifest);
	const modalExitButton = checkAttr('modalExitButton', attributes, manifest);

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
					{showModalExitButton &&
						<IconToggle
							icon={icons.hide}
							label={__('Display exit button', 'eightshift-frontend-libs')}
							checked={modalExitButton}
							onChange={(value) => setAttributes({ [getAttrKey('modalExitButton', attributes, manifest)]: value })}
						/>
					}
				</>
			}
		</>
	);
};

