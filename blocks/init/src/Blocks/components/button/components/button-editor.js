import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { selector, selectorB, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ButtonEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		buttonUse = checkAttr('buttonUse', attributes, manifest),

		buttonContent = checkAttr('buttonContent', attributes, manifest),
		buttonUrl = checkAttr('buttonUrl', attributes, manifest),
	} = attributes;

	const buttonWrapClass = classnames([
		selectorB(componentClass, 'wrap'),
		selector(componentClass, 'align', 'buttonAlign', attributes, manifest),
		selectorB(blockClass, `${selectorClass}-wrap`),
	]);

	const buttonClass = classnames([
		componentClass,
		selector(componentClass, 'size', 'buttonSize', attributes, manifest),
		selector(componentClass, 'color', 'buttonColor', attributes, manifest),
		selector(componentClass, 'size-width', 'buttonWidth', attributes, manifest),
		!(buttonContent && buttonUrl) && `${componentClass}-placeholder`,
		selectorB(blockClass, selectorClass),
	]);

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
