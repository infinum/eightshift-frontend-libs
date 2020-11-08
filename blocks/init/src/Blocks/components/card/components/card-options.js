import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { HeadingOptions } from '../../../components/heading/components/heading-options';
import { ParagraphOptions } from '../../../components/paragraph/components/paragraph-options';
import { ButtonOptions } from '../../../components/button/components/button-options';

export const CardOptions = (attributes) => {
	const {
		setAttributes,
	} = attributes;

	return (
		<Fragment>
			<HeadingOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

			<hr />

			<ParagraphOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

			<hr />

			<ButtonOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

		</Fragment>
	);
};
