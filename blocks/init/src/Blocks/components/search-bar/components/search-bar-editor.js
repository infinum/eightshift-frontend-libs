import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const SearchBarEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		searchBarUse = defaults.searchBarUse.default,

		searchBarMethod = defaults.searchBarMethod.default,
		searchBarPostType = defaults.searchBarPostType.default,
		searchBarAction = defaults.searchBarAction.default,
		searchBarPlaceholder = defaults.searchBarPlaceholder.default,
	} = attributes;

	const searchClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{searchBarUse &&
				<form
					role="search"
					method={searchBarMethod}
					className={searchClass}
					action={searchBarAction}
				>
					<input
						type="text"
						name="s"
						className={`${componentClass}__input`}
						placeholder={searchBarPlaceholder}
					/>
					<input type="hidden" name="post_type" value={searchBarPostType} />
				</form>
			}
		</Fragment>
	);
};
