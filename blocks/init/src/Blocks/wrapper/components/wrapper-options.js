import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { ColorPaletteCustom, Responsive, HelpModal, icons, ucfirst, getOptionColors, IconToggle, checkAttr, IconLabel, CustomSelect } from '@eightshift/frontend-libs/scripts';
import globalSettings from '../../manifest.json';
import manifest from './../manifest.json';

export const WrapperOptions = ({ attributes, setAttributes }) => {
	const { attributes: reset, options } = manifest;
	const { globalVariables: defaults } = globalSettings;

	const {
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

	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseShowControl = checkAttr('wrapperUseShowControl', attributes, manifest);
	const wrapperUseSimple = checkAttr('wrapperUseSimple', attributes, manifest);
	const wrapperUseSimpleShowControl = checkAttr('wrapperUseSimpleShowControl', attributes, manifest);
	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperAnchorId = checkAttr('wrapperAnchorId', attributes, manifest);
	const wrapperBackgroundColor = checkAttr('wrapperBackgroundColor', attributes, manifest);

	return (
		<>
			{!wrapperDisable &&
				<PanelBody title={<span>{__('Layout', 'newboilerplate')}</span>} initialOpen={false} icon={icons.wrapper} className='es-panel-title'>

					<HelpModal />

					<br /><br />

					{wrapperUseShowControl &&
						<IconToggle
							icon={icons.wrapper}
							label={__('Wrapper', 'newboilerplate')}
							checked={wrapperUse}
							onChange={(value) => setAttributes({ wrapperUse: value })}
						/>
					}

					{(wrapperUse && wrapperUseSimpleShowControl) &&
						<IconToggle
							icon={icons.wrapperSimple}
							label={__('Simple wrapper', 'newboilerplate')}
							checked={wrapperUseSimple}
							onChange={(value) => setAttributes({ wrapperUseSimple: value })}
							help={__('Provides only basic spacing and background options.', 'newboilerplate')}
						/>
					}

					{wrapperUse &&
						<>
							<hr />

							{showWrapperSpacingTop &&
								<Responsive label={<IconLabel icon={icons.spacingTop} label={__('Top spacing', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperSpacingTop${point}`;

										return (
											<Fragment key={index}>
												<RangeControl
													label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
													allowReset={true}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
													min={defaults?.sectionSpacing?.min}
													max={defaults?.sectionSpacing?.max}
													step={defaults?.sectionSpacing?.step}
													resetFallbackValue={reset[attr].default}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							{showWrapperSpacingBottom &&
								<Responsive label={<IconLabel icon={icons.spacingBottom} label={__('Bottom spacing', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperSpacingBottom${point}`;

										return (
											<Fragment key={index}>
												<RangeControl
													label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
													allowReset={true}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
													min={defaults?.sectionSpacing?.min}
													max={defaults?.sectionSpacing?.max}
													step={defaults?.sectionSpacing?.step}
													resetFallbackValue={reset[attr].default}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							<hr />

							{showWrapperSpacingTopIn &&
								<Responsive label={<IconLabel icon={icons.spacingTopIn} label={__('Top inner spacing', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperSpacingTopIn${point}`;

										return (
											<Fragment key={index}>
												<RangeControl
													label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
													allowReset={true}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
													min={defaults?.sectionSpacing?.min}
													max={defaults?.sectionSpacing?.max}
													step={defaults?.sectionSpacing?.step}
													resetFallbackValue={reset[attr].default}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							{showWrapperSpacingBottomIn &&
								<Responsive label={<IconLabel icon={icons.spacingBottomIn} label={__('Bottom inner spacing', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperSpacingBottomIn${point}`;

										return (
											<Fragment key={index}>
												<RangeControl
													label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
													allowReset={true}
													value={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
													min={defaults?.sectionSpacing?.min}
													max={defaults?.sectionSpacing?.max}
													step={defaults?.sectionSpacing?.step}
													resetFallbackValue={reset[attr].default}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							<hr />

							{showWrapperDividerTop &&
								<Responsive label={<IconLabel icon={icons.dividerTop} label={__('Top divider', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperDividerTop${point}`;

										return (
											<Fragment key={index}>
												<IconToggle
													icon={icons[`screen${point}`]}
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
								<Responsive label={<IconLabel icon={icons.dividerBottom} label={__('Bottom divider', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperDividerBottom${point}`;

										return (
											<Fragment key={index}>
												<IconToggle
													icon={icons[`screen${point}`]}
													label={point}
													checked={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							<hr />

							{showWrapperHide &&
								<Responsive label={<IconLabel icon={icons.hide} label={__('Hide', 'newboilerplate')} />}>
									{options.breakpoints.map((item, index) => {
										const point = ucfirst(item);
										const attr = `wrapperHide${point}`;

										return (
											<Fragment key={index}>
												<IconToggle
													icon={icons[`screen${point}`]}
													label={point}
													checked={attributes[attr]}
													onChange={(value) => setAttributes({ [attr]: value })}
												/>
											</Fragment>
										);
									})}
								</Responsive>
							}

							<hr />

							{!wrapperUseSimple &&
								<>
									{showWrapperWidth &&
										<Responsive label={<IconLabel icon={icons.width} label={__('Width', 'newboilerplate')} />}>
											{options.breakpoints.map((item, index) => {

												const point = ucfirst(item);
												const attr = `wrapperWidth${point}`;

												return (
													<Fragment key={index}>
														<RangeControl
															label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
															allowReset={true}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															min={options.wrapperWidth.min}
															max={options.wrapperWidth.max}
															step={options.wrapperWidth.step}
															resetFallbackValue={reset[attr].default}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperOffset &&
										<Responsive label={<IconLabel icon={icons.offset} label={__('Offset', 'newboilerplate')} />}>
											{options.breakpoints.map((item, index) => {

												const point = ucfirst(item);
												const attr = `wrapperOffset${point}`;

												return (
													<Fragment key={index}>
														<RangeControl
															label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
															allowReset={true}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															min={options.wrapperWidth.min}
															max={options.wrapperWidth.max}
															step={options.wrapperWidth.step}
															resetFallbackValue={reset[attr].default}
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperContainerWidth &&
										<Responsive label={<IconLabel icon={icons.containerWidth} label={__('Container width', 'newboilerplate')} />}>
											{options.breakpoints.map((item, index) => {
												const point = ucfirst(item);
												const attr = `wrapperContainerWidth${point}`;

												return (
													<Fragment key={index}>
														<CustomSelect
															label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
															options={options.wrapperContainerWidth}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															isSearchable={false}
															isClearable={false}
															simpleValue
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperGutter &&
										<Responsive label={<IconLabel icon={icons.gutter} label={__('Gutter', 'newboilerplate')} />}>
											{options.breakpoints.map((item, index) => {

												const point = ucfirst(item);
												const attr = `wrapperGutter${point}`;

												return (
													<Fragment key={index}>
														<CustomSelect
															label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
															options={options.wrapperGutter}
															value={attributes[attr]}
															onChange={(value) => setAttributes({ [attr]: value })}
															isSearchable={false}
															isClearable={false}
															simpleValue
														/>
													</Fragment>
												);
											})}
										</Responsive>
									}

									{showWrapperBackgroundColor &&
										<ColorPaletteCustom
											label={<IconLabel icon={icons.backgroundTypeAlt} label={__('Background color', 'newboilerplate')} />}
											colors={getOptionColors(options.colors)}
											value={wrapperBackgroundColor}
											onChange={(value) => setAttributes({ wrapperBackgroundColor: value })}
										/>
									}
								</>
							}

							{showWrapperAnchorId &&
								<TextControl
									label={<IconLabel icon={icons.anchor} label={__('Block anchor ID', 'newboilerplate')} />}
									value={wrapperAnchorId}
									onChange={(value) => setAttributes({ wrapperAnchorId: value })}
								/>
							}

							{showWrapperId &&
								<TextControl
									label={<IconLabel icon={icons.id} label={__('Block unique identifier', 'newboilerplate')} />}
									value={wrapperId}
									onChange={(value) => setAttributes({ wrapperId: value })}
								/>
							}

						</>
					}
				</PanelBody>
			}
		</>
	);
};
