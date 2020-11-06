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
					data-accordion-opened={accordionIsOpen}>
					<button className={`${componentClass}__trigger`}>
						<RichText
							placeholder={placeholder}
							value={accordionTitle}
							onChange={(value) => setAttributes({ accordionTitle: value })}
							keepPlaceholderOnFocus
						/>
						<div className={`${componentClass}__icon`}>
							<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
								<g transform="translate(1 1)" fill="none" fillRule="evenodd">
									<circle stroke="#979797" cx="14" cy="14" r="14" />
									<g stroke="#717171" strokeLinecap="square">
										<path d="M6.341 14h14.318M13.969 7v14" className={`${componentClass}__icon--plus`}/>
										<path d="M6.341 14h14.318" className={`${componentClass}__icon--minus`}/>
									</g>
								</g>
							</svg>
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
