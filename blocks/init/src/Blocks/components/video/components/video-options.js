import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';
import manifest from './../manifest.json';

const { attributes: defaults, options, title } = manifest;

export const VideoOptions = (props) => {
	const {
		setAttributes,
		label = title,
		videoShowControls = true,

		videoUse = defaults.videoUse.default,

		videoUrl,
		videoType = defaults.videoType.default,
		videoAspectRatio = defaults.videoAspectRatio.default,
		videoUsePlaceholder = defaults.videoUsePlaceholder.default,
		videoAccept = defaults.videoAccept.default,
		videoAllowedTypes = defaults.videoAllowedTypes.default,

		showVideoUrl = true,
		showVideoAspectRatio = true,
		showVideoType = true,
	} = props;

	if (!videoShowControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
				checked={videoUse}
				onChange={(value) => setAttributes({ videoUse: value })}
			/>

			{videoUse &&
				<Fragment>
					{showVideoUrl &&
						<Fragment>
							{(videoUsePlaceholder && videoUrl === '') ?
								<Fragment>
									<MediaPlaceholder
										icon="format-image"
										onSelect={(value) => {
											setAttributes({ videoUrl: value.url });
										}}
										accept={videoAccept}
										allowedTypes={videoAllowedTypes}
									/>
									<br />
								</Fragment> :
								<TextControl
									label={__('ID', 'eightshift-boilerplate')}
									value={videoUrl}
									onChange={(value) => setAttributes({ videoUrl: value })}
								/>
							}
						</Fragment>
					}

					{showVideoType &&
						<SelectControl
							label={__('Type', 'eightshift-boilerplate')}
							value={videoType}
							options={options.types}
							onChange={(value) => setAttributes({
								videoType: value,
								videoUrl: '',
							})}
						/>
					}

					{showVideoAspectRatio &&
						<SelectControl
							label={__('Aspect Ratio', 'eightshift-boilerplate')}
							value={videoAspectRatio}
							options={options.aspectRatioSizes}
							onChange={(value) => setAttributes({ videoAspectRatio: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
