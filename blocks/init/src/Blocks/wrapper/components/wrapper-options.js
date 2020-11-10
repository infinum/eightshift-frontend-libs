import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { PanelBody, TextControl, Icon, ToggleControl, Button, Modal, SelectControl, RangeControl } from '@wordpress/components';
import { ColorPaletteCustom, Responsive } from '@eightshift/frontend-libs/scripts/components';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from '../../manifest.json';
import manifest from './../manifest.json';

const { attributes: reset, options } = manifest;
const { globalVariables: defaults } = globalSettings;

export const WrapperOptions = ({ attributes, setAttributes }) => {
	const {
		wrapperUse,
		wrapperUseShowControl,
		wrapperUseSimple,
		wrapperUseSimpleShowControl,
		wrapperDisable,
		wrapperId,
		wrapperBackgroundColor,

		wrapperHideLarge,
		wrapperHideDesktop,
		wrapperHideTablet,
		wrapperHideMobile,

		wrapperWidthLarge,
		wrapperWidthDesktop,
		wrapperWidthTablet,
		wrapperWidthMobile,

		wrapperContainerWidthLarge,
		wrapperContainerWidthDesktop,
		wrapperContainerWidthTablet,
		wrapperContainerWidthMobile,

		wrapperGutterLarge,
		wrapperGutterDesktop,
		wrapperGutterTablet,
		wrapperGutterMobile,

		wrapperOffsetLarge,
		wrapperOffsetDesktop,
		wrapperOffsetTablet,
		wrapperOffsetMobile,

		wrapperSpacingTopLarge,
		wrapperSpacingTopDesktop,
		wrapperSpacingTopTablet,
		wrapperSpacingTopMobile,

		wrapperSpacingBottomLarge,
		wrapperSpacingBottomDesktop,
		wrapperSpacingBottomTablet,
		wrapperSpacingBottomMobile,

		wrapperSpacingTopInLarge,
		wrapperSpacingTopInDesktop,
		wrapperSpacingTopInTablet,
		wrapperSpacingTopInMobile,

		wrapperSpacingBottomInLarge,
		wrapperSpacingBottomInDesktop,
		wrapperSpacingBottomInTablet,
		wrapperSpacingBottomInMobile,

		wrapperDividerTopLarge,
		wrapperDividerTopDesktop,
		wrapperDividerTopTablet,
		wrapperDividerTopMobile,

		wrapperDividerBottomLarge,
		wrapperDividerBottomDesktop,
		wrapperDividerBottomTablet,
		wrapperDividerBottomMobile,
		
		showWrapperId = false,
		showWrapperAnchorId = false,
		showWrapperBackgroundColor = false,
		showWrapperWidth = false,
		showWrapperOffset = false,
		showWrapperContainerWidth = false,
		showWrapperGutter = false,
		showWrapperSpacingTop = false,
		showWrapperSpacingBottom = true,
		showWrapperSpacingTopIn = false,
		showWrapperSpacingBottomIn = false,
		showWrapperDividerTop = false,
		showWrapperDividerBottom = false,
		showWrapperHide = false,
	} = attributes;

	const [isOpen, activeModal] = useState(false);

	const wrapperSpacingBottom = [
		wrapperSpacingBottomLarge,
		wrapperSpacingBottomDesktop,
		wrapperSpacingBottomTablet,
		wrapperSpacingBottomMobile,
	];

	const Hide = (attribute) => {
		return (
			<ToggleControl
				label={__('Hide Block', 'eightshift-boilerplate')}
				checked={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
			/>
		);
	};

	const Width = (attribute) => {
		return (
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.width} />
						{__('Content Width', 'eightshift-boilerplate')}
					</Fragment>
				}
				allowReset={true}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
				min={options.widths.min}
				max={options.widths.max}
				step={options.widths.step}
			/>
		);
	};

	const Offset = (attribute) => {
		return (
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.offset} />
						{__('Content Offset', 'eightshift-boilerplate')}
					</Fragment>
				}
				allowReset={true}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
				min={options.widths.min}
				max={options.widths.max}
				step={options.widths.step}
			/>
		);
	};

	const ContainerWidth = (attribute) => {
		return (
			<SelectControl
				label={
					<Fragment>
						<Icon icon={icons.containerWidth} />
						{__('Container Width', 'eightshift-boilerplate')}
					</Fragment>
				}
				options={options.containerWidths}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
			/>
		);
	};

	const Gutter = (attribute) => {
		return (
			<SelectControl
				label={
					<Fragment>
						<Icon icon={icons.containerSpacing} />
						{__('Container Spacing', 'eightshift-boilerplate')}
					</Fragment>
				}
				options={options.gutters}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
			/>
		);
	};

	const SpacingTop = (attribute) => {
		// console.log(reset[attribute].default);
		return (
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.spacingTop} />
						{__('Spacing Top', 'eightshift-boilerplate')}
					</Fragment>
				}
				allowReset={true}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
				min={defaults.sectionSpacing.min}
				max={defaults.sectionSpacing.max}
				step={defaults.sectionSpacing.step}
				// resetFallbackValue={reset[attribute].default}
			/>
		);
	};

	const SpacingBottom = ({ attr, attrName, breakpoint }) => {
		console.log( attr, attrName, breakpoint);

		return (
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.spacingBottom} />
						{__(`Spacing Bottom ${breakpoint}`, 'eightshift-boilerplate')}
					</Fragment>
				}
				allowReset={true}
				value={attr}
				onChange={(value) => setAttributes({ [attrName]: value })}
				min={defaults.sectionSpacing.min}
				max={defaults.sectionSpacing.max}
				step={defaults.sectionSpacing.step}
				resetFallbackValue={reset[attrName].default}
			/>
		);
	};

	const SpacingTopIn = (attribute) => {
		return (
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.spacingTopIn} />
						{__('Spacing Top In', 'eightshift-boilerplate')}
					</Fragment>
				}
				allowReset={true}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
				min={defaults.sectionInSpacing.min}
				max={defaults.sectionInSpacing.max}
				step={defaults.sectionInSpacing.step}
				resetFallbackValue={reset[attribute].default}
			/>
		);
	};

	const SpacingBottomIn = (attribute) => {
		return (
			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.spacingBottomIn} />
						{__('Spacing Bottom In', 'eightshift-boilerplate')}
					</Fragment>
				}
				allowReset={true}
				value={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
				min={defaults.sectionInSpacing.min}
				max={defaults.sectionInSpacing.max}
				step={defaults.sectionInSpacing.step}
				// resetFallbackValue={reset[attribute].default}
			/>
		);
	};

	const DividerTop = (attribute) => {
		return (
			<ToggleControl
				label={__('Divider Top', 'eightshift-boilerplate')}
				checked={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
			/>
		);
	};

	const DividerBottom = (attribute) => {
		return (
			<ToggleControl
				label={__('Divider Bottom', 'eightshift-boilerplate')}
				checked={attribute}
				onChange={(value) => setAttributes({ [attribute]: value })}
			/>
		);
	};

	return (
		<Fragment>
			{!wrapperDisable &&
				<PanelBody title={__('Block Layout', 'eightshift-boilerplate')} initialOpen={false}>

					<Fragment>
						<Button className={'custom-full-width-button'} isDefault isSmall onClick={() => activeModal(true)}>
							{__('How to use wrapper?', 'eightshift-boilerplate')}
						</Button>
						{isOpen && (
							<Modal
								title={__('Block Layout', 'eightshift-boilerplate')}
								onRequestClose={() => activeModal(false)}>
								<h4>{__('Block ID', 'eightshift-boilerplate')}</h4>
								<p>{__('Add Unique ID to the block.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Block Anchor ID', 'eightshift-boilerplate')}</h4>
								<p>{__('Add Unique Anchor ID to the block.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Content Width', 'eightshift-boilerplate')}</h4>
								<p>{sprintf(__('Option to change the block width in the grid from the left. Change column width in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Content Offset', 'eightshift-boilerplate')}</h4>
								<p>{sprintf(__('Option to change the block offset in the grid from the left. Change block offset in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Container Width', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Container width. Changing this option will affect total width of the block and the total size of grid inside the block.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Container Spacing', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Container spacing on the left and right. More popular name is Container Gutter.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Spacing Top', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Spacing In Top', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Divider Top', 'eightshift-boilerplate')}</h4>
								<p></p>
								<div className={'custom-divider'}></div>
								<h4>{__('Spacing Bottom', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Spacing In Bottom', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}</p>
								<div className={'custom-divider'}></div>
								<h4>{__('Divider Bottom', 'eightshift-boilerplate')}</h4>
								<p></p>
								<div className={'custom-divider'}></div>
								<h4>{__('Hide Block', 'eightshift-boilerplate')}</h4>
								<p>{__('Toggle block visibility.', 'eightshift-boilerplate')}</p>
							</Modal>
						)}
						<br />
						<br />
					</Fragment>

					{wrapperUseShowControl &&
						<ToggleControl
							label={wrapperUse ? __('Wrapper Enabled', 'eightshift-boilerplate') : __('Wrapper Disabled', 'eightshift-boilerplate')}
							help={__('Toggle wrapper options on/off.', 'eightshift-boilerplate')}
							checked={wrapperUse}
							onChange={(value) => setAttributes({ wrapperUse: value })}
						/>
					}

					{(wrapperUse && wrapperUseSimpleShowControl) &&
						<ToggleControl
							label={wrapperUseSimple ? __('Wrapper Simple Enabled', 'eightshift-boilerplate') : __('Wrapper Simple Disabled', 'eightshift-boilerplate')}
							help={__('Toggle wrapper Simple options on/off.', 'eightshift-boilerplate')}
							checked={wrapperUseSimple}
							onChange={(value) => setAttributes({ wrapperUseSimple: value })}
						/>
					}

					{wrapperUse &&
						<Fragment>
							{!wrapperUseSimple &&
								<Fragment>
									{showWrapperSpacingTop &&
										<Responsive
											tabs={
												[
													{
														name: 'large',
														tab: <SpacingTop attribute={wrapperSpacingTopLarge} />,
													},
													{
														name: 'desktop',
														tab: <SpacingTop attribute={wrapperSpacingTopDesktop} />,
													},
													{
														name: 'tablet',
														tab: <SpacingTop attribute={wrapperSpacingTopTablet} />,
													},
													{
														name: 'mobile',
														tab: <SpacingTop attribute={wrapperSpacingTopMobile} />,
													},
												]
											}
										/>
									}

									{showWrapperSpacingTopIn &&
										<Responsive
											tabs={
												[
													{
														name: 'large',
														tab: <SpacingTopIn attribute={wrapperSpacingTopInLarge} />,
													},
													{
														name: 'desktop',
														tab: <SpacingTopIn attribute={wrapperSpacingTopInDesktop} />,
													},
													{
														name: 'tablet',
														tab: <SpacingTopIn attribute={wrapperSpacingTopInTablet} />,
													},
													{
														name: 'mobile',
														tab: <SpacingTopIn attribute={wrapperSpacingTopInMobile} />,
													},
												]
											}
										/>
									}

									{showWrapperSpacingBottom &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.spacingBottom} />
													{__('Spacing Bottom', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperSpacingBottom.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperSpacingBottom${point}`;

												return (
													<Fragment key={index}>
														<RangeControl
															label={point}
															allowReset={true}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															min={defaults.sectionSpacing.min}
															max={defaults.sectionSpacing.max}
															step={defaults.sectionSpacing.step}
															resetFallbackValue={reset[attr].default}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperSpacingBottomIn &&
										<Responsive
											tabs={
												[
													{
														name: 'large',
														tab: <SpacingBottomIn attribute={wrapperSpacingBottomInLarge} />,
													},
													{
														name: 'desktop',
														tab: <SpacingBottomIn attribute={wrapperSpacingBottomInDesktop} />,
													},
													{
														name: 'tablet',
														tab: <SpacingBottomIn attribute={wrapperSpacingBottomInTablet} />,
													},
													{
														name: 'mobile',
														tab: <SpacingBottomIn attribute={wrapperSpacingBottomInMobile} />,
													},
												]
											}
										/>
									}

									{showWrapperDividerTop &&
										<Responsive
											tabs={
												[
													{
														name: 'large',
														tab: <DividerTop attribute={wrapperDividerTopLarge} />,
													},
													{
														name: 'desktop',
														tab: <DividerTop attribute={wrapperDividerTopDesktop} />,
													},
													{
														name: 'tablet',
														tab: <DividerTop attribute={wrapperDividerTopTablet} />,
													},
													{
														name: 'mobile',
														tab: <DividerTop attribute={wrapperDividerTopMobile} />,
													},
												]
											}
										/>
									}

									{showWrapperDividerBottom &&
										<Responsive
											tabs={
												[
													{
														name: 'large',
														tab: <DividerBottom attribute={wrapperDividerBottomLarge} />,
													},
													{
														name: 'desktop',
														tab: <DividerBottom attribute={wrapperDividerBottomDesktop} />,
													},
													{
														name: 'tablet',
														tab: <DividerBottom attribute={wrapperDividerBottomTablet} />,
													},
													{
														name: 'mobile',
														tab: <DividerBottom attribute={wrapperDividerBottomMobile} />,
													},
												]
											}
										/>
									}

								</Fragment>
							}

							{showWrapperHide &&
								<Responsive
									tabs={
										[
											{
												name: 'large',
												tab: <Hide attribute={wrapperHideLarge} />,
											},
											{
												name: 'desktop',
												tab: <Hide attribute={wrapperHideDesktop} />,
											},
											{
												name: 'tablet',
												tab: <Hide attribute={wrapperHideTablet} />,
											},
											{
												name: 'mobile',
												tab: <Hide attribute={wrapperHideMobile} />,
											},
										]
									}
								/>
							}

							{showWrapperWidth &&
								<Responsive
									tabs={
										[
											{
												name: 'large',
												tab: <Width attribute={wrapperWidthLarge} />,
											},
											{
												name: 'desktop',
												tab: <Width attribute={wrapperWidthDesktop} />,
											},
											{
												name: 'tablet',
												tab: <Width attribute={wrapperWidthTablet} />,
											},
											{
												name: 'mobile',
												tab: <Width attribute={wrapperWidthMobile} />,
											},
										]
									}
								/>
							}

							{showWrapperOffset &&
								<Responsive
									tabs={
										[
											{
												name: 'large',
												tab: <Offset attribute={wrapperOffsetLarge} />,
											},
											{
												name: 'desktop',
												tab: <Offset attribute={wrapperOffsetDesktop} />,
											},
											{
												name: 'tablet',
												tab: <Offset attribute={wrapperOffsetTablet} />,
											},
											{
												name: 'mobile',
												tab: <Offset attribute={wrapperOffsetMobile} />,
											},
										]
									}
								/>
							}

							{showWrapperContainerWidth &&
								<Responsive
									tabs={
										[
											{
												name: 'large',
												tab: <ContainerWidth attribute={wrapperContainerWidthLarge} />,
											},
											{
												name: 'desktop',
												tab: <ContainerWidth attribute={wrapperContainerWidthDesktop} />,
											},
											{
												name: 'tablet',
												tab: <ContainerWidth attribute={wrapperContainerWidthTablet} />,
											},
											{
												name: 'mobile',
												tab: <ContainerWidth attribute={wrapperContainerWidthMobile} />,
											},
										]
									}
								/>
							}

							{showWrapperGutter &&
								<Responsive
									tabs={
										[
											{
												name: 'large',
												tab: <Gutter attribute={wrapperGutterLarge} />,
											},
											{
												name: 'desktop',
												tab: <Gutter attribute={wrapperGutterDesktop} />,
											},
											{
												name: 'tablet',
												tab: <Gutter attribute={wrapperGutterTablet} />,
											},
											{
												name: 'mobile',
												tab: <Gutter attribute={wrapperGutterMobile} />,
											},
										]
									}
								/>
							}

							{showWrapperBackgroundColor &&
								<ColorPaletteCustom
									label={
										<Fragment>
											<Icon icon={icons.color} />
											{__('Background Color', 'eightshift-boilerplate')}
										</Fragment>
									}
									value={wrapperBackgroundColor}
									onChange={(value) => setAttributes({ wrapperBackgroundColor: value })}
								/>
							}

							{showWrapperAnchorId &&
								<TextControl
									label={
										<Fragment>
											<Icon icon={icons.anchor} />
											{__('Block Anchor ID', 'eightshift-boilerplate')}
										</Fragment>
									}
									value={wrapperId}
									onChange={(value) => setAttributes({ wrapperAnchorId: value })}
								/>
							}

							{showWrapperId &&
								<TextControl
									label={
										<Fragment>
											<Icon icon={icons.id} />
											{__('Block ID', 'eightshift-boilerplate')}
										</Fragment>
									}
									value={wrapperId}
									onChange={(value) => setAttributes({ wrapperId: value })}
								/>
							}

						</Fragment>
					}
				</PanelBody>
			}
		</Fragment>
	);
};
