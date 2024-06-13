import React from 'react';
import classnames from 'classnames';
import { video } from '@wordpress/icons';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
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

	const embedClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const embedIframeClass = classnames([
		selector(componentClass, componentClass, 'iframe'),
		selector(blockClass, blockClass, `${selectorClass}-iframe`),
	]);

	if (embedUrl.includes('https://www.youtube.com/watch?v=')) {
		embedUrl = embedUrl.replace('watch?v=', 'embed/');
	}

	if (embedUrl.includes('https://vimeo.com')) {
		const matches = [...embedUrl.matchAll(/https:\/\/vimeo\.com\/(\d+)/g)];

		const videoId = matches[0][1] ?? '';
		embedUrl = `https://player.vimeo.com/video/${videoId}`;
	}

	return (
		<>
			{embedUse &&
				<>
					{(embedUrl === '') ?
						<Placeholder icon={video} label={__('Please add embed using sidebar options!', 'safer-internet')} /> :
						<div className={embedClass}>
							<iframe
								title={'video'}
								className={embedIframeClass}
								src={embedUrl}
							/>
						</div>
					}
				</>
			}
		</>
	);
};
