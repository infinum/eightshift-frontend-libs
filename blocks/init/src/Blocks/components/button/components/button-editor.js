import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const ButtonEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		buttonUse = defaults.buttonUse.default,

		buttonContent,
		buttonUrl,
		buttonColor = defaults.buttonColor.default,
		buttonSize = defaults.buttonSize.default,
		buttonWidth = defaults.buttonWidth.default,
		buttonAlign = defaults.buttonAlign.default,
	} = attributes;

	const buttonClass = classnames(
		componentClass,
		buttonSize && `${componentClass}__size--${buttonSize}`,
		buttonColor && `${componentClass}__color--${buttonColor}`,
		buttonWidth && `${componentClass}__size-width--${buttonWidth}`,
		!(buttonContent && buttonUrl) && `${componentClass}__placeholder`,
	);

	const buttonWrapClass = classnames(
		`${componentClass}__wrap`,
		buttonAlign && `${componentClass}__align--${buttonAlign}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{buttonUse &&
				<div className={buttonWrapClass}>
					<RichText
						placeholder={placeholder}
						value={buttonContent}
						onChange={(value) => setAttributes({ buttonContent: value })}
						className={buttonClass}
						keepPlaceholderOnFocus
						allowedFormats={[]}
					/>
				</div>
			}
		</Fragment>
	);
};
