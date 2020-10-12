import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';

export const aspectRatioSizes = [
	{
		label: __('16:9', 'eightshift-boilerplate'),
		value: 'default',
	},
	{
		label: __('21:9', 'eightshift-boilerplate'),
		value: 'twentyone-nine',
	},
];

export const types = [
	{
		label: __('Youtube', 'eightshift-boilerplate'),
		value: 'youtube',
	},
	{
		label: __('Vimeo', 'eightshift-boilerplate'),
		value: 'vimeo',
	},
	{
		label: __('Local', 'eightshift-boilerplate'),
		value: 'local',
	},
];

export const VideoOptions = (props) => {
	const {
		video: {
			id,
			type = 'youtube',
			aspectRatio = 'default',
			use = true,
		},
		showControls = true,
		label,
		onChangeVideoId,
		onChangeVideoAspectRatio,
		onChangeVideoType,
		onChangeVideoUse,
	} = props;

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{onChangeVideoUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
					checked={use}
					onChange={onChangeVideoUse}
				/>
			}

			{use &&
				<Fragment>
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
			}
		</Fragment>
	);
};
