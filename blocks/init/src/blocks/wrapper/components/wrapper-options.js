import React from './node_modules/react'; // eslint-disable-line no-unused-vars
import { __ } from './node_modules/@wordpress/i18n';
import { Fragment } from './node_modules/@wordpress/element';
import { PanelBody, TextControl, Dashicon, TabPanel, Icon, ToggleControl } from './node_modules/@wordpress/components';
import { ColorPaletteCustom } from './node_modules/@eightshift/frontend-libs/scripts/components';
import { icons } from './node_modules/@eightshift/frontend-libs/scripts/editor';
import { WrapperResponsiveTabContent } from './wrapper-responsive-tab-content';

export const WrapperOptions = ({ attributes, actions }) => {
  const {
    wrapperUse,
    wrapperUseShowControl,
    wrapperUseSimple,
    wrapperUseSimpleShowControl,
    wrapperDisable,
    wrapperId,
    wrapperBackgroundColor,
    wrapperWidth,
    wrapperOffset,
    wrapperContainerWidth,
    wrapperGutter,
    wrapperSpacingTop,
    wrapperSpacingBottom,
    wrapperHideBlock,
  } = attributes;

  const {
    onChangeWrapperUse,
    onChangeWrapperUseSimple,

    onChangeWrapperWidthLarge,
    onChangeWrapperOffsetLarge,
    onChangeWrapperContainerWidthLarge,
    onChangeWrapperGutterLarge,
    onChangeWrapperSpacingTopLarge,
    onChangeWrapperSpacingBottomLarge,
    onChangeWrapperHideBlockLarge,

    onChangeWrapperWidthDesktop,
    onChangeWrapperOffsetDesktop,
    onChangeWrapperContainerWidthDesktop,
    onChangeWrapperGutterDesktop,
    onChangeWrapperSpacingTopDesktop,
    onChangeWrapperSpacingBottomDesktop,
    onChangeWrapperHideBlockDesktop,

    onChangeWrapperWidthTablet,
    onChangeWrapperOffsetTablet,
    onChangeWrapperContainerWidthTablet,
    onChangeWrapperGutterTablet,
    onChangeWrapperSpacingTopTablet,
    onChangeWrapperSpacingBottomTablet,
    onChangeWrapperHideBlockTablet,

    onChangeWrapperWidthMobile,
    onChangeWrapperOffsetMobile,
    onChangeWrapperContainerWidthMobile,
    onChangeWrapperGutterMobile,
    onChangeWrapperSpacingTopMobile,
    onChangeWrapperSpacingBottomMobile,
    onChangeWrapperHideBlockMobile,

    onChangeWrapperBackgroundColor,
    onChangeWrapperId,
  } = actions;

  const widthObject = (typeof wrapperWidth === 'undefined') || wrapperWidth;
  const offsetObject = (typeof wrapperOffset === 'undefined') || wrapperOffset;
  const containerWidthObject = (typeof wrapperContainerWidth === 'undefined') || wrapperContainerWidth;
  const gutterObject = (typeof wrapperGutter === 'undefined') || wrapperGutter;
  const spacingTopObject = (typeof wrapperSpacingTop === 'undefined') || wrapperSpacingTop;
  const spacingBottomObject = (typeof wrapperSpacingBottom === 'undefined') || wrapperSpacingBottom;
  const hideBlockObject = (typeof wrapperHideBlock === 'undefined') || wrapperHideBlock;

  return (
    <Fragment>
      {!wrapperDisable &&
        <PanelBody title={__('Wrapper Responsive Layout', 'eightshift-boilerplate')} initialOpen={false}>

          {(onChangeWrapperUse && wrapperUseShowControl) &&
            <ToggleControl
              label={wrapperUse ? __('Wrapper Enabled', 'eightshift-boilerplate') : __('Wrapper Disabled', 'eightshift-boilerplate')}
              help={__('Toggle wrapper options on/off.', 'eightshift-boilerplate')}
              checked={wrapperUse}
              onChange={onChangeWrapperUse}
            />
          }

          {(onChangeWrapperUseSimple && wrapperUse && wrapperUseSimpleShowControl) &&
            <ToggleControl
              label={wrapperUseSimple ? __('Wrapper Simple Enabled', 'eightshift-boilerplate') : __('Wrapper Simple Disabled', 'eightshift-boilerplate')}
              help={__('Toggle wrapper Simple options on/off.', 'eightshift-boilerplate')}
              checked={wrapperUseSimple}
              onChange={onChangeWrapperUseSimple}
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
                        <WrapperResponsiveTabContent
                          type={'large'}
                          useSimple={wrapperUseSimple}
                          width={widthObject}
                          offset={offsetObject}
                          containerWidth={containerWidthObject}
                          gutter={gutterObject}
                          spacingTop={spacingTopObject}
                          spacingBottom={spacingBottomObject}
                          hideBlock={hideBlockObject}
                          onChangeWidth={onChangeWrapperWidthLarge}
                          onChangeOffset={onChangeWrapperOffsetLarge}
                          onChangeContainerWidth={onChangeWrapperContainerWidthLarge}
                          onChangeGutter={onChangeWrapperGutterLarge}
                          onChangeSpacingTop={onChangeWrapperSpacingTopLarge}
                          onChangeSpacingBottom={onChangeWrapperSpacingBottomLarge}
                          onChangeHideBlock={onChangeWrapperHideBlockLarge}
                        />
                      </Fragment>
                    )}
                    {tab.name === 'desktop' && (
                      <Fragment>
                        <br />
                        <strong className="notice-title">{__('Desktop Layout Options', 'eightshift-boilerplate')}</strong>
                        <p>{__('This options will only control desktop screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                        <br />
                        <WrapperResponsiveTabContent
                          type={'desktop'}
                          useSimple={wrapperUseSimple}
                          width={widthObject}
                          offset={offsetObject}
                          containerWidth={containerWidthObject}
                          gutter={gutterObject}
                          spacingTop={spacingTopObject}
                          spacingBottom={spacingBottomObject}
                          hideBlock={hideBlockObject}
                          onChangeWidth={onChangeWrapperWidthDesktop}
                          onChangeOffset={onChangeWrapperOffsetDesktop}
                          onChangeContainerWidth={onChangeWrapperContainerWidthDesktop}
                          onChangeGutter={onChangeWrapperGutterDesktop}
                          onChangeSpacingTop={onChangeWrapperSpacingTopDesktop}
                          onChangeSpacingBottom={onChangeWrapperSpacingBottomDesktop}
                          onChangeHideBlock={onChangeWrapperHideBlockDesktop}
                        />
                      </Fragment>
                    )}
                    {tab.name === 'tablet' && (
                      <Fragment>
                        <br />
                        <strong className="notice-title">{__('Tablet Layout Options', 'eightshift-boilerplate')}</strong>
                        <p>{__('This options will only control tablet screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                        <br />
                        <WrapperResponsiveTabContent
                          type={'tablet'}
                          useSimple={wrapperUseSimple}
                          width={widthObject}
                          offset={offsetObject}
                          containerWidth={containerWidthObject}
                          gutter={gutterObject}
                          spacingTop={spacingTopObject}
                          spacingBottom={spacingBottomObject}
                          hideBlock={hideBlockObject}
                          onChangeWidth={onChangeWrapperWidthTablet}
                          onChangeOffset={onChangeWrapperOffsetTablet}
                          onChangeContainerWidth={onChangeWrapperContainerWidthTablet}
                          onChangeGutter={onChangeWrapperGutterTablet}
                          onChangeSpacingTop={onChangeWrapperSpacingTopTablet}
                          onChangeSpacingBottom={onChangeWrapperSpacingBottomTablet}
                          onChangeHideBlock={onChangeWrapperHideBlockTablet}
                        />
                      </Fragment>
                    )}
                    {tab.name === 'mobile' && (
                      <Fragment>
                        <br />
                        <strong className="notice-title ">{__('Mobile Layout Options', 'eightshift-boilerplate')}</strong>
                        <p>{__('This options will only control mobile screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                        <br />
                        <WrapperResponsiveTabContent
                          type={'mobile'}
                          useSimple={wrapperUseSimple}
                          width={widthObject}
                          offset={offsetObject}
                          containerWidth={containerWidthObject}
                          gutter={gutterObject}
                          spacingTop={spacingTopObject}
                          spacingBottom={spacingBottomObject}
                          hideBlock={hideBlockObject}
                          onChangeWidth={onChangeWrapperWidthMobile}
                          onChangeOffset={onChangeWrapperOffsetMobile}
                          onChangeContainerWidth={onChangeWrapperContainerWidthMobile}
                          onChangeGutter={onChangeWrapperGutterMobile}
                          onChangeSpacingTop={onChangeWrapperSpacingTopMobile}
                          onChangeSpacingBottom={onChangeWrapperSpacingBottomMobile}
                          onChangeHideBlock={onChangeWrapperHideBlockMobile}
                        />
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </TabPanel>

              {onChangeWrapperBackgroundColor &&
                <ColorPaletteCustom
                  label={
                    <Fragment>
                      <Icon icon={icons.color} />
                      {__('Background Color', 'eightshift-boilerplate')}
                    </Fragment>
                  }
                  help={__('Change Block Background color. Block spacing will be included in block background color.', 'eightshift-boilerplate')}
                  value={wrapperBackgroundColor}
                  onChange={onChangeWrapperBackgroundColor}
                />
              }

              {onChangeWrapperId &&
                <TextControl
                  label={
                    <Fragment>
                      <Icon icon={icons.id} />
                      {__('Block ID', 'eightshift-boilerplate')}
                    </Fragment>
                  }
                  help={__('Add Unique ID to the block.', 'eightshift-boilerplate')}
                  value={wrapperId}
                  onChange={onChangeWrapperId}
                />
              }

            </Fragment>
          }
        </PanelBody>
      }
    </Fragment>
  );
};
