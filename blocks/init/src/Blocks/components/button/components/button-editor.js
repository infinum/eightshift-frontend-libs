import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';

export const ButtonEditor = (props) => {
	const {
		button: {
			title,
			url,
			styleColor,
			styleSize,
			styleSizeWidth,
		},
		blockClass,
		onChangeButtonTitle,
	} = props;

	const componentClass = 'btn';

	const buttonClass = classnames(
		componentClass,
		`${componentClass}__size--${styleSize}`,
		`${componentClass}__color--${styleColor}`,
		`${componentClass}__size-width--${styleSizeWidth}`,
		`${blockClass}__btn`,
		!(title && url) ? `${componentClass}__placeholder` : '',
	);

	return (
		<RichText
			placeholder={__('Add Button Title', 'eightshift-boilerplate')}
			value={title}
			onChange={onChangeButtonTitle}
			className={buttonClass}
			keepPlaceholderOnFocus
		/>
	);
};
