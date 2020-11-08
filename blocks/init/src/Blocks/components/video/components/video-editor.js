import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { MediaPlaceholder } from '@wordpress/block-editor';
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
		videoAlign = defaults.videoAlign.default,
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

	const videoWrapClass = classnames(
		`${componentClass}__wrap`,
		videoAlign && `${componentClass}__align--${videoAlign}`,
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
				<Fragment>
					<div className={videoWrapClass}>
						<div className={videoClass}>
							{videoType !== 'local' &&
								<iframe
									className={`${componentClass}__video`}
									src={localUrl}
									title={videoUrl}
									frameBorder="0"
									allow={videoAllow}
									allowFullScreen
								></iframe>
							}

							{videoType === 'local' &&
							<Fragment>
								{videoUrl ?
									<video className={`${componentClass}__video`} muted>
										<source src={videoUrl} type="video/mp4" />
									</video> :
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
					</div>
				</Fragment>
			}
		</Fragment>
	);

};
