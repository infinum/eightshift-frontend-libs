import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const HeadingEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		headingUse = defaults.headingUse.default,

		headingContent,
		headingColor = defaults.headingColor.default,
		headingSize = defaults.headingSize.default,
		headingAlign = defaults.headingAlign.default,
	} = attributes;

	const headingClass = classnames(
		componentClass,
		headingColor && `${componentClass}__color--${headingColor}`,
		headingSize && `${componentClass}__size--${headingSize}`,
		headingAlign && `${componentClass}__align--${headingAlign}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{headingUse &&
				<RichText
					className={headingClass}
					placeholder={placeholder}
					value={headingContent}
					onChange={(value) => setAttributes({ headingContent: value })}
					allowedFormats={[]}
				/>
			}
		</Fragment>
	);
};
