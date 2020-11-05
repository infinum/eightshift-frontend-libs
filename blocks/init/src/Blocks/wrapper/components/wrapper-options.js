import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TextControl, Dashicon, TabPanel, Icon, ToggleControl } from '@wordpress/components';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { WrapperTab } from './wrapper-tab';

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
		showWrapperBackgroundColor = true,
	} = attributes;

	return (
		<Fragment>
			{!wrapperDisable &&
				<PanelBody title={__('Block Layout', 'eightshift-boilerplate')} initialOpen={false}>

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
							<TabPanel
								className="custom-button-tabs"
								activeClass="components-button is-button is-primary"
								tabs={[
									{
										name: 'large',
										title: <Dashicon icon="desktop" />,
										className: 'tab-large components-button is-button is-default custom-button-with-icon',
									},
									{
										name: 'desktop',
										title: <Dashicon icon="laptop" />,
										className: 'tab-desktop components-button is-button is-default custom-button-with-icon',
									},
									{
										name: 'tablet',
										title: <Dashicon icon="tablet" />,
										className: 'tab-tablet components-button is-button is-default custom-button-with-icon',
									},
									{
										name: 'mobile',
										title: <Dashicon icon="smartphone" />,
										className: 'tab-mobile components-button is-button is-default custom-button-with-icon',
									},
								]
								}
							>
								{(tab) => (
									<Fragment>
										{tab.name === 'large' && (
											<Fragment>
												<br />
												<strong className="notice-title">{__('Large Layout Options', 'eightshift-boilerplate')}</strong>
												<p>{__('This options will only control large screens options.', 'eightshift-boilerplate')}</p>
												<br />
												<WrapperTab
													attributes={attributes}
													breakPoint={'large'}
													setAttributes={setAttributes}
												/>
											</Fragment>
										)}
										{tab.name === 'desktop' && (
											<Fragment>
												<br />
												<strong className="notice-title">{__('Desktop Layout Options', 'eightshift-boilerplate')}</strong>
												<p>{__('This options will only control desktop screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
												<br />
												<WrapperTab
													attributes={attributes}
													breakPoint={'desktop'}
													setAttributes={setAttributes}
												/>
											</Fragment>
										)}
										{tab.name === 'tablet' && (
											<Fragment>
												<br />
												<strong className="notice-title">{__('Tablet Layout Options', 'eightshift-boilerplate')}</strong>
												<p>{__('This options will only control tablet screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
												<br />
												<WrapperTab
													attributes={attributes}
													breakPoint={'tablet'}
													setAttributes={setAttributes}
												/>
											</Fragment>
										)}
										{tab.name === 'mobile' && (
											<Fragment>
												<br />
												<strong className="notice-title ">{__('Mobile Layout Options', 'eightshift-boilerplate')}</strong>
												<p>{__('This options will only control mobile screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
												<br />
												<WrapperTab
													attributes={attributes}
													breakPoint={'mobile'}
													setAttributes={setAttributes}
												/>
											</Fragment>
										)}
									</Fragment>
								)}
							</TabPanel>

							{showWrapperBackgroundColor &&
								<ColorPaletteCustom
									label={
										<Fragment>
											<Icon icon={icons.color} />
											{__('Background Color', 'eightshift-boilerplate')}
										</Fragment>
									}
									help={__('Change Block Background color. Block spacing will be included in block background color.', 'eightshift-boilerplate')}
									value={wrapperBackgroundColor}
									onChange={(value) => setAttributes({ wrapperBackgroundColor: value })}
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
									help={__('Add Unique ID to the block.', 'eightshift-boilerplate')}
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
