import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { responsiveSelectors, checkAttr, checkAttrResponsive } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ColumnsEditor = ({ attributes }) => {
	const {
		globalVariables: {
			customBlocksName: globalManifestCustomBlocksName,
		},
	} = globalManifest;

	const {
		blockClass,

		columnsAllowedBlocks = checkAttr('columnsAllowedBlocks', attributes, manifest),
		columnsGutter = checkAttrResponsive('columnsGutter', attributes, manifest),
		columnsVerticalSpacing = checkAttrResponsive('columnsVerticalSpacing', attributes, manifest),
	} = attributes;

	const componentClass = classnames([
		blockClass,
		globalManifestCustomBlocksName,
		responsiveSelectors(columnsGutter, 'gutter', blockClass),
		responsiveSelectors(columnsVerticalSpacing, 'vertical-spacing', blockClass),
	]);

	return (
		<div className={componentClass}>
			<InnerBlocks
				allowedBlocks={(typeof columnsAllowedBlocks === 'undefined') || columnsAllowedBlocks}
			/>
		</div>
	);
};
