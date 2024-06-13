import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { ToggleControl, TextControl, Notice } from '@wordpress/components';
import {
	UseToggle,
	checkAttr,
	getAttrKey
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const EmbedOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		embedShowControls = true,

		showEmbedUse = true,
		showEmbedUrl = true,
		showEmbedTitle = true,
		showEmbedAdvanced = true,
		showEmbedAutoplay = true,
		showEmbedEncryptedMedia = true,
		showEmbedPictureInPicture = true,
		showEmbedAllowFullScreen = true,
	} = attributes;

	if (!embedShowControls) {
		return null;
	}

	const embedUse = checkAttr('embedUse', attributes, manifest);
	const embedUrl = checkAttr('embedUrl', attributes, manifest);
	const embedTitle = checkAttr('embedTitle', attributes, manifest);
	const embedAutoplay = checkAttr('embedAutoplay', attributes, manifest);
	const embedEncryptedMedia = checkAttr('embedEncryptedMedia', attributes, manifest);
	const embedPictureInPicture = checkAttr('embedPictureInPicture', attributes, manifest);
	const embedAllowFullScreen = checkAttr('embedAllowFullScreen', attributes, manifest);

	const [showAdvanced, setShowAdvanced] = useState(false);

	return (
		<UseToggle
			label={sprintf(__('%s', 'safer-internet'), label)}
			checked={embedUse}
			onChange={(value) => setAttributes({ [getAttrKey('embedUse', attributes, manifest)]: value })}
			noUseToggle={!showEmbedUse}
			noLabel={!label}
		>

			{embedUse &&
				<>

					{showEmbedUrl &&
						<>
							<TextControl
								label={__('Url', 'safer-internet')}
								value={embedUrl}
								onChange={(value) => setAttributes({ [getAttrKey('embedUrl', attributes, manifest)]: value })}
								help={__('Will work with YouTube and Vimeo links', 'safer-internet')}
							/>

							<Notice
								status={'warning'}
								isDismissible={false}
							>
								{__('Please pay attention so everything is GDPR compliant.', 'safer-internet')}
							</Notice>
						</>
					}

					{showEmbedTitle &&
						<TextControl
							label={__('Title', 'safer-internet')}
							value={embedTitle}
							onChange={(value) => setAttributes({ [getAttrKey('embedTitle', attributes, manifest)]: value })}
							help={__('Not visible, used for improving accessibility', 'safer-internet')}
						/>
					}

					<br />

					{showEmbedAdvanced &&
						<ToggleControl
							label={__('Show advanced options', 'safer-internet')}
							checked={showAdvanced}
							onChange={() => setShowAdvanced(!showAdvanced)}
						/>
					}

					{showAdvanced &&
						<>
							{showEmbedAutoplay &&
								<ToggleControl
									label={__('Autoplay', 'safer-internet')}
									checked={embedAutoplay}
									onChange={(value) => setAttributes({ [getAttrKey('embedAutoplay', attributes, manifest)]: value })}
								/>
							}

							{showEmbedEncryptedMedia &&
								<ToggleControl
									label={__('Encrypted Media', 'safer-internet')}
									checked={embedEncryptedMedia}
									onChange={(value) => setAttributes({ [getAttrKey('embedEncryptedMedia', attributes, manifest)]: value })}
								/>
							}

							{showEmbedPictureInPicture &&
								<ToggleControl
									label={__('Picture in picture', 'safer-internet')}
									checked={embedPictureInPicture}
									onChange={(value) => setAttributes({ [getAttrKey('embedPictureInPicture', attributes, manifest)]: value })}
								/>
							}

							{showEmbedAllowFullScreen &&
								<ToggleControl
									label={__('Allow full screen', 'safer-internet')}
									checked={embedAllowFullScreen}
									onChange={(value) => setAttributes({ [getAttrKey('embedAllowFullScreen', attributes, manifest)]: value })}
								/>
							}

						</>
					}

				</>
			}

		</UseToggle>
	);
};
