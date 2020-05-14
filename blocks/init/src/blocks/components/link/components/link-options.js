import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { ToggleControl, Icon, BaseControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';

export const linkColors = () => {
  const {
    primary,
    black,
  } = getPaletteColors();

  return [
    primary,
    black,
  ];
};

export const LinkOptions = (props) => {
  const {
    link: {
      url,
      styleColor,
      isAnchor,
    },
    onChangeUrl,
    onChangeStyleColor,
    onChangeIsAnchor,
  } = props;

  return (
    <Fragment>

      {onChangeStyleColor &&
        <ColorPaletteCustom
          label={
            <Fragment>
              <Icon icon={() => icons.color} />
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
        <BaseControl label={__('Link Url', 'eightshift-boilerplate')}>
          <URLInput
            value={url}
            onChange={onChangeUrl}
          />
        </BaseControl>
      }

      {onChangeIsAnchor &&
        <ToggleControl
          label={__('Anchor', 'eightshift-boilerplate')}
          checked={isAnchor}
          onChange={onChangeIsAnchor}
        />
      }

    </Fragment>
  );
};
