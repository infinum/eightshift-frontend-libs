import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const HeadingEditor = (props) => {
	const {
		heading: {
			content,
			styleAlign,
			styleColor,
			styleSize,
		},
		blockClass,
		onChangeContent,
	} = props;

	const componentClass = 'heading';

	const headingClass = classnames(
		componentClass,
		`${componentClass}__align--${styleAlign}`,
		`${componentClass}__color--${styleColor}`,
		`${componentClass}__size--${styleSize}`,
		`${blockClass}__heading`,
	);

	return (
		<RichText
			className={headingClass}
			placeholder={__('Add your heading', 'eightshift-boilerplate')}
			onChange={onChangeContent}
			value={content}
		/>
	);
};
