import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { outputCssVariables, getUnique, checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const QuoteEditor = (attributes) => {

	const quoteUse = checkAttr('quoteUse', attributes, manifest);

	if (!quoteUse) {
		return null;
	}

	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
		resources: {
			icon
		},
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const quoteClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const quoteIconClass = selector(componentClass, componentClass, 'icon');
	const quoteContentClass = selector(componentClass, componentClass, 'content');
	const quoteSeparator = selector(componentClass, componentClass, 'separator');
	const quoteCaptionClass = selector(componentClass, componentClass, 'caption');

	return (
		<>
			<figure className={quoteClass} data-id={unique}>
				{outputCssVariables(attributes, manifest, unique, globalManifest)}

				<i
					className={quoteIconClass}
					dangerouslySetInnerHTML={{ __html: icon }}
				></i>

				<blockquote className={quoteContentClass}>
				</blockquote>

				<div className={quoteSeparator}></div>

				<figcaption className={quoteCaptionClass}>
				</figcaption>
			</figure>
		</>
	);
};
