import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { video } from '@wordpress/icons';
import { selectorModifier, selectorBlock, checkAttr, selectorCustom } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const VideoEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		videoUse = checkAttr('videoUse', attributes, manifest),

		videoUrl = checkAttr('videoUrl', attributes, manifest),
		videoType = checkAttr('videoType', attributes, manifest),
		videoAspectRatio = checkAttr('videoAspectRatio', attributes, manifest),
		videoAllow = checkAttr('videoAllow', attributes, manifest),
		videoAccept = checkAttr('videoAccept', attributes, manifest),
		videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest),
		videoUsePlaceholder = checkAttr('videoUsePlaceholder', attributes, manifest),
	} = attributes;

	const videoWrapClass = classnames([
		selectorBlock(componentClass, 'wrap'),
		selectorModifier(componentClass, 'ratio', videoAspectRatio),
		selectorCustom(videoType, componentClass, 'ratio', videoType),
		selectorBlock(blockClass, `${selectorClass}-wrap`),
	]);

	const videoClass = classnames([
		componentClass,
		selectorBlock(blockClass, selectorClass),
	]);

	let localUrl = '';

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
									onSelect={(value) => setAttributes({ videoUrl: value.url })}
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
