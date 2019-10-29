import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';

export const HeadingOptions = (props) => {
  const {
    styleColor,
    onChangeStyleColor,
    styleSize,
    onChangeStyleSize,
  } = props;

  return (
    <PanelBody title={__('Heading Details', 'eightshift-boilerplate')}>

      {onChangeStyleColor &&
        <SelectControl
          label={__('Heading Color', 'eightshift-boilerplate')}
          value={styleColor}
          options={[
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
            { label: __('Primary', 'eightshift-boilerplate'), value: 'primary' },
          ]}
          onChange={onChangeStyleColor}
        />
      }

      {onChangeStyleSize &&
        <SelectControl
          label={__('Heading Size', 'eightshift-boilerplate')}
          value={styleSize}
          options={[
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
            { label: __('Big', 'eightshift-boilerplate'), value: 'big' },
          ]}
          onChange={onChangeStyleSize}
        />
      }

    </PanelBody>
  );
};
