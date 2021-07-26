import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
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

	if (!loaderUse) {
		return null;
	}

	return (
		<div className={loaderClass}>
			<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" >
				<g fill="none" fillRule="evenodd" strokeWidth="2">
					<circle cx="22" cy="22" r="1" stroke="var(--loader-color-1, currentColor)">
						<animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
						<animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
					</circle>
					<circle cx="22" cy="22" r="1" stroke="var(--loader-color-2, currentColor)">
						<animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
						<animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
					</circle>
				</g>
			</svg>
		</div>
	);
};
