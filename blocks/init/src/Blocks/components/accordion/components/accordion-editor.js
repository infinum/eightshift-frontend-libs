import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults, options } = manifest;

export const AccordionEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		accordionUse = defaults.accordionUse.default,

		accordionTitle,
		accordionContent,
		accordionIsOpen = defaults.accordionIsOpen.default,
	} = attributes;

	const accordionClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{accordionUse &&
				<div
					className={accordionClass}
					data-accordion-open={accordionIsOpen}>
					<button className={`${componentClass}__trigger`}>
						<RichText
							placeholder={placeholder}
							value={accordionTitle}
							onChange={(value) => setAttributes({ accordionTitle: value })}
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
