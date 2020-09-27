import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
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
			styleColor,
			isAnchor,
			id,
		},
		onChangeUrl,
		onChangeStyleColor,
		onChangeIsAnchor,
		onChangeId,
	} = props;

	return (
		<Fragment>

			{onChangeStyleColor &&
				<ColorPaletteCustom
					label={
						<Fragment>
							<Icon icon={icons.color} />
							{__('Link Color', 'eightshift-boilerplate')}
						</Fragment>
					}
					help={__('Change Link color.', 'eightshift-boilerplate')}
					value={styleColor}
					colors={linkColors()}
					onChange={onChangeStyleColor}
				/>
			}

			{onChangeUrl &&
				<URLInput
					label={__('Link Url', 'eightshift-boilerplate')}
					value={url}
					onChange={onChangeUrl}
				/>
			}

			{onChangeIsAnchor &&
				<ToggleControl
					label={__('Anchor', 'eightshift-boilerplate')}
					checked={isAnchor}
					onChange={onChangeIsAnchor}
					help={__('Using anchor option will add JavaScript selector to the link. You must provide anchor destination inside Link Url field. Example: #super-block.', 'eightshift-boilerplate')}
				/>
			}

			{onChangeId &&
				<TextControl
					label={__('Link ID', 'eightshift-boilerplate')}
					value={id}
					onChange={onChangeId}
				/>
			}

		</Fragment>
	);
};
