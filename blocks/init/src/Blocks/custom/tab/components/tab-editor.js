import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const TabEditor = (props) => {
	const { active, attributes } = props;

	const blockClass = checkAttr('blockClass', attributes, manifest);
	const blockJsClass = checkAttr('blockJsClass', attributes, manifest);

	const tabClassnames = classnames([
		blockJsClass,
		blockClass,
		active ? 'is-visible-tab' : ''
	]);
	
	return (
		<div className={tabClassnames}>
			<InnerBlocks />
		</div>
	);
};
