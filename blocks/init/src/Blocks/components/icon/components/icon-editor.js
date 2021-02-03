import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { icons } = manifest;

export const IconEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		iconUse = checkAttr('iconUse', attributes, manifest, componentName),
		iconName = checkAttr('iconName', attributes, manifest, componentName),
	} = attributes;

	const iconClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{iconUse &&
				<i className={iconClass} dangerouslySetInnerHTML={{ __html: icons[iconName] }}></i>
			}
		</Fragment>
	);
};
