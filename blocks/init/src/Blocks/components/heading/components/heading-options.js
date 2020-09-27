import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { SelectControl, Icon } from '@wordpress/components';

export const headingSizes = [
  { label: __('Default (115px)', 'eightshift-boilerplate'), value: 'default' },
  { label: __('Big (90px)', 'eightshift-boilerplate'), value: 'big' },
];

export const HeadingOptions = (props) => {
    const {
        heading: {
            styleColor,
            styleSize,
        },
        onChangeStyleColor,
        onChangeStyleSize,
    } = props;

    return (
    <Fragment>

      {onChangeStyleColor &&
            <ColorPaletteCustom
            label={
                <Fragment>
                <Icon icon={icons.color} />
                {__('Heading Color', 'eightshift-boilerplate')}
                </Fragment>
            }
            help={__('Change Heading color', 'eightshift-boilerplate')}
            value={styleColor}
            onChange={onChangeStyleColor}
            />
      }

      {onChangeStyleSize &&
            <SelectControl
            label={__('Heading Size', 'eightshift-boilerplate')}
            value={styleSize}
            options={headingSizes}
            onChange={onChangeStyleSize}
            />
      }

    </Fragment>
  );
};
