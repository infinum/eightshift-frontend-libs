import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { Control, IconToggle, checkAttr, getAttrKey, icons, props } from '@eightshift/frontend-libs/scripts';
import { ParagraphOptions } from '../../../components/paragraph/components/paragraph-options';
import manifest from '../manifest.json';

export const TableOfContentsOptions = ({ attributes, setAttributes }) => {
	const tableOfContentsHeadingLevels = checkAttr('tableOfContentsHeadingLevels', attributes, manifest);

	return (
		<PanelBody title={__('Table of contents', 'eightshift-frontend-libs')}>

			<Control icon={icons.headingLevelAlt} label={__('Heading levels to include', 'eightshift-frontend-libs')}>
				{Object.keys(tableOfContentsHeadingLevels).map((level, i, arr) => {
					return (
						<IconToggle
							key={i}
							checked={tableOfContentsHeadingLevels[level]}
							icon={icons.dummySpacer}
							label={level.replace('h', __('Heading', 'eightshift-frontend-libs') + ' ')}
							onChange={(value) => {
								const newValue = { ...tableOfContentsHeadingLevels };
								newValue[level] = value;

								setAttributes({ [getAttrKey('tableOfContentsHeadingLevels', attributes, manifest)]: newValue });
							}}
							reducedBottomSpacing={i < arr.length - 1}
							noBottomSpacing={i === arr.length - 1}
						/>
					);
				})}
			</Control>

			<ParagraphOptions
				{...props('paragraph', attributes, { setAttributes })}
				label={__('Caption', 'eightshift-frontend-libs')}
				noBottomSpacing
			/>
		</PanelBody>
	);
};
