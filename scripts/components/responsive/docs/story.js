import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { icons, ucfirst, NumberPicker } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { Responsive } from '../responsive';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/Responsive',
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

export const component = () => {
	const [attributes, setAttributes] = useState({
		demoComponentToggleLarge: 1,
		demoComponentToggleDesktop: '',
		demoComponentToggleTablet: '',
		demoComponentToggleMobile: 0,
	});

	const [attributes2, setAttributes2] = useState({
		demoComponentToggleLarge: 1,
		demoComponentToggleDesktop: '',
		demoComponentToggleTablet: '',
		demoComponentToggleMobile: 0,
	});

	const [attributes3, setAttributes3] = useState({
		demoComponentToggleLarge: 1,
		demoComponentToggleDesktop: '',
		demoComponentToggleTablet: '',
		demoComponentToggleMobile: 0,
	});

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Slider</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic component'>
					<Responsive
						label='Responsive'
						icon={icons.emptyRect}
						noBottomSpacing
					>
						{options.breakpoints.map((breakpoint, index) => {
							const point = ucfirst(breakpoint);
							const attr = `demoComponentToggle${point}`;

							return (
								<NumberPicker
									key={index}
									icon={icons.wrench}
									label={__('Demo option 1', 'eightshift-frontend-libs')}
									value={attributes[attr]}
									onChange={(value) => setAttributes({ ...attributes, [attr]: value })}
									noBottomSpacing
									min={0}
									max={1000}
									step={10}
									fixedWidth='4'
									inlineLabel
								/>
							);
						})}
					</Responsive>
				</SingleItemShowcase>

				<SingleItemShowcase title='Inherit button'>
					<Responsive
						label='Responsive'
						icon={icons.emptyRect}
						inheritButton={options.breakpoints.map((breakpoint) => {
							const point = ucfirst(breakpoint);
							const attr = `demoComponentToggle${point}`;

							return {
								callback: () => setAttributes2({
									...attributes2,
									[attr]: attributes2[attr] === '' ? '0' : '',
								}),
								isActive: attributes2[attr] === '',
							};
						})}
						noBottomSpacing
					>
						{options.breakpoints.map((breakpoint, index) => {
							const point = ucfirst(breakpoint);
							const attr = `demoComponentToggle${point}`;

							return (
								<NumberPicker
									key={index}
									icon={icons.wrench}
									label={__('Demo option 1', 'eightshift-frontend-libs')}
									value={attributes2[attr]}
									onChange={(value) => setAttributes2({ ...attributes2, [attr]: value })}
									noBottomSpacing
									min={0}
									max={1000}
									step={10}
									fixedWidth={4}
									inlineLabel
								/>
							);
						})}
					</Responsive>
				</SingleItemShowcase>

				<SingleItemShowcase title='Compact mode'>
					<Responsive
						label='Responsive'
						icon={icons.emptyRect}
						inheritButton={options.breakpoints.map((breakpoint) => {
							const point = ucfirst(breakpoint);
							const attr = `demoComponentToggle${point}`;

							return {
								callback: () => setAttributes3({
									...attributes3,
									[attr]: attributes3[attr] === '' ? '0' : '',
								}),
								isActive: attributes3[attr] === '',
							};
						})}
						noBottomSpacing
						inline
					>
						{options.breakpoints.map((breakpoint, index) => {
							const point = ucfirst(breakpoint);
							const attr = `demoComponentToggle${point}`;

							return (
								<NumberPicker
									key={index}
									value={attributes3[attr]}
									onChange={(value) => setAttributes3({ ...attributes3, [attr]: value })}
									noBottomSpacing
									min={0}
									max={1000}
									step={10}
									fixedWidth={4}
								/>
							);
						})}
					</Responsive>
				</SingleItemShowcase>
			</div>

		</>
	);
};
