import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/editor';

export const ImageEditor = (props) => {
	const {
		media: {
			url,
			accept = 'image/*',
			allowedTypes = ['image'],
		},
		blockClass,
		onChangeMedia,
	} = props;

	return (
		<Fragment>
			{url ?
				<img className={classnames('image', `${blockClass}__img`)} src={url} alt="" /> :
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

