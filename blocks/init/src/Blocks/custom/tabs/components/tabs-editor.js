import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { checkAttr, selector, icons } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const TabsEditor = (props) => {
	const {
		attributes,
		clientId,
		inner
	} = props;

	const {
		blockClass,
		activeTab,
		setActiveTab
	} = attributes;

	const tabPanelItemElement = 'panel-item';
	const tabPanelItemButtonElement = `${tabPanelItemElement}-button`;
	const tabPanelItemActiveClass = 'is-active';
	const tabPanelAddTabButtonElement = `${tabPanelItemButtonElement}-add`;
	const tabsAllowedBlocks = checkAttr('tabsAllowedBlocks', attributes, manifest);

	const newTabTemplate = [
		['eightshift-boilerplate/tab',
			{},
			[
				['eightshift-boilerplate/paragraph']
			]
		]
	];

	const tabItems = inner.map((block) => {
		const classes = classnames([
			selector(tabPanelItemElement, blockClass, tabPanelItemElement),
			activeTab === block.tabId ? tabPanelItemActiveClass : ''
		])

		return (
			<li
				key={block.tabId}
				className={classes}
			>
				<button
					onClick={() => {
						setActiveTab(block.tabId);
					}}
					className={selector(tabPanelItemButtonElement, blockClass, tabPanelItemButtonElement)}
				>
					<RichText
						tagname=""
						withoutInteractiveFormatting={true}
						value={block.tabTitle}
						onChange={(title) => wp.data.dispatch('core/block-editor').updateBlockAttributes(block.clientId, { 'tabTitle': title })}
						placeholder={ __( 'New tab name...' , 'eightshift-frontend-libs') }
					/>
				</button>
			</li>
		);
	});

	const addInnerBlock = () => {
		const innerCount = inner?.length ?? 0;
		const block = createBlock('eightshift-boilerplate/tab');
		wp.data.dispatch('core/block-editor').insertBlock(block, innerCount, clientId);
	};

	
	return (
		<div className={blockClass}>
			<ul className="block-tabpanel">
				{tabItems}
				<li className={selector(tabPanelItemElement, blockClass, tabPanelItemElement)}>
					<Button
						isSecondary
						isSmall
						onClick={addInnerBlock}
						icon={icons.add}
						className={selector(tabPanelAddTabButtonElement, blockClass, tabPanelAddTabButtonElement)}
						label={__('Add tab', 'eightshift-frontend-libs')}
					/>
				</li>
			</ul>
			
			<InnerBlocks
				allowedBlocks={(typeof tabsAllowedBlocks === 'undefined') || tabsAllowedBlocks}
				orientation="horizontal"
				template={newTabTemplate}
				renderAppender={() => null}
			/>
		</div>
	);
}
