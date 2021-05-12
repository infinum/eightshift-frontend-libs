import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ShareEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		shareUse = checkAttr('shareUse', attributes, manifest, componentName),
	} = attributes;

	const shareClass = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	);

	const shareItemClass = classnames(
		selector(componentClass, componentClass, 'item'),
		selector(blockClass, blockClass, 'item'),
	);

	return (
		<>
			{shareUse &&
				<div className={shareClass}>
					{manifest.socialOptions.map((socialOption, key) => {
						return (
							<div key={key} className={shareItemClass}>{socialOption.label}</div>
						);
					})}
				</div>
			}
		</>
	);
};
