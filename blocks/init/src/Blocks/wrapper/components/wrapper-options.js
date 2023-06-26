import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect, dispatch } from '@wordpress/data';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import {
	checkAttr,
	checkAttrResponsive,
	icons,
	getOption,
	IconLabel,
	Responsive,
	ColorPicker,
	WidthOffsetRangeSlider,
	OptionSelector,
	generateWidthOffsetRangeSliderConfig,
	getDefaultBreakpointNames,
	Section,
	generateResponsiveNumberPickerConfig,
	ResponsiveNumberPicker,
	Collapsable,
	ucfirst,
	AdvancedColorPicker,
	generateResponsiveToggleButtonConfig,
	ResponsiveToggleButton,
	PresetPicker,
} from '@eightshift/frontend-libs/scripts';
import { WRAPPER_STORE_NAME } from '../wrapper-stores';

import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperOptions = ({ attributes, setAttributes }) => {
	const {
		label = __('Spacing & layout', 'eightshift-frontend-libs'),
		showWrapperId = true,
		showWrapperAnchorId = true,
		showWrapperBgColorPicker = true,
		showWrapperWidth = true,
		showWrapperOffset = true,
		showWrapperTag = true,
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

		noLeftSpacingSelector = false,
		noRightSpacingSelector = false,
		noLeftSpacingInSelector = false,
		noRightSpacingInSelector = false,

		wrapperHidePresets = false,
		wrapperPresetNoCollapsable = false,
		wrapperOnlyPresets = false,
		wrapperHideDefaultPreset = false,

		blockClientId,
	} = attributes;

	const wrapperNoControls = checkAttr('wrapperNoControls', attributes, manifest);

	if (wrapperNoControls) {
		return null;
	}

	// This must be set as a separate variable due to collisions with the useState and hooks.
	const dividerColors = getOption('wrapperDividerColor', attributes, manifest, true);
	const backgroundColors = getOption('wrapperBgColorProject', attributes, manifest, true);

	const wrapperTagOptions = getOption('wrapperTag', attributes, manifest);

	const isEditMode = useSelect((select) => select('core/block-editor').isNavigationMode());

	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseShowControl = checkAttr('wrapperUseShowControl', attributes, manifest);
	const wrapperSimpleShowControl = checkAttr('wrapperSimpleShowControl', attributes, manifest);
	const wrapperUseInner = checkAttr('wrapperUseInner', attributes, manifest);
	const wrapperSimple = checkAttr('wrapperSimple', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperAnchorId = checkAttr('wrapperAnchorId', attributes, manifest);
	const wrapperTag = checkAttr('wrapperTag', attributes, manifest);

	const wrapperBgColorType = checkAttr('wrapperBgColorType', attributes, manifest);
	const wrapperBgColorProject = checkAttr('wrapperBgColorProject', attributes, manifest);
	const wrapperBgColorGradient = checkAttr('wrapperBgColorGradient', attributes, manifest);
	const wrapperDividerColor = checkAttr('wrapperDividerColor', attributes, manifest);

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

	let wrapperUseOptions = [
		{
			label: __('Just the block', 'eightshift-frontend-libs'),
			value: 'off',
			icon: icons.wrapperOffAlt,
		}
	];

	if (wrapperSimpleShowControl) {
		wrapperUseOptions = [...wrapperUseOptions, {
			label: __('Spacing only', 'eightshift-frontend-libs'),
			value: 'simple',
			icon: icons.wrapperSimpleAlt,
		}];
	}

	if (wrapperUseShowControl) {
		wrapperUseOptions = [...wrapperUseOptions, {
			label: __('Spacing & layout', 'eightshift-frontend-libs'),
			value: 'full',
			icon: icons.wrapperAlt,
		}];
	}

	const getWrapperUseOptionName = () => {
		if (wrapperSimple && wrapperUse) {
			return 'simple';
		} else if (wrapperUse) {
			return 'full';
		}

		return 'off';
	};

	const wrapperDividerTopLarge = checkAttr('wrapperDividerTopLarge', attributes, manifest);
	const wrapperDividerRightLarge = checkAttr('wrapperDividerRightLarge', attributes, manifest);
	const wrapperDividerBottomLarge = checkAttr('wrapperDividerBottomLarge', attributes, manifest);
	const wrapperDividerLeftLarge = checkAttr('wrapperDividerLeftLarge', attributes, manifest);

	const breakpointNames = getDefaultBreakpointNames();

	dispatch(WRAPPER_STORE_NAME).setClientId(blockClientId);

	if (wrapperOnlyPresets) {
		return (
			<PanelBody
				title={
					<div className='es-h-spaced'>
						{icons.layout}
						{label}
					</div>
				}
				initialOpen={false}
			>
				<PresetPicker
					manifest={manifest}
					setAttributes={setAttributes}
					defaultButton={!wrapperHideDefaultPreset}
					offButton={{
						label: __('Just the block', 'eightshift-frontend-libs'),
						icon: icons.wrapperOffAlt,
						attributes: {
							wrapperUse: false,
							wrapperSimple: false,
						},
					}}
					controlOnly
				/>
			</PanelBody>
		);
	}

	return (
		<PanelBody initialOpen={isEditMode ?? false}
			title={
				<div className='es-h-between es-w-full'>
					<div className='es-h-spaced'>
						{icons.layout}
						{label}
					</div>

					{!wrapperNoControls && wrapperUseShowControl &&
						<div className='es-display-flex es-items-center es-gap-1 es-ml-auto es-flex-shrink-0 es-mr-1 es-wrapper-options-copy-paste'>
							<Button
								icon={icons.copy}
								onClick={copyAttributes}
								className='es-button-icon-24 es-button-square-24 es-rounded-0.75!'
								label={__('Copy configuration', 'eightshift-frontend-libs')}
								showTooltip
							/>

							<Button
								icon={icons.paste}
								onClick={pasteAttributes}
								disabled={!localStorage?.getItem('esCopiedWrapperAttributes')}
								className='es-button-icon-24 es-button-square-24 es-rounded-0.75!'
								label={__('Paste configuration', 'eightshift-frontend-libs')}
								showTooltip
							/>
						</div>
					}
				</div>
			}
		>
			{!wrapperHidePresets &&
				<PresetPicker
					manifest={manifest}
					setAttributes={setAttributes}
					defaultButton={!wrapperHideDefaultPreset}
					showAsCollapsable={!wrapperPresetNoCollapsable}
				/>
			}

			{wrapperUseOptions?.length > 1 &&
				<OptionSelector
					options={wrapperUseOptions}
					value={getWrapperUseOptionName()}
					onChange={(value) => {
						if (value === 'full') {
							setAttributes({
								wrapperUse: true,
								wrapperSimple: false,
							});
						} else if (value === 'simple') {
							setAttributes({
								wrapperUse: true,
								wrapperSimple: true,
							});
						} else {
							setAttributes({
								wrapperUse: false,
								wrapperSimple: false,
							});
						}
					}}
					additionalButtonClass='es-v-spaced es-nested-m-0! es-h-16 es-w-16 es-nested-flex-shrink-0 es-text-3 es-gap-0.75!'
					noBottomSpacing={getWrapperUseOptionName() === 'off'}
					alignment='center'
				/>
			}

			{wrapperUse &&
				<>
					{!wrapperSimple && wrapperUseInner && showWrapperWidth && showWrapperOffset &&
						<WidthOffsetRangeSlider
							{...generateWidthOffsetRangeSliderConfig({
								isFullWidthAttributeName: 'wrapperIsFullWidth',
								offsetAttributeName: 'wrapperOffset',
								widthAttributeName: 'wrapperWidth',
								manifest: manifest,
								attributes: attributes,
								setAttributes: setAttributes,
								minMaxStepOptionName: 'widths',
								showFullWidth: showWrapperIsFullWidth,
								numericValues: true,
							})}

							onBeforeChange={() => dispatch(WRAPPER_STORE_NAME).showPreview()}
							onAfterChange={() => dispatch(WRAPPER_STORE_NAME).hidePreview()}
						/>
					}

					{wrapperUse && showWrapperTag &&
						<OptionSelector
							label={__('Wrapper tag', 'eightshift-frontend-libs')}
							icon={icons.code}
							options={wrapperTagOptions}
							value={wrapperTag}
							onChange={(value) => setAttributes({ wrapperTag: value })}
							additionalButtonClass='es-v-spaced es-w-16 es-text-3 es-content-center'
							alignment='center'
						/>
					}

					<Section
						icon={icons.ruler}
						label={__('Spacing', 'eightshift-frontend-libs')}
						showIf={showWrapperSpacingTop || showWrapperSpacingBottom || showWrapperSpacingTopIn || showWrapperSpacingBottomIn}
					>
						{showWrapperSpacingTop &&
							<ResponsiveNumberPicker
								icon={icons.spacingTop}
								label={__('Top', 'eightshift-frontend-libs')}
								resetButton={manifest.attributes.wrapperSpacingTopLarge.default}
								reducedBottomSpacing

								{...generateResponsiveNumberPickerConfig({
									attributeName: 'wrapperSpacingTop',
									attributes: attributes,
									setAttributes: setAttributes,
									manifest: manifest,
									minMaxStepOptionName: 'wrapperSectionSpacing',
								})}
							/>
						}

						{showWrapperSpacingBottom &&
							<ResponsiveNumberPicker
								icon={icons.spacingBottom}
								label={__('Bottom', 'eightshift-frontend-libs')}
								resetButton={manifest.attributes.wrapperSpacingBottomLarge.default}

								{...generateResponsiveNumberPickerConfig({
									attributeName: 'wrapperSpacingBottom',
									attributes: attributes,
									setAttributes: setAttributes,
									manifest: manifest,
									minMaxStepOptionName: 'wrapperSectionSpacing',
								})}
								reducedBottomSpacing={!noLeftSpacingInSelector || !noRightSpacingSelector}
							/>
						}

						{(!noLeftSpacingInSelector || !noRightSpacingSelector) &&
							<Collapsable label={__('More', 'eightshift-frontend-libs')} icon={icons.moreH}>
								{!noLeftSpacingSelector &&
									<ResponsiveNumberPicker
										icon={icons.spacingLeft}
										label={__('Left', 'eightshift-frontend-libs')}
										resetButton={manifest.attributes.wrapperSpacingLeftLarge.default}
										reducedBottomSpacing={!noRightSpacingSelector}

										{...generateResponsiveNumberPickerConfig({
											attributeName: 'wrapperSpacingLeft',
											attributes: attributes,
											setAttributes: setAttributes,
											manifest: manifest,
											minMaxStepOptionName: 'wrapperSectionSpacing',
										})}
									/>
								}

								{!noRightSpacingSelector &&
									<ResponsiveNumberPicker
										icon={icons.spacingRight}
										label={__('Right', 'eightshift-frontend-libs')}
										resetButton={manifest.attributes.wrapperSpacingRightLarge.default}
										noBottomSpacing

										{...generateResponsiveNumberPickerConfig({
											attributeName: 'wrapperSpacingRight',
											attributes: attributes,
											setAttributes: setAttributes,
											manifest: manifest,
											minMaxStepOptionName: 'wrapperSectionSpacing',
										})}
									/>
								}
							</Collapsable>
						}

						{showWrapperSpacingTopIn &&
							<ResponsiveNumberPicker
								icon={icons.spacingTopIn}
								label={__('Top inner', 'eightshift-frontend-libs')}
								resetButton={manifest.attributes.wrapperSpacingTopInLarge.default}
								reducedBottomSpacing

								{...generateResponsiveNumberPickerConfig({
									attributeName: 'wrapperSpacingTopIn',
									attributes: attributes,
									setAttributes: setAttributes,
									manifest: manifest,
									minMaxStepOptionName: 'wrapperSectionInnerSpacing',
								})}
							/>
						}

						{showWrapperSpacingBottomIn &&
							<ResponsiveNumberPicker
								icon={icons.spacingBottomIn}
								label={__('Bottom inner', 'eightshift-frontend-libs')}
								resetButton={manifest.attributes.wrapperSpacingBottomInLarge.default}

								{...generateResponsiveNumberPickerConfig({
									attributeName: 'wrapperSpacingBottomIn',
									attributes: attributes,
									setAttributes: setAttributes,
									manifest: manifest,
									minMaxStepOptionName: 'wrapperSectionInnerSpacing',
								})}
								reducedBottomSpacing={!noLeftSpacingInSelector || !noRightSpacingInSelector}
								noBottomSpacing={noLeftSpacingInSelector && noRightSpacingInSelector}
							/>
						}

						{(!noLeftSpacingInSelector || !noRightSpacingInSelector) &&
							<Collapsable label={__('More', 'eightshift-frontend-libs')} icon={icons.moreH} noBottomSpacing>
								{!noLeftSpacingInSelector &&
									<ResponsiveNumberPicker
										icon={icons.spacingLeftIn}
										label={__('Left inner', 'eightshift-frontend-libs')}
										resetButton={manifest.attributes.wrapperSpacingLeftInLarge.default}
										reducedBottomSpacing={!noRightSpacingSelector}

										{...generateResponsiveNumberPickerConfig({
											attributeName: 'wrapperSpacingLeftIn',
											attributes: attributes,
											setAttributes: setAttributes,
											manifest: manifest,
											minMaxStepOptionName: 'wrapperSectionInnerSpacing',
										})}
									/>
								}

								{!noRightSpacingInSelector &&
									<ResponsiveNumberPicker
										icon={icons.spacingRightIn}
										label={__('Right inner', 'eightshift-frontend-libs')}
										resetButton={manifest.attributes.wrapperSpacingRightInLarge.default}
										noBottomSpacing

										{...generateResponsiveNumberPickerConfig({
											attributeName: 'wrapperSpacingRightIn',
											attributes: attributes,
											setAttributes: setAttributes,
											manifest: manifest,
											minMaxStepOptionName: 'wrapperSectionInnerSpacing',
										})}
									/>
								}
							</Collapsable>
						}
					</Section>

					<Section
						showIf={(showWrapperDividerTop || showWrapperDividerBottom || showWrapperDividerLeft || showWrapperDividerRight || showWrapperDividerColor || showWrapperRoundedCorners)}
						icon={icons.design}
						label={__('Design', 'eightshift-frontend-libs')}
					>
						{showWrapperBgColorPicker &&
							<AdvancedColorPicker
								icon={icons.backgroundType}
								label={__('Background', 'eightshift-frontend-libs')}
								colorsProject={backgroundColors}
								value={wrapperBgColorProject}

								pickerPopupTitle={__('Background', 'eightshift-frontend-libs')}
								groupShades
								canReset
								colorProject={wrapperBgColorProject}
								colorGradient={wrapperBgColorGradient}
								onChangeProject={(value) => setAttributes({ wrapperBgColorProject: value })}
								onChangeGradient={(value) => setAttributes({ wrapperBgColorGradient: value })}
								onChangeType={(value) => {
									setAttributes({
										wrapperBgColorType: value,
										wrapperBgColorGradient: undefined,
										wrapperBgColorProject: undefined,
									});
								}}
								globalManifest={globalManifest}
								type={wrapperBgColorType}
								types={
									[
										{
											label: __('None', 'eightshift-frontend-libs'),
											value: '',
											icon: icons.emptyCircle,
										},
										{
											label: __('Project color', 'eightshift-frontend-libs'),
											value: 'project',
											icon: icons.colorAlt,
										},
										{
											label: __('Gradient', 'eightshift-frontend-libs'),
											value: 'gradient',
											icon: icons.gradient,
										}
									]
								}
								noBottomSpacing={!(showWrapperRoundedCorners || showWrapperDividerTop || showWrapperDividerBottom || showWrapperDividerLeft || showWrapperDividerRight || showWrapperDividerColor)}
							/>
						}

						{showWrapperRoundedCorners &&
							<ResponsiveNumberPicker
								icon={icons.roundedCorners}
								label={__('Rounded corners', 'eightshift-frontend-libs')}

								{...generateResponsiveNumberPickerConfig({
									attributeName: 'wrapperRoundedCorners',
									attributes: attributes,
									setAttributes: setAttributes,
									manifest: manifest,
								})}

								noBottomSpacing={!(showWrapperDividerTop || showWrapperDividerBottom || showWrapperDividerLeft || showWrapperDividerRight || showWrapperDividerColor)}
							/>
						}

						{(showWrapperDividerTop || showWrapperDividerBottom || showWrapperDividerLeft || showWrapperDividerRight || showWrapperDividerColor) &&
							<Collapsable
								icon={icons.divider}
								label={__('Divider', 'eightshift-frontend-libs')}
								subtitle={showWrapperDividerColor && (wrapperDividerTopLarge || wrapperDividerRightLarge || wrapperDividerBottomLarge || wrapperDividerLeftLarge) && !wrapperDividerColor && <span className='es-color-yellow-500 es-font-weight-500'>{__('Color not set!', 'eightshift-frontend-libs')}</span>}
								actions={
									(wrapperDividerTopLarge || wrapperDividerRightLarge || wrapperDividerBottomLarge || wrapperDividerLeftLarge) &&
									(
										React.cloneElement(icons.dividerStatus, {
											className: 'es-w-6 es-h-6 es-my-1 es-line-h-0',
											style: {
												verticalAlign: 'middle',
												'--top-opacity': wrapperDividerTopLarge ? 1 : 0,
												'--right-opacity': wrapperDividerRightLarge ? 1 : 0,
												'--bottom-opacity': wrapperDividerBottomLarge ? 1 : 0,
												'--left-opacity': wrapperDividerLeftLarge ? 1 : 0,
											}
										})
									)
								}
							>
								{showWrapperDividerColor &&
									<ColorPicker
										colors={[{ name: __('None', 'eightshift-frontend-libs'), slug: undefined, color: 'transparent' }, ...dividerColors]}
										value={wrapperDividerColor}
										onChange={(value) => setAttributes({ wrapperDividerColor: value })}
										additionalTriggerClasses='es-p-0! es-button-square-24'
										pickerPopupTitle={__('Divider color', 'eightshift-frontend-libs')}
										label={__('Color', 'eightshift-frontend-libs')}
										icon={icons.colorAlt}
									/>
								}

								{[
									showWrapperDividerTop && {
										label: __('Top', 'eightshift-frontend-libs'),
										attributeKey: 'wrapperDividerTop',
										icon: React.cloneElement(icons.dividerSide, { style: { '--top-opacity': 1 } }),
									},
									showWrapperDividerRight && {
										label: __('Right', 'eightshift-frontend-libs'),
										attributeKey: 'wrapperDividerRight',
										icon: React.cloneElement(icons.dividerSide, { style: { '--right-opacity': 1 } }),
									},
									showWrapperDividerBottom && {
										label: __('Bottom', 'eightshift-frontend-libs'),
										attributeKey: 'wrapperDividerBottom',
										icon: React.cloneElement(icons.dividerSide, { style: { '--bottom-opacity': 1 } }),
									},
									showWrapperDividerLeft && {
										label: __('Left', 'eightshift-frontend-libs'),
										attributeKey: 'wrapperDividerLeft',
										icon: React.cloneElement(icons.dividerSide, { style: { '--left-opacity': 1 } }),
									}
								].filter(Boolean).map(({ label, attributeKey, icon }, i) => {
									const responsiveAttrValues = checkAttrResponsive(attributeKey, attributes, manifest, true);
									return (
										<Responsive
											key={i}
											icon={icon}
											label={label}
											inline
											noBottomSpacing
											additionalClasses={i < 3 ? 'es-mb-2' : ''}
											inheritButton={breakpointNames.map((breakpoint) => {
												const attributeValue = responsiveAttrValues[breakpoint];
												const attributeName = `${attributeKey}${ucfirst(breakpoint)}`;

												const isInherited = typeof attributeValue === 'undefined';

												return {
													callback: () => setAttributes({ [attributeName]: attributeValue === undefined ? false : undefined }),
													isActive: isInherited,
												};
											})}
										>
											{breakpointNames.map((breakpoint, index) => {
												const attributeValue = responsiveAttrValues[breakpoint];
												const attributeName = `${attributeKey}${ucfirst(breakpoint)}`;

												return (
													<Button
														key={index}
														icon={React.cloneElement(icons.toggleOff, {
															className: `es-animated-toggle-icon ${attributeValue === true ? 'is-checked' : ''}`
														})}
														onClick={() => setAttributes({ [attributeName]: !attributeValue })}
														className='es-button-square-30 es-button-icon-30'
														label={attributeValue ? __('On', 'eightshift-frontend-libs') : __('Off', 'eightshift-frontend-libs')}
														showTooltip
													/>
												);
											})}
										</Responsive>
									);
								})
								}
							</Collapsable>
						}
					</Section>

					<Section
						showIf={(showWrapperAnchorId || showWrapperId || showWrapperHide)}
						icon={icons.tools}
						label={__('Advanced', 'eightshift-frontend-libs')}
						subtitle={__('Visibility, anchor, ID', 'eightshift-frontend-libs')}
						noBottomSpacing
						collapsable
					>
						{showWrapperHide &&
							<ResponsiveToggleButton
								{...generateResponsiveToggleButtonConfig({
									attributeName: 'wrapperHide',
									attributes: attributes,
									setAttributes: setAttributes,
									manifest: manifest,
								})}
								label={__('Hide', 'eightshift-frontend-libs')}
								icon={icons.hide}
							/>
						}

						{showWrapperAnchorId &&
							<TextControl
								label={<IconLabel icon={icons.anchor} label={__('Block Anchor ID', 'eightshift-frontend-libs')} />}
								value={wrapperAnchorId}
								onChange={(value) => setAttributes({ wrapperAnchorId: value })}
								className='es-mb-5!'
							/>
						}

						{showWrapperId &&
							<TextControl
								label={<IconLabel icon={icons.id} label={__('Block unique identifier', 'eightshift-frontend-libs')} />}
								value={wrapperId}
								onChange={(value) => setAttributes({ wrapperId: value })}
							/>
						}
					</Section>
				</>
			}
		</PanelBody >
	);
};
