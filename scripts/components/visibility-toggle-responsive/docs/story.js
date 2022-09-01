import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { VisibilityToggleResponsive } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';

export default {
	title: 'Options/VisibilityToggleResponsive',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const manifest = {
	attributes: {
		componentHideLarge: {
			type: 'string',
			default: 'false'
		},
		componentHideDesktop: {
			type: 'string'
		},
		componentHideTablet: {
			type: 'string'
		},
		componentHideMobile: {
			type: 'string'
		},
	},
	responsiveAttributes: {
		componentHide: [
			'componentHideLarge',
			'componentHideDesktop',
			'componentHideTablet',
			'componentHideMobile',
		],
	}
};

export const component = () => {
	const [attributes, setAttributes] = useState({
		componentHideLarge: 'false',
		componentHideDesktop: 'false',
		componentHideTablet: 'false',
		componentHideMobile: 'false',
	});

	return (
		<div className='es-max-w-96'>
			<VisibilityToggleResponsive
				attributeName='columnHide'
				label={__('Visibility', 'eightshift-frontend-libs')}
				manifest={manifest}
				attributes={attributes}
				setAttributes={setAttributes}
				breakpointNames={['large', 'desktop', 'tablet', 'mobile']}
			/>
		</div>
	);
};
