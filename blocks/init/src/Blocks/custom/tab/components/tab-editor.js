import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const TabEditor = (props) => {
	const { active, attributes } = props;

	const blockClass = checkAttr('blockClass', attributes, manifest);
	const blockJsClass = checkAttr('blockJsClass', attributes, manifest);
	const activeTabClass = selector(blockClass, blockClass, '', 'is-visible');
	
	const tabClassnames = classnames([
		blockJsClass,
		blockClass,
		active ? activeTabClass : ''
	]);
	
	return (
		<div className={tabClassnames}>
			<InnerBlocks />
		</div>
	);
};
