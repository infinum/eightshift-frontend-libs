/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TabPanel, Dashicon } from '@wordpress/components';
import { ColumnResponsiveTabContent } from './column-responsive-tab-content';

export const ColumnOptions = (props) => {
  const {
    attributes: {

      // Large.
      widthLarge,
      hideLarge,
      offsetLarge,

      // Desktop.
      widthDesktop,
      hideDesktop,
      offsetDesktop,

      // Tablet.
      widthTablet,
      hideTablet,
      offsetTablet,

      // Mobile.
      widthMobile,
      hideMobile,
      offsetMobile,
    },
    actions: {

      // Large.
      onChangeWidthLarge,
      onChangeHideLarge,
      onChangeOffsetLarge,

      // Desktop.
      onChangeWidthDesktop,
      onChangeHideDesktop,
      onChangeOffsetDesktop,

      // Tablet.
      onChangeWidthTablet,
      onChangeHideTablet,
      onChangeOffsetTablet,

      // Mobile.
      onChangeWidthMobile,
      onChangeHideMobile,
      onChangeOffsetMobile,
    },
  } = props;

  return (
    <PanelBody title={__('Column Details', 'eightshift-boilerplate')}>

      <TabPanel
        className="custom-button-tabs"
        activeClass="button button-primary"
        tabs={[
          {
            name: 'large',
            title: <Dashicon icon="desktop" />,
            className: 'tab-large button button-secondary custom-button-with-icon',
          },
          {
            name: 'desktop',
            title: <Dashicon icon="laptop" />,
            className: 'tab-desktop button button-secondary custom-button-with-icon',
          },
          {
            name: 'tablet',
            title: <Dashicon icon="tablet" />,
            className: 'tab-tablet button button-secondary custom-button-with-icon',
          },
          {
            name: 'mobile',
            title: <Dashicon icon="smartphone" />,
            className: 'tab-mobile button button-secondary custom-button-with-icon',
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
                <ColumnResponsiveTabContent
                  width={widthLarge}
                  onChangeWidth={onChangeWidthLarge}
                  hide={hideLarge}
                  onChangeHide={onChangeHideLarge}
                  offset={offsetLarge}
                  onChangeOffset={onChangeOffsetLarge}
                />
              </Fragment>
            )}
            {tab.name === 'desktop' && (
              <Fragment>
                <br />
                <strong className="notice-title">{__('Desktop Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control desktop screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={widthDesktop}
                  onChangeWidth={onChangeWidthDesktop}
                  hide={hideDesktop}
                  onChangeHide={onChangeHideDesktop}
                  offset={offsetDesktop}
                  onChangeOffset={onChangeOffsetDesktop}
                />
              </Fragment>
            )}
            {tab.name === 'tablet' && (
              <Fragment>
                <br />
                <strong className="notice-title">{__('Tablet Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control tablet screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={widthTablet}
                  onChangeWidth={onChangeWidthTablet}
                  hide={hideTablet}
                  onChangeHide={onChangeHideTablet}
                  offset={offsetTablet}
                  onChangeOffset={onChangeOffsetTablet}
                />
              </Fragment>
            )}
            {tab.name === 'mobile' && (
              <Fragment>
                <br />
                <strong className="notice-title ">{__('Mobile Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control mobile screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={widthMobile}
                  onChangeWidth={onChangeWidthMobile}
                  hide={hideMobile}
                  onChangeHide={onChangeHideMobile}
                  offset={offsetMobile}
                  onChangeOffset={onChangeOffsetMobile}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </TabPanel>
    </PanelBody>
  );
};
