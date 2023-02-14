import React, { useState } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { selector, props, checkAttr } from '@eightshift/frontend-libs/scripts';
import { ParagraphEditor } from '../../../components/paragraph/components/paragraph-editor';
import manifest from '../manifest.json';

export const AccordionItemEditor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
	} = attributes;

	const accordionItemStartOpen = checkAttr('accordionItemStartOpen', attributes, manifest);

	const accordionItemTriggerClass = selector(blockClass, blockClass, 'trigger');
	const accordionItemIconContainerClass = selector(blockClass, blockClass, 'icon-container');
	const accordionItemIconClass = selector(blockClass, blockClass, 'icon');
	const accordionItemPanelClass = selector(blockClass, blockClass, 'panel');
	const accordionItemContentClass = selector(blockClass, blockClass, 'content');

	const [open, setOpen] = useState(accordionItemStartOpen);

	return (
		<div className={blockClass} data-open={open}>
			<div className={accordionItemTriggerClass}>
				<ParagraphEditor
					{...props('trigger', attributes, {
						blockClass: blockClass,
						setAttributes: setAttributes,
					})}
				/>

				<button className={accordionItemIconContainerClass} onClick={() => setOpen(!open)}>
					<i className={accordionItemIconClass} dangerouslySetInnerHTML={{ __html: manifest.resources.icon }}></i>
				</button>
			</div>

			<section className={accordionItemPanelClass}>
				<div className={accordionItemContentClass}>
					<InnerBlocks />
				</div>
			</section>
		</div>
	);
};
