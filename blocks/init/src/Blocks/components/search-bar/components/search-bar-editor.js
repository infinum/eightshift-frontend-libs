import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
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
		use = true,
	} = props;

	const searchClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
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
			}
		</Fragment>
	);
};
