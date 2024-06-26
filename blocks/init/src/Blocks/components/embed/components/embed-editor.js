import React from 'react';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { checkAttr, classnames, bem, icons } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const EmbedEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const embedUse = checkAttr('embedUse', attributes, manifest);
	let embedUrl = checkAttr('embedUrl', attributes, manifest);

	const embedClass = classnames(
		componentClass,
		bem(blockClass, selectorClass),
		additionalClass,
	);

	const embedIframeClass = classnames(
		bem(componentClass, 'iframe'),
		bem(blockClass, `${selectorClass}-iframe`),
	);

	if (!embedUse) {
		return null;
	}

	return (
		<>
			{embedUrl ? (
				<div className={embedClass}>
					<iframe
						title={__('video', '%g_textdomain%')}
						className={embedIframeClass}
						src={embedUrl}
					/>
				</div>
			) : (
				<Placeholder
					icon={icons.video}
					label={__('Please add embed using sidebar options!', '%g_textdomain%')}
				/>
			)}
		</>
	);
};
