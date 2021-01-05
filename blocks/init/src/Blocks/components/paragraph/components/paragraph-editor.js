import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ParagraphEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		paragraphUse = checkAttr('paragraphUse', attributes, manifest, componentName),

		paragraphContent = checkAttr('paragraphContent', attributes, manifest, componentName),
		paragraphColor = checkAttr('paragraphColor', attributes, manifest, componentName),
		paragraphSize = checkAttr('paragraphSize', attributes, manifest, componentName),
		paragraphAlign = checkAttr('paragraphAlign', attributes, manifest, componentName),
	} = attributes;

	const paragraphClass = classnames([
		componentClass,
		selector(paragraphColor, componentClass, 'color', paragraphColor),
		selector(paragraphSize, componentClass, 'size', paragraphSize),
		selector(paragraphAlign, componentClass, 'align', paragraphAlign),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{paragraphUse &&
				<RichText
					className={paragraphClass}
					placeholder={placeholder}
					value={paragraphContent}
					onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
					formattingControls={['bold', 'link']}
				/>
			}
		</Fragment>
	);
};
