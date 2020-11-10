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

		showWrapperId = true,
		showWrapperAnchorId = true,
		showWrapperBackgroundColor = true,
		showWrapperWidth = true,
		showWrapperOffset = true,
		showWrapperContainerWidth = true,
		showWrapperGutter = true,
		showWrapperSpacingTop = true,
		showWrapperSpacingBottom = true,
		showWrapperSpacingTopIn = true,
		showWrapperSpacingBottomIn = true,
		showWrapperDividerTop = true,
		showWrapperDividerBottom = true,
		showWrapperHide = true,
	} = attributes;

	const [isOpen, activeModal] = useState(false);

	const wrapperSpacingTop = [
		attributes.wrapperSpacingTopLarge,
		attributes.wrapperSpacingTopDesktop,
		attributes.wrapperSpacingTopTablet,
		attributes.wrapperSpacingTopMobile,
	];

	const wrapperSpacingBottom = [
		attributes.wrapperSpacingBottomLarge,
		attributes.wrapperSpacingBottomDesktop,
		attributes.wrapperSpacingBottomTablet,
		attributes.wrapperSpacingBottomMobile,
	];

	const wrapperSpacingTopIn = [
		attributes.wrapperSpacingTopInLarge,
		attributes.wrapperSpacingTopInDesktop,
		attributes.wrapperSpacingTopInTablet,
		attributes.wrapperSpacingTopInMobile,
	];

	const wrapperSpacingBottomIn = [
		attributes.wrapperSpacingBottomInLarge,
		attributes.wrapperSpacingBottomInDesktop,
		attributes.wrapperSpacingBottomInTablet,
		attributes.wrapperSpacingBottomInMobile,
	];

	const wrapperDividerTop = [
		attributes.wrapperDividerTopLarge,
		attributes.wrapperDividerTopDesktop,
		attributes.wrapperDividerTopTablet,
		attributes.wrapperDividerTopMobile,
	];

	const wrapperDividerBottom = [
		attributes.wrapperDividerBottomLarge,
		attributes.wrapperDividerBottomDesktop,
		attributes.wrapperDividerBottomTablet,
		attributes.wrapperDividerBottomMobile,
	];

	const wrapperHide = [
		attributes.wrapperHideLarge,
		attributes.wrapperHideDesktop,
		attributes.wrapperHideTablet,
		attributes.wrapperHideMobile,
	];

	const wrapperWidth = [
		attributes.wrapperWidthLarge,
		attributes.wrapperWidthDesktop,
		attributes.wrapperWidthTablet,
		attributes.wrapperWidthMobile,
	];

	const wrapperOffset = [
		attributes.wrapperOffsetLarge,
		attributes.wrapperOffsetDesktop,
		attributes.wrapperOffsetTablet,
		attributes.wrapperOffsetMobile,
	];

	const wrapperContainerWidth = [
		attributes.wrapperContainerWidthLarge,
		attributes.wrapperContainerWidthDesktop,
		attributes.wrapperContainerWidthTablet,
		attributes.wrapperContainerWidthMobile,
	];

	const wrapperGutter = [
		attributes.wrapperGutterLarge,
		attributes.wrapperGutterDesktop,
		attributes.wrapperGutterTablet,
		attributes.wrapperGutterMobile,
	];

	return (
		<Fragment>
			{!wrapperDisable &&
				<PanelBody title={__('Block Layout', 'eightshift-boilerplate')} initialOpen={false} className="custom-highlighted-panel">

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

									<div className="custom-divider"></div>

									{showWrapperSpacingTop &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.spacingTop} />
													{__('Spacing Top', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperSpacingTop.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperSpacingTop${point}`;

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

									<div className="custom-divider"></div>

									{showWrapperSpacingTopIn &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.spacingTop} />
													{__('Spacing Top In', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperSpacingTopIn.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperSpacingTopIn${point}`;

												return (
													<Fragment key={index}>
														<RangeControl
															label={point}
															allowReset={true}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															min={defaults.sectionInSpacing.min}
															max={defaults.sectionInSpacing.max}
															step={defaults.sectionInSpacing.step}
															resetFallbackValue={reset[attr].default}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperSpacingBottomIn &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.spacingBottom} />
													{__('Spacing Bottom In', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperSpacingBottomIn.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperSpacingBottomIn${point}`;

												return (
													<Fragment key={index}>
														<RangeControl
															label={point}
															allowReset={true}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															min={defaults.sectionInSpacing.min}
															max={defaults.sectionInSpacing.max}
															step={defaults.sectionInSpacing.step}
															resetFallbackValue={reset[attr].default}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									<div className="custom-divider"></div>

									{showWrapperDividerTop &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.dividerTop} />
													{__('Divider Top In', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperDividerTop.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperDividerTop${point}`;

												return (
													<Fragment key={index}>
														<ToggleControl
															label={point}
															checked={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperDividerBottom &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.dividerBottom} />
													{__('Divider Bottom In', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperDividerBottom.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperDividerBottom${point}`;

												return (
													<Fragment key={index}>
														<ToggleControl
															label={point}
															checked={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									<div className="custom-divider"></div>

									{showWrapperHide &&
										<Responsive
											label={
												<Fragment>
													<Icon icon={icons.hide} />
													{__('Hide', 'eightshift-boilerplate')}
												</Fragment>
											}
										>
											{wrapperHide.map((item, index) => {

												const point = ucfirst(options.breakpoints[index]);
												const attr = `wrapperHide${point}`;

												return (
													<Fragment key={index}>
														<ToggleControl
															label={point}
															checked={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

								</Fragment>
							}

							{showWrapperWidth &&
								<Responsive
									label={
										<Fragment>
											<Icon icon={icons.width} />
											{__('Width', 'eightshift-boilerplate')}
										</Fragment>
									}
								>
									{wrapperWidth.map((item, index) => {

										const point = ucfirst(options.breakpoints[index]);
										const attr = `wrapperWidth${point}`;

										return (
											<Fragment key={index}>
												<RangeControl
													label={point}
													allowReset={true}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
													min={options.widths.min}
													max={options.widths.max}
													step={options.widths.step}
													resetFallbackValue={reset[attr].default}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							{showWrapperOffset &&
								<Responsive
									label={
										<Fragment>
											<Icon icon={icons.offset} />
											{__('Offset', 'eightshift-boilerplate')}
										</Fragment>
									}
								>
									{wrapperOffset.map((item, index) => {

										const point = ucfirst(options.breakpoints[index]);
										const attr = `wrapperOffset${point}`;

										return (
											<Fragment key={index}>
												<RangeControl
													label={point}
													allowReset={true}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
													min={options.widths.min}
													max={options.widths.max}
													step={options.widths.step}
													resetFallbackValue={reset[attr].default}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							{showWrapperContainerWidth &&
								<Responsive
									label={
										<Fragment>
											<Icon icon={icons.containerWidth} />
											{__('ContainerWidth', 'eightshift-boilerplate')}
										</Fragment>
									}
								>
									{wrapperContainerWidth.map((item, index) => {

										const point = ucfirst(options.breakpoints[index]);
										const attr = `wrapperContainerWidth${point}`;

										return (
											<Fragment key={index}>
												<SelectControl
													label={point}
													options={options.containerWidths}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							{showWrapperGutter &&
								<Responsive
									label={
										<Fragment>
											<Icon icon={icons.gutter} />
											{__('Gutter', 'eightshift-boilerplate')}
										</Fragment>
									}
								>
									{wrapperGutter.map((item, index) => {

										const point = ucfirst(options.breakpoints[index]);
										const attr = `wrapperGutter${point}`;

										return (
											<Fragment key={index}>
												<SelectControl
													label={point}
													options={options.gutters}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
												/>
											</Fragment>
										);
									})}
								</Responsive>
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
