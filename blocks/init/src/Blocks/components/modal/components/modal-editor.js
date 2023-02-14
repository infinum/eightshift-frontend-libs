import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, selector, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ModalEditor = (attributes) => {

	const modalUse = checkAttr('modalUse', attributes, manifest);

	if (!modalUse) {
		return null;
	}

	const {
		componentClass,
		resources: {
			icon
		},
	} = manifest;

	const {
		selectorClass = componentClass,
		additionalClass,
		blockClass,
		onClick,
	} = attributes;

	const modalExitButton = checkAttr('modalExitButton', attributes, manifest);
	const modalContent = checkAttr('modalContent', attributes, manifest);
	const modalId = checkAttr('modalId', attributes, manifest);

	const modalClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	const modalOverlayClass = selector(componentClass, componentClass, 'overlay');
	const modalDialogClass = selector(componentClass, componentClass, 'dialog');
	const modalContentClass = selector(componentClass, componentClass, 'content');
	const modalCloseClass = selector(componentClass, componentClass, 'close');
	const modalCloseButtonClass = selector(componentClass, componentClass, 'close-button');

	return (
		<div className={modalClass} id={modalId} aria-hidden="false">
			<div className={modalOverlayClass} tabIndex="-1">
				<div className={modalDialogClass} role="dialog" aria-modal="true">
					{modalExitButton &&
						<div className={modalCloseClass}>
							<button
								className={modalCloseButtonClass}
								aria-label={__('Close modal', 'eightshift-frontend-libs')}
								dangerouslySetInnerHTML={{ __html: icon }}
								onClick={onClick}
							>
							</button>
						</div>
					}
					<div className={modalContentClass}>
						{modalContent}
					</div>
				</div>
			</div>
		</div>
	);
};
