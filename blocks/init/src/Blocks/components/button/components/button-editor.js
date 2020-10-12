import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';

export const ButtonEditor = (props) => {
	const {
		button: {
			content,
			url,
			color,
			size,
			width,
			use = true,
		},
		componentClass = 'button',
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),
		onChangeButtonContent,
	} = props;

	const buttonClass = classnames(
		componentClass,
		size && `${componentClass}__size--${size}`,
		color && `${componentClass}__color--${color}`,
		width && `${componentClass}__size-width--${width}`,
		blockClass && `${blockClass}__${componentClass}`,
		!(content && url) && `${componentClass}__placeholder`,
	);

	return (
		<Fragment>
			{use &&
				<RichText
					placeholder={placeholder}
					value={content}
					onChange={onChangeButtonContent}
					className={buttonClass}
					keepPlaceholderOnFocus
				/>
			}
		</Fragment>
	);
};
