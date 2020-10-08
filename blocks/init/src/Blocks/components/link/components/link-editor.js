import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const LinkEditor = (props) => {
	const {
		link: {
			content,
			url,
			styleColor,
		},
		componentClass = 'link',
		blockClass,
		onChangeLinkContent,
	} = props;

	const linkClass = classnames(
		componentClass,
		styleColor && `${componentClass}__color--${styleColor}`,
		blockClass && `${blockClass}__${componentClass}`,
		!(content && url) && `${componentClass}__placeholder`,
	);

	return (
		<RichText
			placeholder={__('Add Content', 'eightshift-boilerplate')}
			value={content}
			onChange={onChangeLinkContent}
			className={linkClass}
			keepPlaceholderOnFocus
		/>
	);
};
