import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const HeadingEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),
	} = attributes;

	const headingUse = checkAttr('headingUse', attributes, manifest);
	const headingContent = checkAttr('headingContent', attributes, manifest);

	const headingClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{headingUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}
					<RichText
						className={headingClass}
						placeholder={placeholder}
						value={headingContent}
						onChange={(value) => setAttributes({ [getAttrKey('headingContent', attributes, manifest)]: value })}
						allowedFormats={[]}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
