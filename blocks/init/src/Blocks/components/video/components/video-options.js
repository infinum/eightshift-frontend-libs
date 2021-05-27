import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		componentName: manifestComponentName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
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

	const options = {...manifestOptions, ...attributes.options};

	if (!videoShowControls) {
		return null;
	}

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={videoUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{videoUse &&
				<>
					{showVideoUrl &&
						<>
							{(videoUsePlaceholder && videoUrl === '') ?
								<>
									<MediaPlaceholder
										icon="format-image"
										onSelect={(value) => {
											setAttributes({ [`${componentName}Url`]: value.url });
										}}
										accept={videoAccept}
										allowedTypes={videoAllowedTypes}
									/>
									<br />
								</> :
								<TextControl
									label={__('ID', 'eightshift-frontend-libs')}
									value={videoUrl}
									onChange={(value) => setAttributes({ [`${componentName}Url`]: value })}
									help={__('Use only video ID not the full link. Example video link: https://music.youtube.com/watch?v=PsO6ZnUZI0g, ID is PsO6ZnUZI0g', 'eightshift-frontend-libs')}
								/>
							}
						</>
					}

					{showVideoType &&
						<SelectControl
							label={__('Type', 'eightshift-frontend-libs')}
							value={videoType}
							options={options.types}
							onChange={(value) => setAttributes({ [`${componentName}Type`]: value })}
							help={__('If you want to use local video, you must remove the URL', 'eightshift-frontend-libs')}
						/>
					}

					{showVideoAspectRatio &&
						<SelectControl
							label={__('Aspect Ratio', 'eightshift-frontend-libs')}
							value={videoAspectRatio}
							options={options.aspectRatioSizes}
							onChange={(value) => setAttributes({ [`${componentName}AspectRatio`]: value })}
						/>
					}
				</>
			}
		</>
	);
};
