import React, {useState} from 'react';
import { __ } from '@wordpress/i18n';
import { icons, ucfirst, IconToggle } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { CompactResponsive } from '../compact-responsive';

export default {
	title: 'Options/CompactResponsive',
	parameters: {
		docs: {
			page: readme
		}
	},
};



const options = {
	breakpoints: [
		'large',
		'desktop',
		'tablet',
		'mobile',
	],
};

export const basicComponent = () => {
	const [attributes, setAttributes] = useState({
		demoComponentToggleLarge: '1',
		demoComponentToggleDesktop: '',
		demoComponentToggleTablet: '',
		demoComponentToggleMobile: '0',
	});

	return (
		<div className='es-max-w-96'>
			<CompactResponsive
				label={__('Basic demo', 'eightshift-frontend-libs')}
				icon={icons.experiment}
			>
				{options.breakpoints.map((breakpoint, index) => {
					const point = ucfirst(breakpoint);
					const attr = `demoComponentToggle${point}`;

					return (
						<IconToggle
							key={index}
							icon={icons.wrench}
							label={__('Demo option 1', 'eightshift-frontend-libs')}
							checked={attributes[attr] === '1'}
							onChange={(value) => setAttributes({ ...attributes, [attr]: value === true ? '1' : '0' })} />
					);
				})}
			</CompactResponsive>
		</div>
	);
};

export const withInheritButton = () => {
	const [attributes, setAttributes] = useState({
		demoComponentToggleLarge: '1',
		demoComponentToggleDesktop: '',
		demoComponentToggleTablet: '',
		demoComponentToggleMobile: '0',
	});

	return (
		<div className='es-max-w-96'>
			<CompactResponsive
				label={__('Inheritance demo', 'eightshift-frontend-libs')}
				icon={icons.inherit}
				inheritButton={options.breakpoints.map((breakpoint) => {
					const point = ucfirst(breakpoint);
					const attr = `demoComponentToggle${point}`;

					return {
						callback: () => setAttributes({
							...attributes,
							[attr]: attributes[attr] === '' ? '0' : '',
						}),
						isActive: attributes[attr] === '',
					};
				})}
			>
				{options.breakpoints.map((breakpoint, index) => {
					const point = ucfirst(breakpoint);
					const attr = `demoComponentToggle${point}`;

					return (
						<IconToggle
							key={index}
							icon={icons.wrench}
							label={__('Demo option 1', 'eightshift-frontend-libs')}
							checked={attributes[attr] === '1'}
							onChange={(value) => setAttributes({ ...attributes, [attr]: value === true ? '1' : '0' })} />
					);
				})}
			</CompactResponsive>
		</div>
	);
};
