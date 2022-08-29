import React, { useState } from 'react';
import { WidthOffsetRangeSlider } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';

export default {
	title: 'Options/WidthOffsetRangeSlider',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const manifest = {
	attributes: {
		componentWidthLarge: {
			type: 'string'
		},
		componentWidthDesktop: {
			type: 'string'
		},
		componentWidthTablet: {
			type: 'string'
		},
		componentWidthMobile: {
			type: 'string'
		},
		componentOffsetLarge: {
			type: 'string'
		},
		componentOffsetDesktop: {
			type: 'string'
		},
		componentOffsetTablet: {
			type: 'string'
		},
		componentOffsetMobile: {
			type: 'string'
		},
	},
	responsiveAttributes: {
		componentWidth: [
			'componentWidthLarge',
			'componentWidthDesktop',
			'componentWidthTablet',
			'componentWidthMobile',
		],
		componentOffset: [
			'componentOffsetLarge',
			'componentOffsetDesktop',
			'componentOffsetTablet',
			'componentOffsetMobile',
		],
	}
};

export const component = () => {
	const [attributes, setAttributes] = useState({
		componentWidthLarge: '8',
		componentWidthDesktop: '',
		componentWidthTablet: '',
		componentWidthMobile: '',

		componentOffsetLarge: '1',
		componentOffsetDesktop: '',
		componentOffsetTablet: '',
		componentOffsetMobile: '1',
	});

	return (
		<div style={{ width: 'max-content' }}>
			<WidthOffsetRangeSlider
				offsetAttributeName='componentOffset'
				widthAttributeName='componentWidth'
				manifest={manifest}
				attributes={attributes}
				setAttributes={setAttributes}
				showFullWidthToggle={false}
				breakpointNames={['large', 'desktop', 'tablet', 'mobile']}
			/>
		</div>
	);
};
