import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ButtonEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),

		buttonContent = checkAttr('buttonContent', attributes, manifest, componentName),
		buttonUrl = checkAttr('buttonUrl', attributes, manifest, componentName),
		buttonAlign = checkAttr('buttonAlign', attributes, manifest, componentName),
		buttonSize = checkAttr('buttonSize', attributes, manifest, componentName),
		buttonColor = checkAttr('buttonColor', attributes, manifest, componentName),
		buttonWidth = checkAttr('buttonWidth', attributes, manifest, componentName),
	} = attributes;

	const buttonWrapClass = classnames([
		selector(componentClass, `${componentClass}-wrap`),
		selector(buttonAlign, `${componentClass}-wrap`, 'align', buttonAlign),
		selector(blockClass, blockClass, `${selectorClass}-wrap`),
	]);

	const buttonClass = classnames([
		componentClass,
		selector(buttonSize, componentClass, 'size', buttonSize),
		selector(buttonColor, componentClass, 'color', buttonColor),
		selector(buttonWidth, componentClass, 'size-width', buttonWidth),
		selector(!(buttonContent && buttonUrl), `${componentClass}-placeholder`),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{buttonUse &&
				<div className={buttonWrapClass}>
					<RichText
						placeholder={placeholder}
						value={buttonContent}
						onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
						className={buttonClass}
						keepPlaceholderOnFocus
						formattingControls={[]}
					/>
				</div>
			}
		</Fragment>
	);
};
