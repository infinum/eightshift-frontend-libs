import React from 'react';
import classnames from 'classnames';
import { checkAttr, props, selector } from '@eightshift/frontend-libs/scripts';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { IconEditor } from '../../icon/components/icon-editor';
import manifest from './../manifest.json';

export const QuoteEditor = (attributes) => {

	const quoteUse = checkAttr('quoteUse', attributes, manifest);

	if (!quoteUse) {
		return null;
	}

	const {
		componentClass,
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

	const quoteContentClass = selector(componentClass, componentClass, 'content');
	const quoteSeparator = selector(componentClass, componentClass, 'separator');
	const quoteCaptionClass = selector(componentClass, componentClass, 'caption');

	const quoteAuthorUse = checkAttr('quoteAuthorUse', attributes, manifest);

	return (
		<>
			<figure className={quoteClass}>
			<IconEditor
						{...props('icon', attributes, {
							blockClass: componentClass,
						})}
					/>

				<blockquote className={quoteContentClass}>
					<ParagraphEditor
						{...props('paragraph', attributes, {
							blockClass: componentClass,
						})}
					/>
				</blockquote>

				{quoteAuthorUse && <div className={quoteSeparator}></div>}

				<figcaption className={quoteCaptionClass}>
					<ParagraphEditor
						{...props('author', attributes, {
							blockClass: componentClass,
						})}
					/>
				</figcaption>
			</figure>
		</>
	);
};
