import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/editor';

export const VideoEditor = (props) => {
	const {
		media: {
			url,
			accept = 'video/*',
			allowedTypes = ['video'],
		},
		blockClass,
		onChangeMedia,
	} = props;

	return (
		<Fragment>
			{url ?
				<video className={classnames('video', `${blockClass}__video`)} muted>
					<source src={url} type="video/mp4" />
				</video> :
				<MediaPlaceholder
					icon="format-image"
					onSelect={onChangeMedia}
					accept={accept}
					allowedTypes={allowedTypes}
				/>
			}
		</Fragment>
	);
};
