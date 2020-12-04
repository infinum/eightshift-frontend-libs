import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selectorBlock, checkAttr, selectorCustom } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LoaderEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		loaderUse = checkAttr('loaderUse', attributes, manifest),

		loaderUseOverlay = checkAttr('loaderUseOverlay', attributes, manifest),
	} = attributes;

	const loaderClass = classnames(
		componentClass,
		selectorCustom(loaderUseOverlay, componentClass, '', 'use-overlay'),
		selectorBlock(blockClass, selectorClass),
	);

	return (
		<Fragment>
			{loaderUse &&
				<div className={loaderClass}>
					<div className={`${componentClass}__load`}>
						<div className={`${componentClass}__item ${componentClass}__item--1`}></div>
						<div className={`${componentClass}__item ${componentClass}__item--2`}></div>
						<div className={`${componentClass}__item ${componentClass}__item--3`}></div>
					</div>
				</div>
			}
		</Fragment>
	);
};
