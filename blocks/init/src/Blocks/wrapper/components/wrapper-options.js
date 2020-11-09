import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { PanelBody, TextControl, TabPanel, Icon, ToggleControl, Button, Modal } from '@wordpress/components';
import { desktop, tablet, mobile, table } from '@wordpress/icons';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons, tabButtonClass } from '@eightshift/frontend-libs/scripts/editor';
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
							<TabPanel
								className="custom-button-tabs"
								activeClass="components-button is-button is-primary"
								tabs={[
									{
										name: 'large',
										title: <Fragment><Icon icon={desktop} />{'Large'}</Fragment>,
										className: `tab-large ${tabButtonClass} ${wrapperHideBlockLarge && 'show-info'}`,
									},
									{
										name: 'desktop',
										title: <Fragment><Icon icon={table} />{'Desktop'}</Fragment>,
										className: `tab-desktop ${tabButtonClass} ${wrapperHideBlockDesktop && 'show-info'}`,
									},
									{
										name: 'tablet',
										title: <Fragment><Icon icon={tablet} />{'Tablet'}</Fragment>,
										className: `tab-tablet ${tabButtonClass} ${wrapperHideBlockTablet && 'show-info'}`,
									},
									{
										name: 'mobile',
										title: <Fragment><Icon icon={mobile} />{'Mobile'}</Fragment>,
										className: `tab-mobile ${tabButtonClass} ${wrapperHideBlockMobile && 'show-info'}`,
									},
								]
								}
							>
								{(tab) => (
									<Fragment>
										{tab.name === 'large' && (
											<WrapperTab
												attributes={attributes}
												breakPoint={'large'}
												setAttributes={setAttributes}
											/>
										)}
										{tab.name === 'desktop' && (
											<WrapperTab
												attributes={attributes}
												breakPoint={'desktop'}
												setAttributes={setAttributes}
											/>
										)}
										{tab.name === 'tablet' && (
											<WrapperTab
												attributes={attributes}
												breakPoint={'tablet'}
												setAttributes={setAttributes}
											/>
										)}
										{tab.name === 'mobile' && (
											<WrapperTab
												attributes={attributes}
												breakPoint={'mobile'}
												setAttributes={setAttributes}
											/>
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
