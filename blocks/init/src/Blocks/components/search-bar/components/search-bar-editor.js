import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const SearchBarEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const searchBarUse = checkAttr('searchBarUse', attributes, manifest);
	const searchBarMethod = checkAttr('searchBarMethod', attributes, manifest);
	const searchBarPostType = checkAttr('searchBarPostType', attributes, manifest);
	const searchBarAction = checkAttr('searchBarAction', attributes, manifest);
	const searchBarPlaceholder = checkAttr('searchBarPlaceholder', attributes, manifest);
	const searchBarId = checkAttr('searchBarId', attributes, manifest);
	const searchBarLabel = checkAttr('searchBarLabel', attributes, manifest);
	const searchBarLabelShow = checkAttr('searchBarLabelShow', attributes, manifest);

	const searchClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
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
