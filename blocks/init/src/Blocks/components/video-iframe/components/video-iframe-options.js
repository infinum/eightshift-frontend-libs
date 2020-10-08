import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';

export const aspectRatioSizes = [
	{ label: __('16:9', 'eightshift-boilerplate'), value: 'default' },
	{ label: __('21:9', 'eightshift-boilerplate'), value: 'twentyone-nine' },
];

export const types = [
	{ label: __('Youtube', 'eightshift-boilerplate'), value: 'youtube' },
	{ label: __('Vimeo', 'eightshift-boilerplate'), value: 'vimeo' },
];

export const VideoIframeOptions = (props) => {
	const {
		video: {
			id,
			type,
			aspectRatio,
		},
		label,
		onChangeVideoId,
		onChangeVideoAspectRatio,
		onChangeVideoType,
	} = props;

	return (
		<Fragment>

			{label &&
				<h3>
					{label}
				</h3>
			}

			{onChangeVideoId &&
				<TextControl
					label={__('ID', 'eightshift-boilerplate')}
					value={id}
					onChange={onChangeVideoId}
				/>
			}

			{onChangeVideoType &&
				<SelectControl
					label={__('Type', 'eightshift-boilerplate')}
					value={type}
					options={types}
					onChange={onChangeVideoType}
				/>
			}

			{onChangeVideoAspectRatio &&
				<SelectControl
					label={__('Aspect Ratio', 'eightshift-boilerplate')}
					value={aspectRatio}
					options={aspectRatioSizes}
					onChange={onChangeVideoAspectRatio}
				/>
			}
		</Fragment>
	);
};
