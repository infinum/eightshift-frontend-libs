import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { outputCssVariables, getUnique, checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const BlockquoteEditor = (attributes) => {

	const blockquoteUse = checkAttr('blockquoteUse', attributes, manifest);

	if (!blockquoteUse) {
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

	const blockquoteClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const blockquoteIconClass = selector(componentClass, componentClass, 'icon');

	return (
		<>
			<blockquote className={blockquoteClass} data-id={unique}>
				{outputCssVariables(attributes, manifest, unique, globalManifest)}

				<i
					className={blockquoteIconClass}
					dangerouslySetInnerHTML={{ __html: icon }}
				></i>
			</blockquote>
		</>
	);
};
