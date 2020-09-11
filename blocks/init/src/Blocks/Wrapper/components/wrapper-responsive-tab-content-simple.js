import React from './node_modules/react'; // eslint-disable-line no-unused-vars
import { __ } from './node_modules/@wordpress/i18n';
import { Fragment } from './node_modules/@wordpress/element';
import { RangeControl, ToggleControl, Icon } from './node_modules/@wordpress/components';
import { icons } from './node_modules/@eightshift/frontend-libs/scripts/editor';
import globalSettings from '../../manifest.json';

export const spacingOptions = {
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
          min={spacingOptions.min}
          max={spacingOptions.max}
          step={spacingOptions.step}
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
          min={spacingOptions.min}
          max={spacingOptions.max}
          step={spacingOptions.step}
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
