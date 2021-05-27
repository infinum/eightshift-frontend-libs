import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LoaderEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		loaderUse = checkAttr('loaderUse', attributes, manifest),

		loaderUseOverlay = checkAttr('loaderUseOverlay', attributes, manifest),
	} = attributes;

	const loaderClass = classnames(
		componentClass,
		selector(loaderUseOverlay, componentClass, '', 'use-overlay'),
		selector(blockClass, blockClass, selectorClass),
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
