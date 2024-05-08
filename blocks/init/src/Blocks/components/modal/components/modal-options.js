import React from 'react';
import { __ } from '@wordpress/i18n';
import { IconToggle, checkAttr, getAttrKey, icons, UseToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ModalOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		modalShowControls = true,

		showModalUse = false,
		showLabel = false,
		showModalExitButton = true,
	} = attributes;

	if (!modalShowControls) {
		return null;
	}

	const modalUse = checkAttr('modalUse', attributes, manifest);
	const modalExitButton = checkAttr('modalExitButton', attributes, manifest);

	return (
		<UseToggle
			label={label}
			checked={modalUse}
			onChange={(value) => setAttributes({ [getAttrKey('modalUse', attributes, manifest)]: value })}
			showUseToggle={showModalUse}
			showLabel={showLabel}
		>

			{showModalExitButton &&
				<IconToggle
					icon={icons.hide}
					label={__('Display exit button', '%g_textdomain%')}
					checked={modalExitButton}
					onChange={(value) => setAttributes({ [getAttrKey('modalExitButton', attributes, manifest)]: value })}
				/>
			}
		</UseToggle>
	);
};
