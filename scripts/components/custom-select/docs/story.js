import React, { useState } from 'react';
import readme from './readme.mdx';
import {
	Select,
	AsyncSelect,
	MultiSelect,
	AsyncMultiSelect,
	RSOption,
	RSSingleValue,
	RSMultiValue,
	RSDropdownIndicator,
	RSMultiValueRemove,
	RSClearIndicator,
	RSMultiValueContainer,
} from '@eightshift/frontend-libs/scripts';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/Select',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const data = [
	{
		'label': 'Item 1',
		'value': 'item-1',
	},
	{
		'label': 'Item 2',
		'value': 'item-2',
	},
	{
		'label': 'Item 3',
		'value': 'item-3',
	},
	{
		'label': 'Item 4',
		'value': 'item-4',
	},
	{
		'label': 'Item 5',
		'value': 'item-5',
	},
	{
		'label': 'Item 6',
		'value': 'item-6',
	},
];

const getData = (inputValue) => {
	const filterData = ({ label }) => label.toLowerCase().includes(inputValue.toLowerCase());
	return new Promise((resolve) => {
		setTimeout(() => {
			if (!inputValue) {
				resolve(data.slice(0, 3));
			}

			resolve(data.filter(filterData));
		}, 3000);
	});
};

const CustomMenuOption = props => (
	<RSOption {...props}>
		<div>
			<span role='img' aria-label='checkmark'>✅ &nbsp;</span>
			<span>{props.label}</span>
		</div>
	</RSOption>
);

const CustomValueDisplay = (props) => {

	return (
		<RSSingleValue {...props}>
			<span className='es-text-3.5 es-px-1 es-py-0.5 es-rounded-1 es-bg-eightshift-500 es-font-weight-600 es-color-pure-white es-display-inline-block'>
				{parseInt(props.data.value.replace('item-', '')) % 2 !== 0 && '⭐️ '}
				{props.children}
			</span>
		</RSSingleValue>
	);
};

const CustomMultiValueDisplay = (props) => {
	return (
		<RSMultiValue {...props}>
			<div>
				<span>{props.children}</span>
				<span className='es-font-weight-600'>
					{parseInt(props.data.value.replace('item-', '')) % 2 !== 0 ? ' (odd)' : ' (even)'}
				</span>
			</div>
		</RSMultiValue>
	);
};

const CustomDropdownIndicator = (props) => {
	return (
		<RSDropdownIndicator {...props}>
			<span className='es-text-5 -es-ml-1'>{props.selectProps.menuIsOpen ? '⬆️' : '⬇️'}</span>
		</RSDropdownIndicator>
	);
};

const CustomMultiValueContainer = (props) => {
	const customProps = {
		...props,
		innerProps: {
			...props.innerProps,
			style: {
				backgroundColor: '#FCFAFF',
				borderColor: '#610BEF',
				flexDirection: 'row-reverse',
				padding: '0.125rem 0.25rem',
				borderRadius: '0.25rem',
			},
		}
	};
	return (
		<RSMultiValueContainer {...customProps} />
	);
};

const CustomMultiValueRemoveButton = (props) => {
	return (
		<RSMultiValueRemove {...props}>
			❌
		</RSMultiValueRemove>
	);
};

const CustomClearIndicator = (props) => {
	return (
		<RSClearIndicator {...props}>
			<span className='es-text-5'>🚫</span>
		</RSClearIndicator>
	);
};

export const SingleSelect = () => {
	const [v, setV] = useState();
	const [v2, setV2] = useState();

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Select</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic select menu'>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Disable search' propsUsed={{ noSearch: 'Disables the search functionality' }}>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noSearch
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom placeholder' propsUsed={{ placeholder: 'Replaces the default placeholder text' }}>
					<Select
						label='Pick an item'
						options={data}
						placeholder='Pick me, pick me!'
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='<i>Clear</i> button' propsUsed={{ clearable: 'Enables clearing of the selected item' }}>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						clearable
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Auto-closing' propsUsed={{ closeMenuAfterSelect: 'Closes the menu after selecting an item' }}>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						closeMenuAfterSelect
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Simple value'
					propsUsed={{ simpleValue: 'Returns just the value, instead of an object' }}
					demoContainerClass='es-h-spaced es-gap-6!'
				>
					<div className='es-v-spaced es-w-full es-mb-auto'>
						<Select
							label='Regular select'
							onChange={(v) => setV(v)}
							value={v}
							options={data}
							noBottomSpacing
						/>

						<div className='es-mt-3'>
							<p className='es-mt-0 es-mb-2 es-font-weight-500 es-text-3 es-color-cool-gray-500'>VALUE</p>
							<div
								// eslint-disable-next-line max-len
								className='es-shadow-inner es-rounded-1 es-p-2 es-border-cool-gray-50 es-text-2.75 es-color-cool-gray-600 es-bg-gray-50 es-line-h-1.5 es-h-20'
							>
								<code style={{ whiteSpace: 'pre-wrap' }}>{`{\n label: '${v?.label ?? ''}',\n value: '${v?.value ?? ''}\n}'`}</code>
							</div>
						</div>
					</div>

					<div className='es-v-spaced es-w-full es-mb-auto'>
						<Select
							label={<code>simpleValue</code>}
							onChange={(v) => setV2(v)}
							value={v2}
							options={data}
							simpleValue
							noBottomSpacing
						/>

						<div className='es-mt-3'>
							<p className='es-mt-0 es-mb-2 es-font-weight-500 es-text-3 es-color-cool-gray-500'>VALUE</p>
							<div
								// eslint-disable-next-line max-len
								className='es-shadow-inner es-rounded-1 es-p-2 es-border-cool-gray-50 es-text-2.75 es-color-cool-gray-600 es-bg-gray-50 es-line-h-1.5 es-h-20'
							>
								<code>{`'${v2 ?? ''}'`}</code>
							</div>
						</div>
					</div>
				</SingleItemShowcase>
			</div>
		</>
	);
};

