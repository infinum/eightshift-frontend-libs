import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { RangeControl, ToggleControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import globalSettings from '../../manifest.json';

export const wrapperSpacingOptions = {
  min: -10,
  max: globalSettings.globalVariables.sectionSpacing.max,
  step: globalSettings.globalVariables.sectionSpacing.step,
};

export const WrapperResponsiveTabContentSimple = (props) => {
  const {
    type,
    spacingTop,
    spacingBottom,
    hideBlock,
    onChangeSpacingTop,
    onChangeSpacingBottom,
    onChangeHideBlock,
  } = props;

  return (
    <Fragment>
      {onChangeSpacingTop &&
        <RangeControl
          label={
            <Fragment>
              <Icon icon={icons.spacingTop} />
              {__('Spacing Top', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
          allowReset={true}
          value={spacingTop[type]}
          onChange={onChangeSpacingTop}
          min={wrapperSpacingOptions.min}
          max={wrapperSpacingOptions.max}
          step={wrapperSpacingOptions.step}
        />
      }

      {onChangeSpacingBottom &&
        <RangeControl
          label={
            <Fragment>
              <Icon icon={icons.spacingBottom} />
              {__('Spacing Bottom', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
          allowReset={true}
          value={spacingBottom[type]}
          onChange={onChangeSpacingBottom}
          min={wrapperSpacingOptions.min}
          max={wrapperSpacingOptions.max}
          step={wrapperSpacingOptions.step}
        />
      }

      {onChangeHideBlock &&
        <ToggleControl
          label={__('Hide Block', 'eightshift-boilerplate')}
          help={__('Toggle block visibility.', 'eightshift-boilerplate')}
          checked={hideBlock[type]}
          onChange={onChangeHideBlock}
        />
      }
    </Fragment>
  );
};
