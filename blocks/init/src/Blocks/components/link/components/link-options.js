import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { ToggleControl, Icon, TextControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';

export const linkColors = () => {
	const colors = getPaletteColors();

	return [
		colors.primary,
		colors.black,
	];
};

export const LinkOptions = (props) => {
	const {
		link: {
			url,
			color,
			isAnchor,
			id,
			use = true,
		},
		showControls = true,
		label = __('Link', 'eightshift-boilerplate'),
		onChangeLinkUrl,
		onChangeLinkColor,
		onChangeLinkIsAnchor,
		onChangeLinkId,
		onChangeLinkUse,
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

			{onChangeLinkUse &&
				<ToggleControl
					label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
					checked={use}
					onChange={onChangeLinkUse}
				/>
			}

			{use &&
				<Fragment>
					{onChangeLinkColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}
								</Fragment>
							}
							value={color}
							colors={linkColors()}
							onChange={onChangeLinkColor}
						/>
					}

					{onChangeLinkUrl &&
						<URLInput
							label={__('Url', 'eightshift-boilerplate')}
							value={url}
							autoFocus={false}
							onChange={onChangeLinkUrl}
						/>
					}

					{onChangeLinkIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-boilerplate')}
							checked={isAnchor}
							onChange={onChangeLinkIsAnchor}
							help={__('Using anchor option will add JavaScript selector to the link. You must provide anchor destination inside Link Url field. Example: #super-block.', 'eightshift-boilerplate')}
						/>
					}

					{onChangeLinkId &&
						<TextControl
							label={__('ID', 'eightshift-boilerplate')}
							value={id}
							onChange={onChangeLinkId}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
