import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const ListsEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		listsUse = defaults.listsUse.default,

		listsContent,
		listsOrdered = defaults.listsOrdered.default,
		listsColor = defaults.listsColor.default,
		listsSize = defaults.listsSize.default,
		listsAlign = defaults.listsAlign.default,

	} = attributes;

	const listsClass = classnames(
		componentClass,
		listsAlign && `${componentClass}__align--${listsAlign}`,
		listsColor && `${componentClass}__color--${listsColor}`,
		listsSize && `${componentClass}__size--${listsSize}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{listsUse &&
				<RichText
					tagName={listsOrdered}
					multiline="li"
					className={listsClass}
					placeholder={placeholder}
					value={listsContent}
					onChange={(value) => setAttributes({ listsContent: value })}
					onTagNameChange={(value) => setAttributes({ listsOrdered: value })}
					formattingControls={[]}
				/>
			}
		</Fragment>
	);
};
