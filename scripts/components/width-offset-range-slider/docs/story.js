import React, { useState } from 'react';
import { WidthOffsetRangeSlider } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/WidthOffsetRangeSlider',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const defaultValue = {
		large: {
			width: '8',
			offset: '1',
		},
		desktop: {
			width: '',
			offset: '',
		},
		tablet: {
			width: '',
			offset: '',
		},
		mobile: {
			width: '12',
			offset: '2',
		},
	};

	const [value, setValue] = useState(defaultValue);
	const [value2, setValue2] = useState(defaultValue);
	const [value3, setValue3] = useState(defaultValue);

	const [value4, setValue4] = useState({
		large: {
			width: '8',
			offset: '1',
		},
		desktop: {},
		tablet: {},
		mobile: {
			width: '12',
			offset: '2',
		},
	});

	const [value5, setValue5] = useState({
		large: {
			width: 8,
			offset: 1,
		},
		desktop: {},
		tablet: {},
		mobile: {
			width: 12,
			offset: 2,
		},
	});

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Width & offset responsive slider</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Basic control'
					propsUsed={{
						'inheritValue': 'Value that gets set when inherited.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value, null, 2)}</pre> }]}
				>
					<WidthOffsetRangeSlider
						value={value}
						onChange={(value) => setValue(value)}
						inheritValue=''
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Fullwidth toggle'
					propsUsed={{
						'inheritValue': 'Value that gets set when inherited.',
						'fullWidthToggle': 'Shows the "Fullwidth" toggle, which adds 2 extra columns to allow placing inside the gutter',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value2, null, 2)}</pre> }]}
				>
					<WidthOffsetRangeSlider
						value={value2}
						onChange={(value) => setValue2(value)}
						inheritValue=''
						fullWidthToggle
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Auto offset toggle'
					propsUsed={{
						'inheritValue': 'Value that gets set when inherited.',
						'autoOffsetToggle': 'Shows the "Automatic offset" toggle on the first breakpoint, which sets the offset to <code>auto</code>',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value3, null, 2)}</pre> }]}
				>
					<WidthOffsetRangeSlider
						value={value3}
						onChange={(value) => setValue3(value)}
						inheritValue=''
						autoOffsetToggle
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Custom "inherit" value'
					propsUsed={{
						'inheritCheck': 'Callback (<code>(value) => bool</code>) which defines when a value is inherited.',
						'inheritValue': 'Value that gets set when inherited.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value4, null, 2)}</pre> }]}
				>
					<WidthOffsetRangeSlider
						value={value4}
						onChange={(value) => setValue4(value)}
						inheritCheck={(value) => typeof value === 'undefined'}
						inheritValue={undefined}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Numeric values'
					propsUsed={{
						'numericValues': 'Value that gets set when inherited.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value5, null, 2)}</pre> }]}
				>
					<WidthOffsetRangeSlider
						value={value5}
						onChange={(value) => setValue5(value)}
						noBottomSpacing
						numericValues
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
