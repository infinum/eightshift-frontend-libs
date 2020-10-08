import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const VideoIframeEditor = (props) => {
	const {
		blockClass,
		video: {
			id,
			type = 'youtube',
			aspectRatio,
		},
	} = props;

	const componentClass = 'video-iframe';

	const videoClass = classnames(
		componentClass,
		`${componentClass}__video-ratio--${aspectRatio}`,
		`${blockClass}__${componentClass}`,
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
				allow="autoplay; fullscreen"
				allowFullScreen
			></iframe>
		</div>
	);
};
