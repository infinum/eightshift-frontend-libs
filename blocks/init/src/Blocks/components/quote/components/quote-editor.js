import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique, checkAttr, selector, getAttrKey } from '@eightshift/frontend-libs/scripts';
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
		setAttributes,
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const quoteContent = checkAttr('quoteContent', attributes, manifest);
	const quoteCaption = checkAttr('quoteCaption', attributes, manifest);

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

				<quote className={quoteContentClass}>
					<RichText
						identifier={getAttrKey('quoteContent', attributes, manifest)}
						placeholder={__('Add content', 'eightshift-frontend-libs')}
						value={quoteContent}
						onChange={(value) => {
							setAttributes({ [getAttrKey('quoteContent', attributes, manifest)]: value })
						}}
						allowedFormats={['core/bold', 'core/link', 'core/italic']}
						deleteEnter={true}
					/>
				</quote>

				<div className={quoteSeparator}></div>

				<figcaption className={quoteCaptionClass}>
					<RichText
						identifier={getAttrKey('quoteCaption', attributes, manifest)}
						placeholder={__('Add caption', 'eightshift-frontend-libs')}
						value={quoteCaption}
						onChange={(value) => {
							setAttributes({ [getAttrKey('quoteCaption', attributes, manifest)]: value })
						}}
						allowedFormats={['core/bold', 'core/link', 'core/italic']}
						deleteEnter={true}
					/>
				</figcaption>
			</figure>
		</>
	);
};
