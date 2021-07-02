import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const IconEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
		icons: manifestIcons,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const iconUse = checkAttr('iconUse', attributes, manifest);
	const iconSelectedIcon = checkAttr('iconSelectedIcon', attributes, manifest);

	const iconClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{iconUse &&
				<i className={iconClass} dangerouslySetInnerHTML={{ __html: manifestIcons[iconSelectedIcon] }}></i>
			}
		</>
	);
};
