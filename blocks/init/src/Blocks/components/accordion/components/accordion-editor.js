import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options } = manifest;

export const AccordionEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		accordionUse = checkAttr('accordionUse', attributes, manifest, componentName),

		accordionTitle = checkAttr('accordionTitle', attributes, manifest, componentName),
		accordionContent = checkAttr('accordionContent', attributes, manifest, componentName),
	} = attributes;

	const accordionClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
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
							formattingControls={[]}
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
		</Fragment>
	);
};
