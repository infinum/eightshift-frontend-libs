import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ListsEditor = (props) => {
	const {
		lists: {
			content,
			ordered,
			use = true,
		},
		blockClass,
		componentClass = 'lists',
		onChangeListsContent,
		onChangeListsOrdered,
	} = props;

	const listsClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<RichText
					tagName={ordered}
					multiline="li"
					className={listsClass}
					placeholder={__('Add your item', 'eightshift-boilerplate')}
					onChange={onChangeListsContent}
					value={content}
					onTagNameChange={onChangeListsOrdered}
					formattingControls={[]}
				/>
			}
		</Fragment>
	);
};
