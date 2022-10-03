import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { icons, getAttrKey, getOption, IconLabel, CompactResponsive, SimpleHorizontalSingleSelect, checkAttr, VisibilityToggleResponsive, WidthOffsetRangeSlider, FancyDivider, CustomSlider, getDefaultBreakpointNames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ColumnOptions = ({ attributes, setAttributes }) => {
	const {
		responsiveAttributes: {
			columnHorizontalAlign,
			columnVerticalAlign,
		},
	} = manifest;

	return (
		<PanelBody title={__('Column', 'eightshift-frontend-libs')}>
			<WidthOffsetRangeSlider
				offsetAttributeName='columnOffset'
				widthAttributeName='columnWidth'
				manifest={manifest}
				attributes={attributes}
				setAttributes={setAttributes}
				showFullWidthToggle={false}
				includeGutters
				showOffsetAutoToggle
			/>

			<FancyDivider label={<IconLabel icon={icons.horizontalAlign} label={__('Alignment', 'eightshift-frontend-libs')} />} additionalClasses='es-mb-2.5' />

			<CompactResponsive
				label={__('Horizontal', 'eightshift-frontend-libs')}
				inheritButton={Object.values(columnHorizontalAlign).map((responsiveAttribute) => {
					const isInherited = checkAttr(responsiveAttribute, attributes, manifest, true) === undefined;

					return {
						callback: () => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: isInherited ? 'stretch' : undefined }),
						isActive: isInherited,
					};
				})}
				additionalClasses='-es-mb-0.5!'
			>
				{Object.values(columnHorizontalAlign).map((responsiveAttribute, index) =>
					<SimpleHorizontalSingleSelect
						key={index}
						value={checkAttr(responsiveAttribute, attributes, manifest, true)}
						options={getOption('columnHorizontalAlign', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: value })}
						border='offset'
						includeWpBottomSpacing={false}
						iconOnly
					/>
				)}
			</CompactResponsive>

			<CompactResponsive
				label={__('Vertical', 'eightshift-frontend-libs')}
				inheritButton={Object.values(columnVerticalAlign).map((responsiveAttribute) => {
					const isInherited = checkAttr(responsiveAttribute, attributes, manifest, true) === undefined;

					return {
						callback: () => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: isInherited ? 'stretch' : undefined }),
						isActive: isInherited,
					};
				})}
			>
				{Object.values(columnVerticalAlign).map((responsiveAttribute, index) =>
					<SimpleHorizontalSingleSelect
						key={index}
						value={checkAttr(responsiveAttribute, attributes, manifest, true)}
						options={getOption('columnVerticalAlign', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: value })}
						border='offset'
						includeWpBottomSpacing={false}
						iconOnly
					/>
				)}
			</CompactResponsive>

			<FancyDivider label={<IconLabel icon={icons.tools} label={__('Advanced', 'eightshift-frontend-libs')} />} additionalClasses='es-mb-2.5' />

			<CompactResponsive
				label={<IconLabel icon={icons.order} label={__('Order', 'eightshift-frontend-libs')} />}
				help={
				<>
					<span>{__('Forces column order, independent of the element order in the editor.', 'eightshift-frontend-libs')}</span>
					<br />
					<br />
					<span>{__('If not automatic, must be set on all the columns in the same Columns block.', 'eightshift-frontend-libs')}</span>
				</>
			}
				inheritButton={getDefaultBreakpointNames().map((breakpoint) => {
					const { columnOrder: attrNames } = manifest.responsiveAttributes;
					const breakpointAttrName = attrNames[breakpoint];
					const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest);

					const isInherited = typeof breakpointAttrValue === 'undefined' || breakpointAttrValue?.length === 0;

					return {
						callback: () => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: isInherited ? 0 : undefined }),
						isActive: isInherited,
					};
				})}
			>
				{getDefaultBreakpointNames().map((breakpoint, index) => {
					const { columnOrder: attrNames } = manifest.responsiveAttributes;
					const breakpointAttrName = attrNames[breakpoint];
					const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest);
					const { max, step } = manifest.options.columnOrder;

					const marks = { 0: icons.automatic };

					for (let i = 1; i <= max; i++) {
						marks[i] = i % 2 === 0 ? i : '';
					}

					return (
						<CustomSlider
							key={index}
							className={index !== 0 ? 'es-mb-m' : 'es-mb-s'}
							value={breakpointAttrValue}
							onChange={(value) => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: value })}
							min={0}
							max={max}
							step={step}
							marks={marks}
							hasInputField={false}
							hasValueDisplay={false}
							defaultValue={-1}
							hasCompactMarks={false}
						/>
					);
				})}
			</CompactResponsive>

			<VisibilityToggleResponsive
				attributeName='columnHide'
				manifest={manifest}
				attributes={attributes}
				setAttributes={setAttributes}
				label={__('Visibility', 'eightshift-frontend-libs')}
			/>
		</PanelBody>
	);
};
