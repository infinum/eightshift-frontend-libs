import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const ParagraphEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		paragraphUse = defaults.paragraphUse.default,

		paragraphContent,
		paragraphColor = defaults.paragraphColor.default,
		paragraphSize = defaults.paragraphSize.default,
		paragraphAlign = defaults.paragraphAlign.default,
	} = attributes;

	const paragraphClass = classnames(
		componentClass,
		paragraphAlign && `${componentClass}__align--${paragraphAlign}`,
		paragraphColor && `${componentClass}__color--${paragraphColor}`,
		paragraphSize && `${componentClass}__size--${paragraphSize}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{paragraphUse &&
				<RichText
					className={paragraphClass}
					placeholder={placeholder}
					value={paragraphContent}
					onChange={(value) => setAttributes({ paragraphContent: value })}
				/>
			}
		</Fragment>
	);
};
