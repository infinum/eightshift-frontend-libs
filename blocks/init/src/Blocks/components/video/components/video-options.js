import React from 'react';
import _ from 'lodash';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { ToggleControl, Button, SelectControl, BaseControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		title: manifestTitle,
		options: manifestOptions,
		componentName: manifestComponentName,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		videoShowControls = true,

		videoUse = checkAttr('videoUse', attributes, manifest, componentName),

		videoUrl = checkAttr('videoUrl', attributes, manifest, componentName),
		videoPoster = checkAttr('videoPoster', attributes, manifest, componentName),
		videoAccept = checkAttr('videoAccept', attributes, manifest, componentName),
		videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest, componentName),
		videoLoop = checkAttr('videoLoop', attributes, manifest, componentName),
		videoAutoplay = checkAttr('videoAutoplay', attributes, manifest, componentName),
		videoControls = checkAttr('videoControls', attributes, manifest, componentName),
		videoMuted = checkAttr('videoMuted', attributes, manifest, componentName),
		videoPreload = checkAttr('videoPreload', attributes, manifest, componentName),

		showVideoUse = true,
		showVideoUrl = true,
		showVideoPoster = true,
		showVideoLoop = true,
		showVideoAdvanced = true,
		showVideoAutoplay = true,
		showVideoControls = true,
		showVideoMuted = true,
		showVideoPreload = true,
	} = attributes;

	const options = {...manifestOptions, ...attributes.options};

	if (!videoShowControls) {
		return null;
	}

	const [showAdvanced, setShowAdvanced] = useState(false);

	return (
		<>
			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			{showVideoUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
					checked={videoUse}
					onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
				/>
			}

			{videoUse &&
				<>
					{showVideoUrl &&
						<BaseControl
							label={__('Video', 'eightshift-frontend-libs')}
						>
							{!_.isEmpty(videoUrl) ?
								<Button
									isSecondary
									isSmall
									className={'custom-full-width-btn'}
									onClick={() => setAttributes({ [`${componentName}Url`]: [] })}
								>
									{__('Remove video', 'eightshift-frontend-libs')}
								</Button> :
								<MediaPlaceholder
									icon="format-video"
									onSelect={(value) => setAttributes({
											[`${componentName}Url`]: value.map((item) => {
												return {
													url: item.url,
													mime: typeof(item.mime) === 'undefined' ? item.mime_type : item.mime,
												}
											})
										})
									}
									accept={videoAccept}
									multiple={true}
									allowedTypes={videoAllowedTypes}
								/>
							}
						</BaseControl>
					}

					{showVideoPoster &&
						<BaseControl
							label={__('Video Poster', 'eightshift-frontend-libs')}
						>
							{!_.isEmpty(videoPoster) ?
								<>
									<img src={videoPoster} alt='' />
									<Button
										isSecondary
										isSmall
										className={'custom-full-width-btn'}
										onClick={() => setAttributes({ [`${componentName}Poster`]: {} })}
									>
										{__('Remove video poster', 'eightshift-frontend-libs')}
									</Button>
								</> :
								<MediaPlaceholder
									icon="format-video"
									onSelect={(value) => setAttributes({[`${componentName}Poster`]: value.url})}
									accept={'image/*'}
									allowedTypes={["image"]}
								/>
							}
						</BaseControl>
					}

					<br />

					{showVideoAdvanced &&
						<ToggleControl
							label={__('Show advanced options', 'eightshift-frontend-libs')}
							checked={showAdvanced}
							onChange={() => setShowAdvanced(!showAdvanced)}
						/>
					}

					{showAdvanced &&
						<>
							{showVideoLoop &&
								<ToggleControl
									label={__('Play in loop', 'eightshift-frontend-libs')}
									checked={videoLoop}
									onChange={(value) => setAttributes({ [`${componentName}Loop`]: value })}
								/>
							}

							{showVideoAutoplay &&
								<ToggleControl
									label={__('Autoplay', 'eightshift-frontend-libs')}
									checked={videoAutoplay}
									onChange={(value) => setAttributes({ [`${componentName}Autoplay`]: value })}
								/>
							}

							{showVideoControls &&
								<ToggleControl
									label={__('Show controls', 'eightshift-frontend-libs')}
									checked={videoControls}
									onChange={(value) => setAttributes({ [`${componentName}Controls`]: value })}
								/>
							}

							{showVideoMuted &&
								<ToggleControl
									label={__('Play muted', 'eightshift-frontend-libs')}
									checked={videoMuted}
									onChange={(value) => setAttributes({ [`${componentName}Muted`]: value })}
								/>
							}

							{showVideoPreload &&
								<SelectControl
									label={__('Preload type', 'eightshift-frontend-libs')}
									value={videoPreload}
									options={options.videoPreload}
									onChange={(value) => setAttributes({ [`${componentName}Preload`]: value })}
								/>
							}
						</>
					}

				</>
			}

		</>
	);
};
