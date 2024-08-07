import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { Control, IconToggle, checkAttr, getAttrKey, props } from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import { ParagraphOptions } from '../../../components/paragraph/components/paragraph-options';
import manifest from '../manifest.json';

export const TableOfContentsOptions = ({ attributes, setAttributes }) => {
	const tableOfContentsHeadingLevels = checkAttr('tableOfContentsHeadingLevels', attributes, manifest);

	return (
		<PanelBody title={__('Table of contents', '%g_textdomain%')}>

			<Control icon={icons.headingLevelAlt} label={__('Heading levels to include', '%g_textdomain%')}>
				{Object.keys(tableOfContentsHeadingLevels).map((level, i, arr) => {
					return (
						<IconToggle
							key={i}
							checked={tableOfContentsHeadingLevels[level]}
							icon={icons.dummySpacer}
							label={level.replace('h', __('Heading', '%g_textdomain%') + ' ')}
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
				label={__('Caption', '%g_textdomain%')}
				noBottomSpacing
			/>
		</PanelBody>
	);
};
