import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { ParagraphEditor } from '../components/paragraph-editor';
import { ParagraphOptions, paragraphSizes } from '../components/paragraph-options';
import { ParagraphToolbar } from '../components/paragraph-toolbar';

export default {
	title: 'Components|Paragraph',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-paragraph',
	paragraph: {
		content: 'This is Paragraph',
		align: 'left',
		color: 'primary',
		size: 'default',
	},
	onChangeParagraphContent: () => {},
	onChangeParagraphColor: () => {},
	onChangeParagraphSize: () => {},
	onChangeParagraphAlign: () => {},
	onChangeParagraphUse: () => {},
};

export const component = () => (
	<ParagraphEditor
		{...props}
	/>
);

export const options = () => (
	<ParagraphOptions {...props} />
);

export const toolbar = () => (
	<ParagraphToolbar {...props} />
);

export const size = () => (
	<Fragment>
		{paragraphSizes.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props}
					paragraph={{
						...props.paragraph,
						content: values.label,
						size: values.value,
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
				<ParagraphEditor
					{...props}
					paragraph={{
						...props.paragraph,
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
					<ParagraphEditor
						{...props}
						paragraph={{
							...props.paragraph,
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
