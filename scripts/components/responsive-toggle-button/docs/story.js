import React, { useState } from 'react';
import { ResponsiveToggleButton } from '../responsive-toggle-button';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor';

export default {
	title: 'Options/ResponsiveToggleButton',
};

export const component = () => {
	const defaultValue = {
		large: true,
		desktop: undefined,
		tablet: undefined,
		mobile: false,
	};

	const [value, setValue] = useState(defaultValue);

	const [value2, setValue2] = useState({
		large: true,
		desktop: -1,
		tablet: -1,
		mobile: false,
	});

	const [value3, setValue3] = useState({
		large: 'true',
		desktop: '',
		tablet: '',
		mobile: 'false',
	});

	const commonProps = {
		noBottomSpacing: true,
		icon: icons.emptyRect,
		label: 'Option name',
		subtitle: 'Subtitle',
		buttonIcon: icons.emptyCircle,
	};

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Responsive toggle button</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Basic control'
					propsUsed={{
						'inheritValue': 'Value that gets set when inherited.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value, null, 2)}</pre> }]}
				>
					<ResponsiveToggleButton
						value={value}
						onChange={(value) => setValue(value)}
						{...commonProps}
					/>
				</SingleItemShowcase>


				<SingleItemShowcase
					title='Custom "inherit" value'
					propsUsed={{
						'inheritCheck': 'Callback (<code>(value) => bool</code>) which defines when a value is inherited.',
						'inheritValue': 'Value that gets set when inherited.',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value2, null, 2)}</pre> }]}
				>
					<ResponsiveToggleButton
						value={value2}
						onChange={(value) => setValue2(value)}
						inheritCheck={(value) => value === -1}
						inheritValue={-1}
						{...commonProps}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='String values'
					propsUsed={{
						'stringValues': 'Returns values as strings',
					}}
					additionalPanels={[{ title: 'Current value', content: <pre>{JSON.stringify(value3, null, 2)}</pre> }]}
				>
					<ResponsiveToggleButton
						value={value3}
						onChange={(value) => setValue3(value)}
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
