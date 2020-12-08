import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { options, title } = manifest;

export const linkColors = () => {
	const colors = getPaletteColors();

	return [
		colors.primary,
		colors.black,
	];
};

export const LinkOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		linkShowControls = true,

		linkUse = checkAttr('linkUse', attributes, manifest, componentName),

		linkUrl = checkAttr('linkUrl', attributes, manifest, componentName),
		linkColor = checkAttr('linkColor', attributes, manifest, componentName),
		linkSize = checkAttr('linkSize', attributes, manifest, componentName),
		linkWidth = checkAttr('linkWidth', attributes, manifest, componentName),
		linkIsAnchor = checkAttr('linkIsAnchor', attributes, manifest, componentName),
		linkId = checkAttr('linkId', attributes, manifest, componentName),

		showLinkUrl = true,
		showLinkColor = true,
		showLinkSize = true,
		showLinkWidth = true,
		showLinkIsAnchor = true,
		showLinkId = true,

	} = attributes;

	if (!linkShowControls) {
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
				checked={linkUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{linkUse &&
				<Fragment>

					{showLinkUrl &&
						<URLInput
							label={__('Url', 'eightshift-frontend-libs')}
							value={linkUrl}
							autoFocus={false}
							onChange={(value) => setAttributes({ [`${componentName}Url`]: value })}
						/>
					}

					{showLinkColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}

								</Fragment>
							}
							value={linkColor}
							colors={linkColors()}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showLinkSize &&
						<SelectControl
							label={__('Size', 'eightshift-frontend-libs')}
							value={linkSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}

					{showLinkWidth &&
						<SelectControl
							label={__('Width', 'eightshift-frontend-libs')}
							value={linkWidth}
							options={options.widths}
							onChange={(value) => setAttributes({ [`${componentName}Width`]: value })}
						/>
					}

					{showLinkIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-frontend-libs')}
							checked={linkIsAnchor}
							onChange={(value) => setAttributes({ [`${componentName}IsAnchor`]: value })}
							help={__('Using anchor option will add JavaScript selector to the link. You must provide anchor destination inside link Url field. Example: #super-block.', 'eightshift-frontend-libs')}
						/>
					}

					{showLinkId &&
						<TextControl
							label={__('ID', 'eightshift-frontend-libs')}
							value={linkId}
							onChange={(value) => setAttributes({ [`${componentName}Id`]: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
