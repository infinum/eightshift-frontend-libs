import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { MediaPlaceholder } from '@wordpress/editor';

export const VideoEditor = (props) => {
	const {
		blockClass,
		video: {
			id,
			url,
			type = 'youtube',
			aspectRatio = 'default',
			allow = 'autoplay; fullscreen',
			accept = 'video/*',
			allowedTypes = ['video'],
			use = true,
		},
		componentClass = 'video',
		onChangeVideo,
	} = props;

	const videoClass = classnames(
		componentClass,
		aspectRatio && `${componentClass}__video-ratio--${aspectRatio}`,
		blockClass && `${blockClass}__${componentClass}`,
		(!url && type === 'local') ? `${componentClass}--placeholder` : '',
	);

	let localUrl = '';

	switch (type) {
		case 'vimeo':
			localUrl = `https://player.vimeo.com/video/${id}`;
			break;
		default:
			localUrl = `https://www.youtube-nocookie.com/embed/${id}`;
			break;
	}

	return (
		<Fragment>
			{use &&
				<div className={videoClass}>
					{type !== 'local' &&
						<iframe
							className={`${componentClass}__video`}
							src={localUrl}
							title={id}
							frameBorder="0"
							allow={allow}
							allowFullScreen
						></iframe>
					}

					{type === 'local' &&
					<Fragment>
						{url ?
							<video className={`${componentClass}__video`} muted>
								<source src={url} type="video/mp4" />
							</video> :
							<MediaPlaceholder
								icon="format-image"
								onSelect={onChangeVideo}
								accept={accept}
								allowedTypes={allowedTypes}
							/>
						}
					</Fragment>
					}
				</div>
			}
		</Fragment>
	);

};
