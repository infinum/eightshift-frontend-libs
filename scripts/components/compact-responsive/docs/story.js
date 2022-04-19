import React from 'react';
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

const attributes = {
	demoComponentToggleLarge: true,
	demoComponentToggleDesktop: undefined,
	demoComponentToggleTablet: undefined,
	demoComponentToggleMobile: false,
};

const setAttributes = () => { };

const options = {
	breakpoints: [
		'large',
		'desktop',
		'tablet',
		'mobile',
	],
};

export const basicComponent = () => (
	<CompactResponsive
		label={__('Basic demo', 'eightshift-frontend-libs')}
		icon={icons.spacingBottom}
	>
		{options.breakpoints.map((breakpoint, index) => {
			const point = ucfirst(breakpoint);
			const attr = `demoComponentToggle${point}`;

			return (
				<IconToggle
					key={index}
					icon={icons.wrench}
					label={__('Demo option 1', 'eightshift-frontend-libs')}
					checked={attributes[attr]}
					onChange={(value) => setAttributes({ [attr]: value })}
				/>
			);
		})}
	</CompactResponsive>
);

export const withInheritButton = () => (
	<CompactResponsive
		label={__('Inheritance demo', 'eightshift-frontend-libs')}
		icon={icons.spacingBottom}
		inheritButton={options.breakpoints.map((breakpoint) => {
			const point = ucfirst(breakpoint);
			const attr = `demoComponentToggle${point}`;

			return {
				callback: () => setAttributes({
					[attr]: attributes[attr] === undefined ? false : undefined,
				}),
				isActive: attributes[attr] === undefined,
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
					checked={attributes[attr]}
					onChange={(value) => setAttributes({ [attr]: value })}
				/>
			);
		})}
	</CompactResponsive>
);
