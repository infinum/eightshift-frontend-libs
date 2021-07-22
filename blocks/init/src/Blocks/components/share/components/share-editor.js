import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ShareEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const shareUse = checkAttr('shareUse', attributes, manifest);

	const shareClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
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
