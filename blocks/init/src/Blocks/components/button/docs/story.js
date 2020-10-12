import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { ButtonEditor } from '../components/button-editor';
import { ButtonOptions, buttonSizes, buttonWidths, buttonColors } from '../components/button-options';

export default {
	title: 'Components|Button',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-button',
	button: {
		url: 'https://fakeurl.com',
		content: 'This is a button',
		size: 'default',
		color: 'primary',
		width: 'default',
		isAnchor: false,
		id: 'ID',
	},
	label: 'Button',
	onChangeButtonUse: () => {},
	onChangeButtonContent: () => {},
	onChangeButtonUrl: () => {},
	onChangeButtonsize: () => {},
	onChangeButtonColor: () => {},
	onChangeButtonWidth: () => {},
	onChangeButtonId: () => {},
	onChangeButtonIsAnchor: () => {},
};

export const editor = () => (
	<ButtonEditor {...props} />
);

export const options = () => (
	<ButtonOptions {...props} />
);

export const size = () => (
	<Fragment>
		{buttonSizes.map((values, index) => (
			<Fragment key={index}>
				<ButtonEditor
					{...props}
					button={{
						...props.button,
						content: values.label,
						size: values.value,
					}}
				/>
				<br />
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const width = () => (
	<Fragment>
		{buttonWidths.map((values, index) => (
			<Fragment key={index}>
				<ButtonEditor
					{...props}
					button={{
						...props.button,
						content: values.label,
						width: values.value,
					}}
				/>
				<br />
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{buttonColors().map((values, index) => (
			<Fragment key={index}>
				<ButtonEditor
					{...props}
					button={{
						...props.button,
						content: values.name,
						color: values.slug,
					}}
				/>
				<br />
				<br />
			</Fragment>
		))}
	</Fragment>
);
