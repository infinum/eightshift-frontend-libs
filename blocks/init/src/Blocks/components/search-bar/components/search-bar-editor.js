import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

export const SearchBarEditor = (props) => {
	const {
		componentClass = 'search-bar',
		blockClass,
		method = 'get',
		postType = 'any',
		action = '#',
		placeholder = __('Type in search', 'eightshift-boilerplate'),
	} = props;

	const searchClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<form
			role="search"
			method={method}
			className={searchClass}
			action={action}
		>
			<input
				type="text"
				name="s"
				className={`${componentClass}__input`}
				placeholder={placeholder}
			/>
			<input type="hidden" name="post_type" value={postType} />
		</form>
	);
};
