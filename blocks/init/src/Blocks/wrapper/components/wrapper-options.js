import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { PanelBody, TextControl, Dashicon, TabPanel, Icon, ToggleControl, Button, Modal } from '@wordpress/components';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { WrapperTab } from './wrapper-tab';
import globalSettings from '../../manifest.json';

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

		wrapperHideBlockLarge,
		wrapperHideBlockDesktop,
		wrapperHideBlockTablet,
		wrapperHideBlockMobile,
	} = attributes;

	const [isOpen, activeModal] = useState(false);

	return (
		<Fragment>
			{!wrapperDisable &&
				<PanelBody title={__('Block Layout', 'eightshift-boilerplate')} initialOpen={false}>

					<Fragment>
						<Button isDefault isSmall onClick={() => activeModal(true)}>
							{__('How to use wrapper?', 'eightshift-boilerplate')}
						</Button>
						{isOpen && (
							<Modal
								title={__('Block Layout', 'eightshift-boilerplate')}
								onRequestClose={() => activeModal(false)}>
								<h4>{__('Block ID', 'eightshift-boilerplate')}</h4>
								<p>{__('Add Unique ID to the block.', 'eightshift-boilerplate')}</p>
								<hr />
								<h4>{__('Block Anchor ID', 'eightshift-boilerplate')}</h4>
								<p>{__('Add Unique Anchor ID to the block.', 'eightshift-boilerplate')}</p>
								<hr />
								<h4>{__('Content Width', 'eightshift-boilerplate')}</h4>
								<p>{sprintf(__('Option to change the block width in the grid from the left. Change column width in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}</p>
								<hr />
								<h4>{__('Content Offset', 'eightshift-boilerplate')}</h4>
								<p>{sprintf(__('Option to change the block offset in the grid from the left. Change block offset in %d columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate'), globalSettings.globalVariables.maxCols)}</p>
								<hr />
								<h4>{__('Container Width', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Container width. Changing this option will affect total width of the block and the total size of grid inside the block.', 'eightshift-boilerplate')}</p>
								<hr />
								<h4>{__('Container Spacing', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Container spacing on the left and right. More popular name is Container Gutter.', 'eightshift-boilerplate')}</p>
								<hr />
								<h4>{__('Spacing Top', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}</p>
								<hr />
								<h4>{__('Divider Top', 'eightshift-boilerplate')}</h4>
								<p></p>
								<hr />
								<h4>{__('Spacing Bottom', 'eightshift-boilerplate')}</h4>
								<p>{__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}</p>
								<hr />
								<h4>{__('Divider Bottom', 'eightshift-boilerplate')}</h4>
								<p></p>
								<hr />
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
							<TabPanel
								className="custom-button-tabs"
								activeClass="components-button is-button is-primary"
								tabs={[
									{
										name: 'large',
										title: <Dashicon icon="desktop" />,
										className: `tab-large components-button is-button is-default custom-button-with-icon ${wrapperHideBlockLarge && 'show-info'}`,
									},
									{
										name: 'desktop',
										title: <Dashicon icon="laptop" />,
										className: `tab-desktop components-button is-button is-default custom-button-with-icon ${wrapperHideBlockDesktop && 'show-info'}`,
									},
									{
										name: 'tablet',
										title: <Dashicon icon="tablet" />,
										className: `tab-tablet components-button is-button is-default custom-button-with-icon ${wrapperHideBlockTablet && 'show-info'}`,
									},
									{
										name: 'mobile',
										title: <Dashicon icon="smartphone" />,
										className: `tab-mobile components-button is-button is-default custom-button-with-icon ${wrapperHideBlockMobile && 'show-info'}`,
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
												<p className="block-editor-block-card__description">{__('This options will only control large screens options.', 'eightshift-boilerplate')}</p>
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
												<p className="block-editor-block-card__description">{__('This options will only control desktop screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
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
												<p className="block-editor-block-card__description">{__('This options will only control tablet screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
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
												<p className="block-editor-block-card__description">{__('This options will only control mobile screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
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
