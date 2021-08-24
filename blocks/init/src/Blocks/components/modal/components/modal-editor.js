import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { outputCssVariables, getUnique, checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ModalEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
		resources: { icon },
	} = manifest;

	const {
		selectorClass = componentClass,
		additionalClass,
		blockClass,
	} = attributes;

	const modalUse = checkAttr('modalUse', attributes, manifest);
	const modalExitButton = checkAttr('modalExitButton', attributes, manifest);
	const modalContent = checkAttr('modalContent', attributes, manifest);
	const modalId = checkAttr('modalId', attributes, manifest);

	if (!modalUse) {
		return null;
	}

	const modalClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const modalOverlayClass = selector(componentClass, componentClass, 'overlay');
	const modalDialogClass = selector(componentClass, componentClass, 'dialog');
	const modalContentClass = selector(componentClass, componentClass, 'content');
	const modalExitButtonClass = selector(componentClass, componentClass, 'close-button');

	return (
		<div className={modalClass} data-id={unique} id={modalId} aria-hidden="false">
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<div className={modalOverlayClass} tabIndex="-1" data-micromodal-close>
				<div className={modalDialogClass} role="dialog" aria-modal="true">
					{modalExitButton &&
						<button
							className={modalExitButtonClass}
							aria-label={__('Close modal', 'eightshift-frontend-libs')}
							data-micromodal-close
							dangerouslySetInnerHTML={{ __html: icon }}
						>
						</button>
					}
					<div className={modalContentClass}>
						{modalContent}
					</div>
				</div>
			</div>
		</div>
	);
};
