import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { video } from '@wordpress/icons';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const VideoEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		videoUse = checkAttr('videoUse', attributes, manifest, componentName),

		videoUrl = checkAttr('videoUrl', attributes, manifest, componentName),
		videoType = checkAttr('videoType', attributes, manifest, componentName),
		videoAspectRatio = checkAttr('videoAspectRatio', attributes, manifest, componentName),
		videoAllow = checkAttr('videoAllow', attributes, manifest, componentName),
		videoAccept = checkAttr('videoAccept', attributes, manifest, componentName),
		videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest, componentName),
		videoUsePlaceholder = checkAttr('videoUsePlaceholder', attributes, manifest, componentName),
	} = attributes;

	const videoWrapClass = classnames([
		selector(componentClass, componentClass, 'wrap'),
		selector(videoAspectRatio, componentClass, 'ratio', videoAspectRatio),
		selector(videoType, componentClass, 'ratio', videoType),
		selector(blockClass, blockClass, `${selectorClass}-wrap`),
	]);

	const videoClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	let localUrl;

	switch (videoType) {
		case 'vimeo':
			localUrl = `https://player.vimeo.com/video/${videoUrl}`;
			break;
		case 'youtube':
			localUrl = `https://www.youtube-nocookie.com/embed/${videoUrl}`;
			break;
		default:
			localUrl = videoUrl;
			break;
	}

	return (
		<Fragment>
			{videoUse &&
				<div className={videoWrapClass}>

					{(videoUrl !== '') &&
						<Fragment>
							{(videoType === 'local') ?
								<video className={videoClass} muted>
									<source src={localUrl} type="video/mp4" />
								</video> :
								<iframe
									className={videoClass}
									src={localUrl}
									title={localUrl}
									frameBorder="0"
									allow={videoAllow}
									allowFullScreen
								></iframe>
							}
						</Fragment>
					}

					{(videoUrl === '') &&
						<Fragment>
							{(videoUsePlaceholder || videoType !== 'local') &&
								<Placeholder icon={video} label={__('Please add video using sidebar options!', 'eightshift-frontend-libs')} />
							}

							{(!videoUsePlaceholder && videoType === 'local') &&
								<MediaPlaceholder
									icon="format-image"
									onSelect={(value) => setAttributes({ [`${componentName}Url`]: value.url })}
									accept={videoAccept}
									allowedTypes={videoAllowedTypes}
								/>
							}
						</Fragment>
					}
				</div>
			}
		</Fragment>
	);

};
