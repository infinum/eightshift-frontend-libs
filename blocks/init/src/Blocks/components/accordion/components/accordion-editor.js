import React from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const AccordionEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
		options: manifestOptions,
	} = manifest;
	
	const {
		setAttributes,
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		accordionUse = checkAttr('accordionUse', attributes, manifest, componentName),

		accordionTitle = checkAttr('accordionTitle', attributes, manifest, componentName),
		accordionContent = checkAttr('accordionContent', attributes, manifest, componentName),
	} = attributes;

	const options = {...manifestOptions, ...attributes.options};

	const accordionClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{accordionUse &&
				<div
					className={accordionClass}
					data-accordion-open={true}>
					<button className={`${componentClass}__trigger`}>
						<RichText
							placeholder={placeholder}
							value={accordionTitle}
							onChange={(value) => setAttributes({ [`${componentName}Title`]: value })}
							keepPlaceholderOnFocus
							allowedFormats={[]}
						/>
						<div className={`${componentClass}__icon`} dangerouslySetInnerHTML={{ __html: options.icon }}></div>
					</button>
					<section className={`${componentClass}__panel`}>
						<div className={`${componentClass}__content`}>
							{accordionContent}
						</div>
					</section>
				</div>
			}
		</>
	);
};
