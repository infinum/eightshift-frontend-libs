import React, { useState } from 'react';
import { ResponsiveNumberPicker } from '../responsive-number-picker';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor';

export default {
	title: 'Options/ResponsiveNumberPicker',
};

export const component = () => {
	const defaultValue = {
		large: 8,
		desktop: undefined,
		tablet: undefined,
		mobile: 12,
	};

	const [value, setValue] = useState(defaultValue);
	const [value2, setValue2] = useState(defaultValue);
	const [value3, setValue3] = useState(defaultValue);

	const [value4, setValue4] = useState({
		large: 8,
		desktop: -1,
		tablet: -1,
		mobile: 12,
	});

	const [value5, setValue5] = useState({
		large: '8',
		desktop: '',
		tablet: '',
		mobile: 12,
	});

	const commonProps = {
		min: 0,
		max: 50,
		step: 1,
		noBottomSpacing: true,
		icon: icons.emptyRect,
		label: 'Option name',
		subtitle: 'Subtitle',
	};

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Responsive number picker</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Basic control'
					propsUsed={{
						'inheritValue': 'Value that gets set when inherited.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value, null, 2)}</pre> }]}
				>
					<ResponsiveNumberPicker
						value={value}
						onChange={(value) => setValue(value)}
						{...commonProps}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Reset button - value 0'
					propsUsed={{
						'resetButton': 'Adds a "Reset" button.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value2, null, 2)}</pre> }]}
				>
					<ResponsiveNumberPicker
						value={value2}
						onChange={(value) => setValue2(value)}
						{...commonProps}
						resetButton={0}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Reset button'
					propsUsed={{
						'resetButton': 'Adds a "Reset" button.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value3, null, 2)}</pre> }]}
				>
					<ResponsiveNumberPicker
						value={value3}
						onChange={(value) => setValue3(value)}
						{...commonProps}
						resetButton={20}
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
					<ResponsiveNumberPicker
						value={value4}
						onChange={(value) => setValue4(value)}
						inheritCheck={(value) => value === -1}
						inheritValue={-1}
						{...commonProps}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Numeric values'
					propsUsed={{
						'stringValues': 'Returns values as strings',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value5, null, 2)}</pre> }]}
				>
					<ResponsiveNumberPicker
						value={value5}
						onChange={(value) => setValue5(value)}
						noBottomSpacing
						stringValues
						inheritValue=''
						{...commonProps}
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
