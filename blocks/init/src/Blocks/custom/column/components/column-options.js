import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { icons, getAttrKey, getOption, IconLabel, CompactResponsive, SimpleHorizontalSingleSelect, checkAttr, SpacingSlider, VisibilityToggleResponsive, WidthOffsetRangeSlider, FancyDivider } from '@eightshift/frontend-libs/scripts';
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

			<SpacingSlider
				icon={icons.order}
				label={__('Order', 'eightshift-frontend-libs')}
				attributeName='columnOrder'
				attributes={attributes}
				setAttributes={setAttributes}
				manifest={manifest}
				markSteps={2}
				hasInputField={false}
				hasValueDisplay
				valueDisplayFormat={(v) => !isNaN(v) && v > 0 ? v : icons.automatic}
				showDisableButton
				disableWithUndefined
				isNumeric
				customProps={{ hasCompactMarks: false }}
				help={__('Forces an item order, independent of the actual element order. To be effective, must be set on all the columns in the same Columns block.')}
			/>

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
