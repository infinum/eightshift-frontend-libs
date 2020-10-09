import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { LinkEditor } from '../components/link-editor';
import { LinkOptions, linkColors } from '../components/link-options';

export default {
	title: 'Components|Link',
	parameters: {
		notes: readme,
	},
};

const props = {
	blockClass: 'block-link',
	link: {
		content: 'This is a link',
		url: 'https://fakeurl.com',
		color: 'primary',
		isAnchor: false,
		id: 'ID',
	},
	onChangeLinkTitle: () => {},
	onChangeLinkUrl: () => {},
	onChangeLinkColor: () => {},
	onChangeLinkIsAnchor: () => {},
	onChangeLinkId: () => {},
};

export const editor = () => (
	<LinkEditor {...props} />
);

export const options = () => (
	<LinkOptions {...props} />
);

export const color = () => (
	<Fragment>
		{linkColors().map((values, index) => (
			<Fragment key={index}>
				<LinkEditor
					{...props}
					link={{
						...props.link,
						title: values.name,
						color: values.slug,
					}}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const isAnchor = () => (
	<LinkEditor
		link={{
			...props.link,
			isAnchor: true,
		}}
	/>
);
