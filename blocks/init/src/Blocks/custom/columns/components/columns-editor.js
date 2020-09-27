/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import classnames from 'classnames';
import { responsiveSelectors } from '@eightshift/frontend-libs/scripts/helpers';
import { InnerBlocks } from '@wordpress/block-editor';
import globalManifest from './../../../manifest.json';

export const ColumnsEditor = ({ attributes }) => {
	const {
		allowedBlocks,
		blockClass,
		gutter,
		verticalSpacing,
	} = attributes;

	const componentClass = classnames(
		blockClass,
		globalManifest.globalVariables.customBlocksName,
		`${responsiveSelectors(gutter, 'gutter', blockClass)}`,
		`${responsiveSelectors(verticalSpacing, 'vertical-spacing', blockClass)}`,
	);

	return (
		<div className={componentClass}>
			<InnerBlocks
				allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
			/>
		</div>
	);
};
