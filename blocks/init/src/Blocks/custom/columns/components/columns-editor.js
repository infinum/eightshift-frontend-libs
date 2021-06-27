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
	} = attributes;

	const columnsAllowedBlocks = checkAttr('columnsAllowedBlocks', attributes, manifest);
	const columnsGutter = checkAttrResponsive('columnsGutter', attributes, manifest);
	const columnsVerticalSpacing = checkAttrResponsive('columnsVerticalSpacing', attributes, manifest);

	const columnsClass = classnames([
		blockClass,
		globalManifestCustomBlocksName,
		responsiveSelectors(columnsGutter, 'gutter', blockClass),
		responsiveSelectors(columnsVerticalSpacing, 'vertical-spacing', blockClass),
	]);

	return (
		<div className={columnsClass}>
			<InnerBlocks
				allowedBlocks={(typeof columnsAllowedBlocks === 'undefined') || columnsAllowedBlocks}
			/>
		</div>
	);
};
