import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { ListsEditor } from './../../../components/lists/components/lists-editor';

export const ListsInfoEditor = ({ attributes, actions }) => {
	const {
		blockClass,
		title,
	} = attributes;

	const {
		onChangeTitle,
	} = actions;

	return (
		<div className={blockClass}>
			<div className={`${blockClass}__intro`}>
				<div className={`${blockClass}__title`}>
					<RichText
						placeholder={__('Add title', 'eightshift-boilerplate')}
						onChange={onChangeTitle}
						value={title}
					/>
				</div>
			</div>
			<div className={`${blockClass}__content`}>
				<ListsEditor
					{...attributes}
					{...actions}
				/>
			</div>
		</div>
	);
};
