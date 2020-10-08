import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';

export const ImageOptions = (props) => {
	const {
		media: {
			url,
			accept = 'image/*',
			allowedTypes = ['image'],
		},
		onChangeMedia,
	} = props;

	return (
		<Fragment>

			{onChangeMedia && !url &&
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
