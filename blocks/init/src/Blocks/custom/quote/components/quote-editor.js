import React from 'react'; // eslint-disable-line no-unused-vars
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const QuoteEditor = ({ attributes, actions }) => {
	const {
		blockClass,
		author,
		content,
	} = attributes;

	const {
		onChangeAuthor,
		onChangeContent,
	} = actions;

	return (
		<div className={blockClass}>
			<div className={`${blockClass}__content`}>
				<RichText
					placeholder={__('Add quote text', 'eightshift-boilerplate')}
					onChange={onChangeContent}
					value={content}
				/>
			</div>
			<div className={`${blockClass}__clear`}></div>
			<div className={`${blockClass}__author`}>
				<RichText
					placeholder={__('Add author', 'eightshift-boilerplate')}
					onChange={onChangeAuthor}
					value={author}
				/>
			</div>
		</div>
	);
};
