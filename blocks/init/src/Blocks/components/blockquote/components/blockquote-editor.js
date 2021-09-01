import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique, checkAttr, selector, getAttrKey } from '@eightshift/frontend-libs/scripts';
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
		setAttributes,
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const blockquoteContent = checkAttr('blockquoteContent', attributes, manifest);
	const blockquoteCaption = checkAttr('blockquoteCaption', attributes, manifest);

	const blockquoteClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const blockquoteIconClass = selector(componentClass, componentClass, 'icon');
	const blockquoteContentClass = selector(componentClass, componentClass, 'content');
	const blockquoteSeparator = selector(componentClass, componentClass, 'separator');
	const blockquoteCaptionClass = selector(componentClass, componentClass, 'caption');

	return (
		<>
			<figure className={blockquoteClass} data-id={unique}>
				{outputCssVariables(attributes, manifest, unique, globalManifest)}

				<i
					className={blockquoteIconClass}
					dangerouslySetInnerHTML={{ __html: icon }}
				></i>

				<blockquote className={blockquoteContentClass}>
					<RichText
						identifier={getAttrKey('blockquoteContent', attributes, manifest)}
						placeholder={__('Add content', 'eightshift-frontend-libs')}
						value={blockquoteContent}
						onChange={(value) => {
							setAttributes({ [getAttrKey('blockquoteContent', attributes, manifest)]: value })
						}}
						allowedFormats={['core/bold', 'core/link', 'core/italic']}
						deleteEnter={true}
					/>
				</blockquote>

				<div className={blockquoteSeparator}></div>

				<figcaption className={blockquoteCaptionClass}>
					<RichText
						identifier={getAttrKey('blockquoteCaption', attributes, manifest)}
						placeholder={__('Add caption', 'eightshift-frontend-libs')}
						value={blockquoteCaption}
						onChange={(value) => {
							setAttributes({ [getAttrKey('blockquoteCaption', attributes, manifest)]: value })
						}}
						allowedFormats={['core/bold', 'core/link', 'core/italic']}
						deleteEnter={true}
					/>
				</figcaption>
			</figure>
		</>
	);
};
