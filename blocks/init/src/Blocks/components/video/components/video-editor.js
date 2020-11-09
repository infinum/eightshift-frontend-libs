import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { video } from '@wordpress/icons';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const VideoEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		videoUse = defaults.videoUse.default,

		videoUrl,
		videoType = defaults.videoType.default,
		videoAspectRatio = defaults.videoAspectRatio.default,
		videoAllow = defaults.videoAllow.default,
		videoAccept = defaults.videoAccept.default,
		videoAllowedTypes = defaults.videoAllowedTypes.default,
		videoUsePlaceholder = defaults.videoUsePlaceholder.default,
	} = attributes;

	const videoClass = classnames(
		componentClass,
		videoAspectRatio && `${componentClass}__video-ratio--${videoAspectRatio}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	let localUrl = '';

	switch (videoType) {
		case 'vimeo':
			localUrl = `https://player.vimeo.com/video/${videoUrl}`;
			break;
		default:
			localUrl = `https://www.youtube-nocookie.com/embed/${videoUrl}`;
			break;
	}

	return (
		<Fragment>
			{videoUse &&
				<div className={videoClass}>

					{(videoUrl !== '') &&
						<Fragment>
							{(videoType === 'local') ?
								<video className={`${componentClass}__video`} muted>
									<source src={videoUrl} type="video/mp4" />
								</video> :
								<iframe
									className={`${componentClass}__video`}
									src={localUrl}
									title={videoUrl}
									frameBorder="0"
									allow={videoAllow}
									allowFullScreen
								></iframe>
							}
						</Fragment>
					}

					{(videoUrl === '') &&
						<Fragment>
							{(videoUsePlaceholder) &&
								<Placeholder icon={video} label={__('Please add image using sidebar options!', 'solplanet')} />
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
