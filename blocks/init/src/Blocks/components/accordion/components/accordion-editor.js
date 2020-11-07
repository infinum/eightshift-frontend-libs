import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

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
		accordionIcon = <svg xmlns="http://www.w3.org/2000/svg" width="199.404" height="199.404" viewBox="0 0 200 200"><path d="M199.404 63.993L171.12 35.709l-71.418 71.418-71.418-71.418L0 63.993l99.702 99.702z" /></svg>,
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
						/>
						<div className={`${componentClass}__icon`}>
							{accordionIcon}
						</div>
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
