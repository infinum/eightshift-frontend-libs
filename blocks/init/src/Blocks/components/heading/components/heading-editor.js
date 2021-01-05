import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const HeadingEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		headingUse = checkAttr('headingUse', attributes, manifest, componentName),

		headingContent = checkAttr('headingContent', attributes, manifest, componentName),
		headingColor = checkAttr('headingColor', attributes, manifest, componentName),
		headingSize = checkAttr('headingSize', attributes, manifest, componentName),
		headingAlign = checkAttr('headingAlign', attributes, manifest, componentName),
	} = attributes;

	const headingClass = classnames([
		componentClass,
		selector(headingColor, componentClass, 'color', headingColor),
		selector(headingSize, componentClass, 'size', headingSize),
		selector(headingAlign, componentClass, 'align', headingAlign),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{headingUse &&
				<RichText
					className={headingClass}
					placeholder={placeholder}
					value={headingContent}
					onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
					formattingControls={[]}
				/>
			}
		</Fragment>
	);
};
