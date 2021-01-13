import React from 'react';
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
		componentName = manifest.componentName,
		label = title,
		videoShowControls = true,

		videoUse = checkAttr('videoUse', attributes, manifest, componentName),

		videoUrl = checkAttr('videoUrl', attributes, manifest, componentName),
		videoType = checkAttr('videoType', attributes, manifest, componentName),
		videoAspectRatio = checkAttr('videoAspectRatio', attributes, manifest, componentName),
		videoUsePlaceholder = checkAttr('videoUsePlaceholder', attributes, manifest, componentName),
		videoAccept = checkAttr('videoAccept', attributes, manifest, componentName),
		videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest, componentName),

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
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
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
											setAttributes({ [`${componentName}Url`]: value.url });
										}}
										accept={videoAccept}
										allowedTypes={videoAllowedTypes}
									/>
									<br />
								</Fragment> :
								<TextControl
									label={__('ID', 'eightshift-frontend-libs')}
									value={videoUrl}
									onChange={(value) => setAttributes({ [`${componentName}Url`]: value })}
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
				</Fragment>
			}
		</Fragment>
	);
};
