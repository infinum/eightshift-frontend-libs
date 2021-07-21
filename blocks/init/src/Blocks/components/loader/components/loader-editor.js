import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LoaderEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const loaderUse = checkAttr('loaderUse', attributes, manifest);
	const loaderUseOverlay = checkAttr('loaderUseOverlay', attributes, manifest);

	const loaderClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
		selector(loaderUseOverlay, componentClass, '', 'use-overlay'),
	);

	return (
		<>
			{loaderUse &&
				<div className={loaderClass}>
					<div className={`${componentClass}__load`}>
						<div className={`${componentClass}__item ${componentClass}__item--1`}></div>
						<div className={`${componentClass}__item ${componentClass}__item--2`}></div>
						<div className={`${componentClass}__item ${componentClass}__item--3`}></div>
					</div>
				</div>
			}
		</>
	);
};
