import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const VideoIframeEditor = (props) => {
	const {
		blockClass,
		video: {
			id,
			type = 'youtube',
			aspectRatio,
			allow = 'autoplay; fullscreen',
		},
		componentClass = 'video-iframe',
	} = props;

	const videoClass = classnames(
		componentClass,
		aspectRatio && `${componentClass}__video-ratio--${aspectRatio}`,
		blockClass && `${blockClass}__${componentClass}`,
	);

	let url = '';

	switch (type) {
		case 'vimeo':
			url = `https://player.vimeo.com/video/${id}`;
			break;
		default:
			url = `https://www.youtube-nocookie.com/embed/${id}`;
			break;
	}

	return (
		<div className={videoClass}>
			<iframe
				className={`${componentClass}__iframe`}
				src={url}
				title={id}
				frameBorder="0"
				allow={allow}
				allowFullScreen
			></iframe>
		</div>
	);
};
