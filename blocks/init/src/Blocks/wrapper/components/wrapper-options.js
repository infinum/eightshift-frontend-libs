import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Button, PanelBody, TextControl, BaseControl } from '@wordpress/components';

import {
	checkAttr,
	checkAttrResponsive,
	icons,
	getOption,
	IconLabel,
	IconToggle,
	CompactResponsive,
	Collapsable,
	ColorPickerComponent,
	SpacingSlider,
	WidthOffsetRangeSlider,
	VisibilityToggleResponsive,
	getDefaultBreakpointNames,
} from '@eightshift/frontend-libs/scripts';

import manifest from './../manifest.json';

export const WrapperOptions = ({ attributes, setAttributes }) => {
	const {
		responsiveAttributes: manifestResponsiveAttributes,
	} = manifest;

	const {
		label = __('Layout', 'eightshift-frontend-libs'),
		showWrapperId = true,
		showWrapperAnchorId = true,
		showWrapperBgColorPicker = true,
		showWrapperWidth = true,
		showWrapperOffset = true,
		showWrapperSpacingTop = true,
		showWrapperSpacingBottom = true,
		showWrapperSpacingTopIn = true,
		showWrapperSpacingBottomIn = true,
		showWrapperDividerColor = true,
		showWrapperDividerTop = true,
		showWrapperDividerBottom = true,
		showWrapperDividerLeft = true,
		showWrapperDividerRight = true,
		showWrapperHide = true,
		showWrapperIsFullWidth = true,
		showWrapperRoundedCorners = true,
	} = attributes;

	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);

	if (wrapperDisable) {
		return null;
	}

	// This must be set as a separate variable due to collisions with the useState and hooks.
	const dividerColors = getOption('wrapperDividerColor', attributes, manifest, true);
	const backgroundColors = getOption('wrapperBgColorProject', attributes, manifest, true);

	const isEditMode = useSelect((select) => select('core/block-editor').isNavigationMode());

	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseShowControl = checkAttr('wrapperUseShowControl', attributes, manifest);
	const wrapperUseInner = checkAttr('wrapperUseInner', attributes, manifest);
	const wrapperUseSimple = checkAttr('wrapperUseSimple', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperAnchorId = checkAttr('wrapperAnchorId', attributes, manifest);

	const wrapperBgColorProject = checkAttr('wrapperBgColorProject', attributes, manifest);
	const wrapperDividerColor = checkAttr('wrapperDividerColor', attributes, manifest);

	const wrapperDividerTop = checkAttrResponsive('wrapperDividerTop', attributes, manifest, true);
	const wrapperDividerBottom = checkAttrResponsive('wrapperDividerBottom', attributes, manifest, true);
	const wrapperDividerLeft = checkAttrResponsive('wrapperDividerLeft', attributes, manifest, true);
	const wrapperDividerRight = checkAttrResponsive('wrapperDividerRight', attributes, manifest, true);

	// Copy/paste attributes.
	const copyAttributes = (e) => {
		e.stopPropagation();

		localStorage.removeItem('esCopiedWrapperAttributes');

		const copiedWrapperAttributes = Object.keys(attributes).filter((key) => key.includes('wrapper'))
			.reduce((cur, key) => {
				cur[key] = attributes[key];
				return cur;
			}, {});

		localStorage.setItem('esCopiedWrapperAttributes', JSON.stringify(copiedWrapperAttributes));
	};

	const pasteAttributes = (e) => {
		e.stopPropagation();

		const wrapperAttributesToBePasted = JSON.parse(localStorage.getItem('esCopiedWrapperAttributes'));
		setAttributes(wrapperAttributesToBePasted);
	};

	return (
		<PanelBody initialOpen={isEditMode ?? false}
			title={
				<div className='es-h-between es-w-full'>
					<div className='es-h-spaced'>
						{icons.layout}
						{label}
					</div>

					{!wrapperDisable && wrapperUseShowControl &&
						<div className='es-display-flex es-items-center es-gap-1.0 es-ml-auto es-flex-shrink-0 es-mr-1.0 es-wrapper-options-copy-paste'>
							<Button
								icon={icons.copy}
								onClick={copyAttributes}
								className='es-button-icon-20 es-button-square-24 es-rounded-0.5'
								label={__('Copy configuration', 'eightshift-frontend-libs')}
								showTooltip
							/>

							<Button
								icon={icons.paste}
								onClick={pasteAttributes}
								disabled={!localStorage?.getItem('esCopiedWrapperAttributes')}
								className='es-button-icon-20 es-button-square-24 es-rounded-0.5'
								label={__('Paste configuration', 'eightshift-frontend-libs')}
								showTooltip
							/>
						</div>
					}
				</div>
			}
		>
			{wrapperUseShowControl &&
				<IconToggle
					icon={icons.wrapper}
					label={__('Wrapper', 'eightshift-frontend-libs')}
					checked={wrapperUse}
					onChange={(value) => setAttributes({ wrapperUse: value })}
					additionalClasses='es-mt-2'
				/>
			}

			{wrapperUse &&
				<>
					{!wrapperUseSimple && wrapperUseInner && showWrapperWidth && showWrapperOffset &&
						<WidthOffsetRangeSlider
							isFullWidthAttributeName='wrapperIsFullWidth'
							offsetAttributeName='wrapperOffset'
							widthAttributeName='wrapperWidth'
							manifest={manifest}
							attributes={attributes}
							setAttributes={setAttributes}
							showFullWidth={showWrapperIsFullWidth}
							minMaxStepOptionName='widths'
						/>
					}

					{showWrapperSpacingBottom &&
						<SpacingSlider
							icon={icons.spacingBottom}
							label={__('Bottom spacing', 'eightshift-frontend-libs')}
							minMaxStepOptionName='wrapperSectionSpacing'
							attributeName='wrapperSpacingBottom'
							attributes={attributes}
							setAttributes={setAttributes}
							manifest={manifest}
							compensateForRemBase10
							showMarks={false}
							customProps={{
								marks: {
									'-300': '-3',
									'-250': '',
									'-200': '-2',
									'-150': '',
									'-100': '-1',
									'-50': '',
									0: '0',
									50: '',
									100: '1',
									150: '',
									200: '2',
									250: '',
									300: '3',
								},
							}}
						/>
					}

					{showWrapperSpacingTop &&
						<SpacingSlider
							icon={icons.spacingTop}
							label={__('Top spacing', 'eightshift-frontend-libs')}
							minMaxStepOptionName='wrapperSectionSpacing'
							attributeName='wrapperSpacingTop'
							attributes={attributes}
							setAttributes={setAttributes}
							manifest={manifest}
							showDisableButton
							compensateForRemBase10
							showMarks={false}
							customProps={{
								marks: {
									'-300': '-3',
									'-250': '',
									'-200': '-2',
									'-150': '',
									'-100': '-1',
									'-50': '',
									0: '0',
									50: '',
									100: '1',
									150: '',
									200: '2',
									250: '',
									300: '3',
								},
							}}
						/>
					}

					{showWrapperSpacingTopIn &&
						<SpacingSlider
							icon={icons.spacingTopIn}
							label={__('Top inner spacing', 'eightshift-frontend-libs')}
							minMaxStepOptionName='wrapperSectionInnerSpacing'
							attributeName='wrapperSpacingTopIn'
							attributes={attributes}
							setAttributes={setAttributes}
							manifest={manifest}
							showDisableButton
							compensateForRemBase10
							showMarks={false}
							customProps={{
								marks: {
									0: '0',
									50: '',
									100: '100',
									150: '',
									200: '200',
									250: '',
									300: '300',
								}
							}}
						/>
					}

					{showWrapperSpacingBottomIn &&
						<SpacingSlider
							icon={icons.spacingBottomIn}
							label={__('Bottom inner spacing', 'eightshift-frontend-libs')}
							minMaxStepOptionName='wrapperSectionInnerSpacing'
							attributeName='wrapperSpacingBottomIn'
							attributes={attributes}
							setAttributes={setAttributes}
							manifest={manifest}
							showDisableButton
							compensateForRemBase10
							showMarks={false}
							customProps={{
								marks: {
									0: '0',
									50: '',
									100: '100',
									150: '',
									200: '200',
									250: '',
									300: '300',
								}
							}}
						/>
					}

					{showWrapperBgColorPicker &&
						<ColorPickerComponent
							label={<IconLabel icon={icons.backgroundTypeAlt2} label={__('Background color', 'eightshift-frontend-libs')} />}
							colors={[{ name: __('None', 'eightshift-frontend-libs'), slug: undefined, color: 'transparent' }, ...backgroundColors]}
							value={wrapperBgColorProject}
							onChange={(value) => setAttributes({ wrapperBgColorProject: value })}
							pickerPopupTitle={__('Background color', 'eightshift-frontend-libs')}
							includeWpBottomSpacing
							groupShades
							canReset
						/>
					}

					{(showWrapperDividerTop || showWrapperDividerBottom || showWrapperDividerColor || showWrapperRoundedCorners) &&
						<Collapsable label={<IconLabel icon={icons.design} label={__('Design', 'eightshift-frontend-libs')} subtitle={__('Rounded corners, dividers', 'eightshift-frontend-libs')} standalone />}>
							{showWrapperRoundedCorners &&
								<SpacingSlider
									icon={icons.roundedCorners}
									label={__('Rounded corners', 'eightshift-frontend-libs')}
									attributeName='wrapperRoundedCorners'
									attributes={attributes}
									setAttributes={setAttributes}
									manifest={manifest}
									compensateForRemBase10
									showDisableButton
									markSteps={25}
								/>
							}

							{(showWrapperDividerTop || showWrapperDividerBottom) &&
								<CompactResponsive label={<IconLabel icon={icons.divider} label={__('Dividers', 'eightshift-frontend-libs')} />} additionalClasses={showWrapperDividerColor ? '-es-mb-s-important' : ''}>
									{getDefaultBreakpointNames().map((breakpoint, index) => {
										const { wrapperDividerTop: attrNamesTop } = manifestResponsiveAttributes;
										const breakpointAttrNameTop = attrNamesTop[breakpoint];
										const breakpointAttrValueTop = wrapperDividerTop[breakpoint];

										const { wrapperDividerBottom: attrNamesBottom } = manifestResponsiveAttributes;
										const breakpointAttrNameBottom = attrNamesBottom[breakpoint];
										const breakpointAttrValueBottom = wrapperDividerBottom[breakpoint];

										const { wrapperDividerLeft: attrNamesLeft } = manifestResponsiveAttributes;
										const breakpointAttrNameLeft = attrNamesLeft[breakpoint];
										const breakpointAttrValueLeft = wrapperDividerLeft[breakpoint];

										const { wrapperDividerRight: attrNamesRight } = manifestResponsiveAttributes;
										const breakpointAttrNameRight = attrNamesRight[breakpoint];
										const breakpointAttrValueRight = wrapperDividerRight[breakpoint];

										return (
											<div className='es-v-spaced es-gap-0-important' key={index}>
												{index !== 0 &&
													<BaseControl label={<IconLabel icon={icons.inherit} label={__('Inherit', 'eightshift-frontend-libs')} />}>
														<div className='es-h-end es-mr-s'>
															{showWrapperDividerTop &&
																<Button
																	isSmall
																	isPressed={breakpointAttrValueTop === undefined}
																	onClick={() => setAttributes({ [breakpointAttrNameTop]: breakpointAttrValueTop === undefined ? false : undefined })}
																	className='es-slight-button-border'
																>
																	{__('Top', 'eightshift-frontend-libs')}
																</Button>
															}

															{showWrapperDividerRight &&
																<Button
																	isSmall
																	isPressed={breakpointAttrValueRight === undefined}
																	onClick={() => setAttributes({ [breakpointAttrNameRight]: breakpointAttrValueRight === undefined ? false : undefined })}
																	className='es-slight-button-border'
																>
																	{__('Right', 'eightshift-frontend-libs')}
																</Button>
															}

															{showWrapperDividerBottom &&
																<Button
																	isSmall
																	isPressed={breakpointAttrValueBottom === undefined}
																	onClick={() => setAttributes({ [breakpointAttrNameBottom]: breakpointAttrValueBottom === undefined ? false : undefined })}
																	className='es-slight-button-border'
																>
																	{__('Bottom', 'eightshift-frontend-libs')}
																</Button>
															}

															{showWrapperDividerLeft &&
																<Button
																	isSmall
																	isPressed={breakpointAttrValueLeft === undefined}
																	onClick={() => setAttributes({ [breakpointAttrNameLeft]: breakpointAttrValueLeft === undefined ? false : undefined })}
																	className='es-slight-button-border'
																>
																	{__('Left', 'eightshift-frontend-libs')}
																</Button>
															}
														</div>
													</BaseControl>
												}

												{!(breakpointAttrValueTop === undefined && breakpointAttrValueBottom === undefined && breakpointAttrValueLeft === undefined && breakpointAttrValueRight === undefined) &&
													<div className='es-wrapper-border-control es-mx-auto'>
														<div
															className='es-wrapper-border-display'
															style={{
																borderTop: breakpointAttrValueTop === true ? '3px solid var(--wp-admin-theme-color, var(--es-admin-accent-color-default))' : '3px solid var(--es-admin-gray-250)',
																borderLeft: breakpointAttrValueLeft === true ? '3px solid var(--wp-admin-theme-color, var(--es-admin-accent-color-default))' : '3px solid var(--es-admin-gray-250)',
																borderBottom: breakpointAttrValueBottom === true ? '3px solid var(--wp-admin-theme-color, var(--es-admin-accent-color-default))' : '3px solid var(--es-admin-gray-250)',
																borderRight: breakpointAttrValueRight === true ? '3px solid var(--wp-admin-theme-color, var(--es-admin-accent-color-default))' : '3px solid var(--es-admin-gray-250)',
															}}
														>
															{showWrapperDividerColor && (breakpointAttrValueTop || breakpointAttrValueLeft || breakpointAttrValueBottom || breakpointAttrValueRight) &&
																<ColorPickerComponent
																	colors={[{ name: __('None', 'eightshift-frontend-libs'), slug: undefined, color: 'transparent' }, ...dividerColors]}
																	value={wrapperDividerColor}
																	onChange={(value) => setAttributes({ wrapperDividerColor: value })}
																	additionalClasses='es-w-6 es-h-6'
																	additionalTriggerClasses='es-p-0! es-button-square-24'
																	pickerPopupTitle={__('Divider color', 'eightshift-frontend-libs')}
																/>
															}
														</div>

														{showWrapperDividerTop && (index === 0 || (index !== 0 && breakpointAttrValueTop !== undefined)) &&
															<Button
																style={{ gridColumn: 2, gridRow: 1 }}
																icon={React.cloneElement(icons.toggleOff, {
																	className: `es-animated-toggle-icon ${breakpointAttrValueTop === true ? 'is-checked' : ''}`
																})}
																onClick={() => setAttributes({ [breakpointAttrNameTop]: !breakpointAttrValueTop })}
																disabled={breakpointAttrValueTop === undefined}
																label={__('Top divider', 'eightshift-frontend-libs')}
																showTooltip
																className='es-button-square-30 es-button-icon-24'
															/>
														}

														{showWrapperDividerBottom && (index === 0 || (index !== 0 && breakpointAttrValueBottom !== undefined)) &&
															<Button
																style={{ gridColumn: 2, gridRow: 3 }}
																icon={React.cloneElement(icons.toggleOff, {
																	className: `es-animated-toggle-icon ${breakpointAttrValueBottom === true ? 'is-checked' : ''}`
																})}
																onClick={() => setAttributes({ [breakpointAttrNameBottom]: !breakpointAttrValueBottom })}
																disabled={breakpointAttrValueBottom === undefined}
																label={__('Bottom divider', 'eightshift-frontend-libs')}
																showTooltip
																className='es-button-square-30 es-button-icon-24'
															/>
														}

														{showWrapperDividerLeft && (index === 0 || (index !== 0 && breakpointAttrValueLeft !== undefined)) &&
															<Button
																style={{ gridColumn: 1, gridRow: 2 }}
																icon={React.cloneElement(icons.toggleOff, {
																	className: `es-animated-toggle-icon ${breakpointAttrValueLeft === true ? 'is-checked' : ''}`
																})}
																onClick={() => setAttributes({ [breakpointAttrNameLeft]: !breakpointAttrValueLeft })}
																disabled={breakpointAttrValueLeft === undefined}
																label={__('Left divider', 'eightshift-frontend-libs')}
																showTooltip
																className='es-button-square-30 es-button-icon-24'
															/>
														}

														{showWrapperDividerRight && (index === 0 || (index !== 0 && breakpointAttrValueRight !== undefined)) &&
															<Button
																style={{ gridColumn: 3, gridRow: 2 }}
																icon={React.cloneElement(icons.toggleOff, {
																	className: `es-animated-toggle-icon ${breakpointAttrValueRight === true ? 'is-checked' : ''}`
																})}
																onClick={() => setAttributes({ [breakpointAttrNameRight]: !breakpointAttrValueRight })}
																disabled={breakpointAttrValueRight === undefined}
																label={__('Right divider', 'eightshift-frontend-libs')}
																showTooltip
																className='es-button-square-30 es-button-icon-24'
															/>
														}
													</div>
												}
											</div>
										);
									})}
								</CompactResponsive>
							}


						</Collapsable>
					}


					{(showWrapperAnchorId || showWrapperId || showWrapperHide) &&
						<Collapsable label={<IconLabel icon={icons.tools} label={__('Advanced', 'eightshift-frontend-libs')} subtitle={__('Visibility, IDs', 'eightshift-frontend-libs')} standalone />}>
							{showWrapperHide &&
								<VisibilityToggleResponsive
									attributeName='wrapperHide'
									label={__('Visibility', 'eightshift-frontend-libs')}
									manifest={manifest}
									attributes={attributes}
									setAttributes={setAttributes}
								/>
							}

							{showWrapperAnchorId &&
								<TextControl
									label={<IconLabel icon={icons.anchor} label={__('Block Anchor ID', 'eightshift-frontend-libs')} />}
									value={wrapperAnchorId}
									onChange={(value) => setAttributes({ wrapperAnchorId: value })}
									className='es-mb-m-important'
								/>
							}

							{showWrapperId &&
								<TextControl
									label={<IconLabel icon={icons.id} label={__('Block unique identifier', 'eightshift-frontend-libs')} />}
									value={wrapperId}
									onChange={(value) => setAttributes({ wrapperId: value })}
								/>
							}
						</Collapsable>
					}
				</>
			}
		</PanelBody>
	);
};
