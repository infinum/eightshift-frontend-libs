import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { SpacingSlider } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';

export default {
	title: 'Options/SpacingSlider',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const manifest = {
	attributes: {
		componentWidthLarge: {
			type: 'integer',
			default: 12
		},
		componentWidthDesktop: {
			type: 'integer'
		},
		componentWidthTablet: {
			type: 'integer'
		},
		componentWidthMobile: {
			type: 'integer'
		},
	},
	responsiveAttributes: {
		componentWidth: [
			'componentWidthLarge',
			'componentWidthDesktop',
			'componentWidthTablet',
			'componentWidthMobile',
		],
	},
	options: {
		componentWidth: {
			min: 1,
			max: 20,
			step: 1,
		}
	}
};

export const component = () => {
	const [attributes, setAttributes] = useState({
		componentWidthLarge: 12,
		componentWidthDesktop: '',
		componentWidthTablet: '',
		componentWidthMobile: '',
	});

	return (
		<div className='es-max-w-96'>
			<SpacingSlider
				attributeName='columnWidth'
				label={__('Width', 'eightshift-frontend-libs')}
				manifest={manifest}
				attributes={attributes}
				setAttributes={setAttributes}
				breakpointNames={['large', 'desktop', 'tablet', 'mobile']}
			/>
		</div>
	);
};
