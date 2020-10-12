import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const HeadingEditor = (props) => {
	const {
		heading: {
			content,
			align,
			color,
			size,
			use = true,
		},
		componentClass = 'heading',
		blockClass,
		onChangeHeadingContent,
	} = props;

	const headingClass = classnames(
		componentClass,
		align && `${componentClass}__align--${align}`,
		color && `${componentClass}__color--${color}`,
		size && `${componentClass}__size--${size}`,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<RichText
					className={headingClass}
					placeholder={__('Add your text', 'eightshift-boilerplate')}
					onChange={onChangeHeadingContent}
					value={content}
				/>
			}
		</Fragment>
	);
};
