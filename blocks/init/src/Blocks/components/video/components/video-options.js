import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const VideoOptions = (attributes) => {
	const {
		setAttributes,
		label = title,
		videoShowControls = true,

		videoUse = checkAttr('videoUse', attributes, manifest),

		videoUrl = checkAttr('videoUrl', attributes, manifest),
		videoType = checkAttr('videoType', attributes, manifest),
		videoAspectRatio = checkAttr('videoAspectRatio', attributes, manifest),
		videoUsePlaceholder = checkAttr('videoUsePlaceholder', attributes, manifest),
		videoAccept = checkAttr('videoAccept', attributes, manifest),
		videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest),

		showVideoUrl = true,
		showVideoAspectRatio = true,
		showVideoType = true,
	} = attributes;

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
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
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
									label={__('ID', 'eightshift-frontend-libs')}
									value={videoUrl}
									onChange={(value) => setAttributes({ videoUrl: value })}
									help={__('Use only video ID not the full link. Example video link: https://music.youtube.com/watch?v=PsO6ZnUZI0g, ID is PsO6ZnUZI0g', 'eightshift-frontend-libs')}
								/>
							}
						</Fragment>
					}

					{showVideoType &&
						<SelectControl
							label={__('Type', 'eightshift-frontend-libs')}
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
							label={__('Aspect Ratio', 'eightshift-frontend-libs')}
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
