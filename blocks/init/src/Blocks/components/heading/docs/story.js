import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { HeadingEditor } from '../components/heading-editor';
import { HeadingOptions, headingSizes } from '../components/heading-options';
import { HeadingToolbar } from '../components/heading-toolbar';

export default {
	title: 'Components|Heading',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-heading',
	heading: {
		content: 'This is Heading',
		align: 'left',
		level: 2,
		color: 'primary',
		size: 'default',
	},
	onChangeHeadingContent: () => {},
	onChangeHeadingColor: () => {},
	onChangeHeadingSize: () => {},
	onChangeHeadingLevel: () => {},
	onChangeHeadingAlign: () => {},
	onChangeHeadingUse: () => {},
};

export const editor = () => (
	<HeadingEditor {...props} />
);

export const options = () => (
	<HeadingOptions {...props} />
);

export const toolbar = () => (
	<HeadingToolbar {...props} />
);

export const size = () => (
	<Fragment>
		{headingSizes.map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props}
					heading={{
						...props.heading,
						content: values.label,
						size: values.value,
					}}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const level = () => (
	<Fragment>
		{Array.from({ length: 6 }, (x, i) => i + 1).map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props}
					heading={{
						...props.heading,
						content: `H - ${values.toString()}`,
						level: values,
					}}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const align = () => (
	<Fragment>
		{['left', 'center', 'right'].map((values, index) => (
			<Fragment key={index}>
				<HeadingEditor
					{...props}
					heading={{
						...props.heading,
						content: values,
						align: values,
					}}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => {
	const { colors } = wp.data.select('core/block-editor').getSettings();

	return (
		<Fragment>
			{colors.map((values, index) => (
				<Fragment key={index}>
					<HeadingEditor
						{...props}
						heading={{
							...props.heading,
							title: values.name,
							color: values.slug,
						}}
					/>
					<br />
				</Fragment>
			))}
		</Fragment>
	);
};
