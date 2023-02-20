import React, { Fragment } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { icons, getAttrKey, getOption, IconLabel, Responsive, OptionSelector, checkAttr, WidthOffsetRangeSlider, generateWidthOffsetRangeSliderConfig, getDefaultBreakpointNames, NumberPicker, AnimatedContentVisibility, Section, Control, Notification, generateResponsiveToggleButtonConfig, ResponsiveToggleButton } from '@eightshift/frontend-libs/scripts';
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
				{...generateWidthOffsetRangeSliderConfig({
					offsetAttributeName: 'columnOffset',
					widthAttributeName: 'columnWidth',
					manifest: manifest,
					attributes: attributes,
					setAttributes: setAttributes,
					showFullWidthToggle: false,
					includeGutters: true,
					showOffsetAutoToggle: true,
					numOfColumns: 14,
				})}
			/>

			<Section icon={icons.alignHorizontalVerticalAlt} label={__('Alignment', 'eightshift-frontend-libs')}>
				<Responsive
					label={__('Horizontal', 'eightshift-frontend-libs')}
					inheritButton={Object.values(columnHorizontalAlign).map((responsiveAttribute) => {
						const isInherited = checkAttr(responsiveAttribute, attributes, manifest, true) === undefined;

						return {
							callback: () => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: isInherited ? 'stretch' : undefined }),
							isActive: isInherited,
						};
					})}
				>
					{Object.values(columnHorizontalAlign).map((responsiveAttribute, index) =>
						<OptionSelector
							key={index}
							value={checkAttr(responsiveAttribute, attributes, manifest, true)}
							options={getOption('columnHorizontalAlign', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: value })}
							noBottomSpacing
							iconOnly
						/>
					)}
				</Responsive>

				<Responsive
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
						<OptionSelector
							key={index}
							value={checkAttr(responsiveAttribute, attributes, manifest, true)}
							options={getOption('columnVerticalAlign', attributes, manifest)}
							onChange={(value) => setAttributes({ [getAttrKey(responsiveAttribute, attributes, manifest)]: value })}
							noBottomSpacing
							iconOnly
						/>
					)}
				</Responsive>
			</Section>

			<Section icon={icons.tools} label={__('Advanced', 'eightshift-frontend-libs')} noBottomSpacing>
				<ResponsiveToggleButton
					{...generateResponsiveToggleButtonConfig({
						attributeName: 'columnHide',
						attributes: attributes,
						setAttributes: setAttributes,
						manifest: manifest,
					})}
					label={__('Hide', 'eightshift-frontend-libs')}
					icon={icons.hide}
				/>

				<Responsive
					label={<IconLabel icon={icons.order} label={__('Order', 'eightshift-frontend-libs')} />}
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
					noBottomSpacing
				>
					{getDefaultBreakpointNames().map((breakpoint, index) => {
						const { columnOrder: attrNames } = manifest.responsiveAttributes;
						const breakpointAttrName = attrNames[breakpoint];
						const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest);
						const { max, step } = manifest.options.columnOrder;

						const isAuto = typeof breakpointAttrValue === 'undefined' || breakpointAttrValue?.length === 0;

						let options = [
							{ label: __('Auto', 'eightshift-frontend-libs'), value: true, icon: icons.automatic },
							{ label: __('Manual', 'eightshift-frontend-libs'), value: false, icon: icons.pointerHand },
						];

						return (
							<Fragment key={index}>
								<Control
									help={
										isAuto
											? __('Follows the order of elements in the editor', 'eightshift-frontend-libs')
											: __('Forces column order, independent of the element order in the editor', 'eightshift-frontend-libs')
									}
									noBottomSpacing
								>
									<div className='es-h-spaced es-gap-3!'>
										<OptionSelector
											options={options}
											value={isAuto}
											onChange={(value) => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: value ? undefined : 1 })}
											additionalButtonClass='es-v-spaced es-content-center! es-nested-m-0! es-h-16 es-w-16 es-nested-flex-shrink-0 es-text-3 es-gap-0.1!'
											noBottomSpacing
										/>

										<AnimatedContentVisibility showIf={!isAuto}>
											<NumberPicker
												label={__('Position', 'eightshift-frontend-libs')}
												value={breakpointAttrValue}
												onChange={(value) => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: value })}
												min={1}
												max={max}
												step={step}
												fixedWidth={3}
												noBottomSpacing
											/>
										</AnimatedContentVisibility>
									</div>
								</Control>

								<AnimatedContentVisibility showIf={!isAuto && index === 0} additionalContainerClasses='es-mt-2'>
									<Notification
										type='info'
										text={__('Note', 'eightshift-frontend-libs')}
										subtitle={__('Make sure to set the order all other columns in the same Columns block', 'eightshift-frontend-libs')}
										noBottomSpacing
									/>
								</AnimatedContentVisibility>
							</Fragment>
						);
					})}
				</Responsive>
			</Section>

		</PanelBody>
	);
};
