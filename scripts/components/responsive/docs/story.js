import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Icon, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts/editor';
import readme from './readme.md';
import { Responsive } from '../responsive';

export default {
	title: 'Options|Responsive',
	parameters: {
		notes: readme,
	},
};

const attributes = {
	wrapperSpacingBottomLarge: 100,
	wrapperSpacingBottomDesktop: 50,
	wrapperSpacingBottomTablet: 30,
	wrapperSpacingBottomMobile: 10,

	wrapperDividerBottomLarge: true,
	wrapperDividerBottomDesktop: false,
	wrapperDividerBottomTablet: false,
	wrapperDividerBottomMobile: false,
};

const wrapperSpacingBottom = [
	attributes.wrapperSpacingBottomLarge,
	attributes.wrapperSpacingBottomDesktop,
	attributes.wrapperSpacingBottomTablet,
	attributes.wrapperSpacingBottomMobile,
];

const wrapperDividerBottom = [
	attributes.wrapperDividerBottomLarge,
	attributes.wrapperDividerBottomDesktop,
	attributes.wrapperDividerBottomTablet,
	attributes.wrapperDividerBottomMobile,
];

const wrapperContainerWidth = [
	attributes.wrapperContainerWidthLarge,
	attributes.wrapperContainerWidthDesktop,
	attributes.wrapperContainerWidthTablet,
	attributes.wrapperContainerWidthMobile,
];

const setAttributes = () => {};

const defaults = {
	sectionSpacing: {
		min: -300,
		max: 300,
		step: 10,
	},
};

const options = {
	breakpoints: [
		'large',
		'desktop',
		'tablet',
		'mobile',
	],
	containerWidths: [
		{
			label: 'Not Set',
			value: '',
		},
		{
			label: 'Default',
			value: 'default',
		},
	],
};

const reset = {
	wrapperSpacingBottomLarge: {
		type: 'int',
		default: 40,
	},
	wrapperSpacingBottomDesktop: {
		type: 'int',
	},
	wrapperSpacingBottomTablet: {
		type: 'int',
	},
	wrapperSpacingBottomMobile: {
		type: 'int',
	},

	wrapperDividerBottomLarge: {
		type: 'boolean',
		default: true,
	},
	wrapperDividerBottomDesktop: {
		type: 'boolean',
	},
	wrapperDividerBottomTablet: {
		type: 'boolean',
	},
	wrapperDividerBottomMobile: {
		type: 'boolean',
	},

	wrapperContainerWidthLarge: {
		type: 'string',
		default: 'default',
	},
	wrapperContainerWidthDesktop: {
		type: 'string',
	},
	wrapperContainerWidthTablet: {
		type: 'string',
	},
	wrapperContainerWidthMobile: {
		type: 'string',
	},
};

export const componentRange = () => (
	<Responsive
		label={
			<Fragment>
				<Icon icon={icons.spacingBottom} />
				{__('Spacing Bottom', 'eightshift-boilerplate')}
			</Fragment>
		}
	>
		{wrapperSpacingBottom.map((item, index) => {

			const point = ucfirst(options.breakpoints[index]);
			const attr = `wrapperSpacingBottom${point}`;

			return (
				<Fragment key={index}>
					<RangeControl
						label={point}
						allowReset={true}
						value={attributes[attr]}
						onChange={(value) => setAttributes({ [attr]: value })}
						min={defaults.sectionSpacing.min}
						max={defaults.sectionSpacing.max}
						step={defaults.sectionSpacing.step}
						resetFallbackValue={reset[attr].default}
					/>
				</Fragment>
			);
		})}
	</Responsive>
);

export const componentToggle = () => (
	<Responsive
		label={
			<Fragment>
				<Icon icon={icons.dividerBottom} />
				{__('Divider Bottom', 'eightshift-boilerplate')}
			</Fragment>
		}
	>
		{wrapperDividerBottom.map((item, index) => {

			const point = ucfirst(options.breakpoints[index]);
			const attr = `wrapperDividerBottom${point}`;

			return (
				<Fragment key={index}>
					<ToggleControl
						label={point}
						checked={attributes[attr]}
						onChange={(value) => setAttributes({ [attr]: value })}
					/>
				</Fragment>
			);
		})}
	</Responsive>
);

export const componentSelect = () => (
	<Responsive
		label={
			<Fragment>
				<Icon icon={icons.containerWidth} />
				{__('ContainerWidth', 'eightshift-boilerplate')}
			</Fragment>
		}
	>
		{wrapperContainerWidth.map((item, index) => {

			const point = ucfirst(options.breakpoints[index]);
			const attr = `wrapperContainerWidth${point}`;

			return (
				<Fragment key={index}>
					<SelectControl
						label={point}
						options={options.containerWidths}
						value={attributes[attr]}
						onChange={(value) => setAttributes({ [attr]: value })}
					/>
				</Fragment>
			);
		})}
	</Responsive>
);
