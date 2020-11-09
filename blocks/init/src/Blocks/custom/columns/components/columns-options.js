/* eslint-disable no-unused-vars */

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TabPanel, Icon } from '@wordpress/components';
import { desktop, tablet, mobile, megaphone } from '@wordpress/icons';
import { ColumnsTab } from './columns-tab';

export const ColumnsOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Columns Details', 'eightshift-boilerplate')}>
			<TabPanel
				className="custom-button-tabs"
				activeClass="components-button is-button is-primary"
				tabs={[
					{
						name: 'large',
						title: <Icon icon={desktop} />,
						className: 'tab-large button button-secondary custom-button-with-icon',
					},
					{
						name: 'desktop',
						title: <Icon icon={megaphone} />,
						className: 'tab-desktop button button-secondary custom-button-with-icon',
					},
					{
						name: 'tablet',
						title: <Icon icon={tablet} />,
						className: 'tab-tablet button button-secondary custom-button-with-icon',
					},
					{
						name: 'mobile',
						title: <Icon icon={mobile} />,
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
								<ColumnsTab
									breakPoint={'large'}
									attributes={attributes}
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
								<ColumnsTab
									breakPoint={'desktop'}
									attributes={attributes}
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
								<ColumnsTab
									breakPoint={'tablet'}
									attributes={attributes}
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
								<ColumnsTab
									breakPoint={'mobile'}
									attributes={attributes}
									setAttributes={setAttributes}
								/>
							</Fragment>
						)}
					</Fragment>
				)}
			</TabPanel>
		</PanelBody>
	);
};
