import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const SearchBarEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		searchBarUse = checkAttr('searchBarUse', attributes, manifest),

		searchBarMethod = checkAttr('searchBarMethod', attributes, manifest),
		searchBarPostType = checkAttr('searchBarPostType', attributes, manifest),
		searchBarAction = checkAttr('searchBarAction', attributes, manifest),
		searchBarPlaceholder = checkAttr('searchBarPlaceholder', attributes, manifest),
		searchBarId = checkAttr('searchBarId', attributes, manifest),
		searchBarLabel = checkAttr('searchBarLabel', attributes, manifest),
		searchBarLabelShow = checkAttr('searchBarLabelShow', attributes, manifest),
	} = attributes;

	const searchClass = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	);

	const inputClass = classnames([
		selector(componentClass, componentClass, 'input'),
	]);

	const labelClass = classnames([
		selector(componentClass, componentClass, 'label'),
		selector(! searchBarLabelShow, componentClass, 'label', 'hidden'),
	]);

	return (
		<>
			{searchBarUse &&
				<form
					role="search"
					method={searchBarMethod}
					className={searchClass}
					action={searchBarAction}
				>
					<label
						className={labelClass}
						htmlFor={searchBarId}
					>
							{searchBarLabel}
					</label>
					<input
						type="text"
						name="s"
						id={searchBarId}
						className={inputClass}
						placeholder={searchBarPlaceholder}
					/>
					<input
						type="hidden"
						name="post_type"
						value={searchBarPostType}
					/>
				</form>
			}
		</>
	);
};
