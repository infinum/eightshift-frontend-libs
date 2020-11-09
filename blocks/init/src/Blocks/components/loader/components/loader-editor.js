import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const LoaderEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		loaderUse = defaults.loaderUse.default,
		loaderUseOverlay = defaults.loaderUseOverlay.default,
	} = attributes;

	const loaderClass = classnames(
		componentClass,
		loaderUseOverlay && `${componentClass}--use-overlay`,
		blockClass && `${blockClass}__${selectorClass}`,
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
