import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';

export const CardToolbar = (attributes) => {
	const {
		setAttributes,
		options,
	} = attributes;

	return (
		<>

			<HeadingToolbar
				{...props(attributes, 'heading', 'intro')}
				setAttributes={setAttributes}
				options={options}
			/>

			<HeadingToolbar
				{...props(attributes, 'heading')}
				setAttributes={setAttributes}
				options={options}
			/>

			<ButtonToolbar
				{...props(attributes, 'button')}
				setAttributes={setAttributes}
				options={options}
			/>
		</>
	);
};
