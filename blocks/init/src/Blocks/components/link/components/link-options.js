import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from '../manifest.json';

const { attributes: defaults, options, title } = manifest;

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
		label = title,
		linkShowControls = true,

		linkUse = defaults.linkUse.default,

		linkUrl,
		linkColor = defaults.linkColor.default,
		linkSize = defaults.linkSize.default,
		linkWidth = defaults.linkWidth.default,
		linkIsAnchor = defaults.linkIsAnchor.default,
		linkId,

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
				label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
				checked={linkUse}
				onChange={(value) => setAttributes({ linkUse: value })}
			/>

			{linkUse &&
				<Fragment>

					{showLinkUrl &&
						<URLInput
							label={__('Url', 'eightshift-boilerplate')}
							value={linkUrl}
							autoFocus={false}
							onChange={(value) => setAttributes({ linkUrl: value })}
						/>
					}

					{showLinkColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}

								</Fragment>
							}
							value={linkColor}
							colors={linkColors()}
							onChange={(value) => setAttributes({ linkColor: value })}
						/>
					}

					{showLinkSize &&
						<SelectControl
							label={__('Size', 'eightshift-boilerplate')}
							value={linkSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ linkSize: value })}
						/>
					}

					{showLinkWidth &&
						<SelectControl
							label={__('Width', 'eightshift-boilerplate')}
							value={linkWidth}
							options={options.widths}
							onChange={(value) => setAttributes({ linkWidth: value })}
						/>
					}

					{showLinkIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-boilerplate')}
							checked={linkIsAnchor}
							onChange={(value) => setAttributes({ linkIsAnchor: value })}
							help={__('Using anchor option will add JavaScript selector to the link. You must provide anchor destination inside link Url field. Example: #super-block.', 'eightshift-boilerplate')}
						/>
					}

					{showLinkId &&
						<TextControl
							label={__('ID', 'eightshift-boilerplate')}
							value={linkId}
							onChange={(value) => setAttributes({ linkId: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
