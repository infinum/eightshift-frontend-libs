import React, { useState } from 'react';
import { icons, ucfirst } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SimpleHorizontalSingleSelect } from '../simple-horizontal-single-select';

export default {
	title: 'Options/SimpleHorizontalSingleSelect',
	parameters: {
		docs: {
			page: readme,
		}
	},
};

const ControlDisplay = (props) => {
	return (
		<div>
			<h4 style={{
				margin: 0,
				marginBottom: '0.5rem',
			}}>
				{props.title}
			</h4>

			{props.subtitle &&
				<p
					style={{
						margin: 0,
						marginBottom: '0.5rem',
					}}
				>
					{props.subtitle}
				</p>
			}

			{props.propsUsed &&
				<>
					<p style={{
						margin: 0,
						marginTop: '1rem',
						marginBottom: '0.25rem',
						fontSize: '0.8rem',
					}}
					>
						Highlighted props:
					</p>
					<ul style={{
						margin: 0,
						marginBottom: '0.5rem',
						padding: 0,
						listStyle: 'none',
					}}>
						{props.propsUsed.map((p, i) => (
							<li key={i}><code>{p}</code></li>
						))}
					</ul>
				</>
			}

			<div style={{
				border: '1px dashed #eee',
				padding: '0.5rem',
				borderRadius: '0.5rem',
			}}>
				{props.children}
			</div>
		</div>
	);
};

export const component = () => {
	const [first, setFirst] = useState('s');
	const [second, setSecond] = useState();
	const [third, setThird] = useState();

	const options = [
		{
			icon: icons.small,
			label: 'Small',
			value: 's',
		},
		{
			icon: icons.medium,
			label: 'Medium',
			value: 'm',
		},
		{
			icon: icons.large,
			label: 'Large',
			value: 'l',
		}
	];

	const optionsWithoutIcons = [
		{
			label: 'S',
			tooltip: 'Small',
			value: 's',
		},
		{
			label: 'M',
			tooltip: 'Medium',
			value: 'm',
		},
		{
			label: 'L',
			tooltip: 'Large',
			value: 'l',
		}
	];

	const optionsWithoutIcons2 = [
		{
			label: 'Off',
			value: undefined,
		},
		{
			label: 'Small',
			value: 's',
		},
		{
			label: 'Medium',
			value: 'm',
		},
		{
			label: 'Large',
			value: 'l',
		},
		{
			label: 'Huge',
			value: 'xl',
		}
	];

	const iconOptions = Object.entries(icons).map(([iconName, icon]) => ({
		label: ucfirst(iconName),
		value: iconName,
		icon: icon,
	}));

	return (
		<div style={{ width: '20rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '2rem', '--selected-color': '#028BFF' }}>
			<ControlDisplay
				title='Default'
			>
				<SimpleHorizontalSingleSelect
					label='Size'
					options={optionsWithoutIcons}
					onChange={(v) => setFirst(v)}
					value={first}
					includeWpBottomSpacing={false}
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Inline label'
				propsUsed={['inlineLabel']}
			>
				<SimpleHorizontalSingleSelect
					inlineLabel='Size'
					options={optionsWithoutIcons}
					onChange={(v) => setFirst(v)}
					value={first}
					includeWpBottomSpacing={false}
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Icons only, inline label'
				propsUsed={['iconOnly', 'inlineLabel']}
			>
				<SimpleHorizontalSingleSelect
					inlineLabel='Size'
					options={options}
					onChange={(v) => setFirst(v)}
					value={first}
					iconOnly
					includeWpBottomSpacing={false}
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Icons only, inline label, radio-style border'
				subtitle="This kind of border should only be used with options that don't wrap"
				propsUsed={['iconOnly', 'inlineLabel', 'border = inset']}
			>
				<SimpleHorizontalSingleSelect
					inlineLabel='Size'
					options={options}
					onChange={(v) => setFirst(v)}
					value={first}
					iconOnly
					includeWpBottomSpacing={false}
					border='inset'
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Icons only, inline label, WP 5.9-style border'
				propsUsed={['iconOnly', 'inlineLabel', 'border = offset']}
			>
				<SimpleHorizontalSingleSelect
					inlineLabel='Size'
					options={options}
					onChange={(v) => setFirst(v)}
					value={first}
					iconOnly
					includeWpBottomSpacing={false}
					border='offset'
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Fullwidth, WP 5.9-style border'
				propsUsed={['label', 'border = offset', 'alignment = stretch']}
			>
				<SimpleHorizontalSingleSelect
					label='Size'
					options={optionsWithoutIcons2}
					onChange={(v) => setThird(v)}
					value={third}
					includeWpBottomSpacing={false}
					border='offset'
					alignment='stretch'
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Icon-only, left aligned, WP 5.9-style border'
				propsUsed={['iconOnly', 'label', 'border = offset', 'alignment = left']}
			>
				<SimpleHorizontalSingleSelect
					label='Size'
					options={options}
					onChange={(v) => setFirst(v)}
					value={first}
					includeWpBottomSpacing={false}
					border='offset'
					alignment='left'
					iconOnly
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Compact buttons, inline label, WP 5.9-style border'
				propsUsed={['inlineLabel', 'border = offset', 'compactButtons']}
			>
				<SimpleHorizontalSingleSelect
					inlineLabel='Size'
					options={optionsWithoutIcons2}
					onChange={(v) => setThird(v)}
					value={third}
					includeWpBottomSpacing={false}
					border='offset'
					compactButtons
				/>
			</ControlDisplay>

			<ControlDisplay
				title='Icon only, huge amount of options'
				propsUsed={['label', 'iconOnly', 'alignment = right']}
			>
				<SimpleHorizontalSingleSelect
					label='Icon'
					options={iconOptions}
					onChange={(v) => setSecond(v)}
					value={second}
					alignment='right'
					iconOnly
				/>
			</ControlDisplay>
		</div >
	);
};
