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

		iconUse = checkAttr('iconUse', attributes, manifest),
		iconName = checkAttr('iconName', attributes, manifest),
	} = attributes;

	const iconClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{iconUse &&
				<i className={iconClass} dangerouslySetInnerHTML={{ __html: manifestIcons[iconName] }}></i>
			}
		</>
	);
};
