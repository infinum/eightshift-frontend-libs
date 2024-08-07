import React from 'react';
import { __ } from '@wordpress/i18n';
import { Notification, props } from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
import { ParagraphEditor } from '../../../components/paragraph/components/paragraph-editor';

export const TableOfContentsEditor = ({ attributes, setAttributes }) => {
	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<ParagraphEditor
				{...props('paragraph', attributes, { setAttributes })}
			/>

			<Notification
				iconOverride={icons.emptyRect}
				text={__('Entries will show here', '%g_textdomain%')}
				additionalClasses='es-border-cool-gray-300!'
				noBottomSpacing
			/>
		</div>
	);
};
