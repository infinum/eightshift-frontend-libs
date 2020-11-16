import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selectorB, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const SearchBarEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		searchBarUse = checkAttr('searchBarUse', attributes, manifest),

		searchBarMethod = checkAttr('searchBarMethod', attributes, manifest),
		searchBarPostType = checkAttr('searchBarPostType', attributes, manifest),
		searchBarAction = checkAttr('searchBarAction', attributes, manifest),
		searchBarPlaceholder = checkAttr('searchBarPlaceholder', attributes, manifest),
	} = attributes;

	const searchClass = classnames(
		componentClass,
		selectorB(blockClass, selectorClass),
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