export const AsynchronousSelect = () => {
	const [v, setV] = useState();

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Asynchronous Select</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Basic select menu'
					additionalPanels={[
						{
							title: 'Getting dynamic data',
							content: (
								<>
									<p className='es-mt-0 es-mb-2 es-p-0'>
										A <code>Promise</code> should be passed to the <code>loadOptions</code> property.
									</p>

									<p className='es-mt-0 es-mb-0 es-p-0'>
										The callback should return an array with objects containing <code>label</code> and <code>value</code> keys.
									</p>
								</>
							),
						},
						{
							title: 'Available options',
							content: <span>All options from <code>Select</code> are available, with the exception of <code>simpleValue</code></span>,
						}
					]}
				>
					<AsyncSelect
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						loadOptions={getData}
						noBottomSpacing
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};

export const MultiItemSelect = () => {
	const [v, setV] = useState([]);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Multiple item Select</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Basic select menu'
					additionalPanels={[
						{
							title: 'Available options',
							content: <span>All options from <code>Select</code> are available</span>
						}
					]}
				>
					<MultiSelect
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noBottomSpacing
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};

export const AsynchronousMultiItemSelect = () => {
	const [v, setV] = useState([]);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Asynchronous multiple item Select</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Basic select menu'
					additionalPanels={[
						{
							title: 'Getting dynamic data',
							content: (
								<>
									<p className='es-mt-0 es-mb-2 es-p-0'>
										A <code>Promise</code> should be passed to the <code>loadOptions</code> property.
									</p>
									<p className='es-mt-0 es-mb-0 es-p-0'>
										The callback should return an array with objects containing <code>label</code> and <code>value</code> keys.
									</p>
								</>
							),
						},
						{
							title: 'Available options',
							content: <span>All options from <code>Select</code> are available, with the exception of <code>simpleValue</code></span>,
						}
					]}
				>
					<AsyncMultiSelect
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						loadOptions={getData}
						noBottomSpacing
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};

export const Customization = () => {
	const [v, setV] = useState();
	const [v2, setV2] = useState([]);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Select customization</h1>

			<h2 className='es-mt-0 es-mb-5 es-p-0 es-text-6 es-font-weight-500'>Single & multi-item Select</h2>
			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Custom dropdown icon'
					propsUsed={{
						customDropdownArrow: 'Custom dropdown component, should be wrapped with <code>RSDropdownIndicator</code>.'
					}}
				>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noBottomSpacing
						customDropdownArrow={CustomDropdownIndicator}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Custom dropdown option'
					propsUsed={{
						customMenuOption: 'Custom option component, should be wrapped with <code>RSOption</code>.'
					}}
				>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noBottomSpacing
						customMenuOption={CustomMenuOption}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Custom "Clear" indicator'
					propsUsed={{
						customClearIndicator: 'Custom clear indicator, should be wrapped with <code>RSClearIndicator</code>.'
					}}
				>
					<MultiSelect
						label='Pick an item'
						onChange={(v) => setV2(v)}
						value={v2}
						options={data}
						noBottomSpacing
						clearable
						customClearIndicator={CustomClearIndicator}
					/>
				</SingleItemShowcase>
			</div>

			<h2 className='es-mt-8 es-mb-5 es-p-0 es-text-6 es-font-weight-500'>Single-item Select only</h2>
			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Custom value display'
					propsUsed={{
						customValueDisplay: 'Custom value display, should be wrapped with <code>RSSingleValue</code>.'
					}}
				>
					<Select
						label='Pick an item'
						onChange={(v) => setV(v)}
						value={v}
						options={data}
						noBottomSpacing
						customValueDisplay={CustomValueDisplay}
					/>
				</SingleItemShowcase>

			</div>

			<h2 className='es-mt-8 es-mb-5 es-p-0 es-text-6 es-font-weight-500'>Multi-item Select only</h2>
			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Custom item remove icon'
					propsUsed={{
						customValueRemove: 'Custom value remove, should be wrapped with <code>RSMultiValueRemove</code>.'
					}}
				>
					<MultiSelect
						label='Pick an item'
						onChange={(v) => setV2(v)}
						value={v2}
						options={data}
						noBottomSpacing
						customValueRemove={CustomMultiValueRemoveButton}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Custom value display'
					propsUsed={{
						customValueDisplay: 'Custom value display, should be wrapped with <code>RSMultiValue</code>.'
					}}
				>
					<MultiSelect
						label='Pick an item'
						onChange={(v) => setV2(v)}
						value={v2}
						options={data}
						noBottomSpacing
						customValueDisplay={CustomMultiValueDisplay}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase
					title='Custom item container'
					propsUsed={{
						customValueContainer: 'Custom item container, should be wrapped with <code>RSMultiValueContainer</code>.'
					}}
				>
					<MultiSelect
						label='Pick an item'
						onChange={(v) => setV2(v)}
						value={v2}
						options={data}
						noBottomSpacing
						customValueContainer={CustomMultiValueContainer}
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
