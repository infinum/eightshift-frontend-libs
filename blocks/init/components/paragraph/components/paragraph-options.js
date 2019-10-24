import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';

export const ParagraphOptions = (props) => {
  const {
    styleColor,
    onChangeStyleColor,
    styleSize,
    onChangeStyleSize,
    removeStyle,
  } = props;

  return (
    <Fragment>
      {removeStyle !== true &&
        <PanelBody title={__('Paragraph Details', 'eightshift-boilerplate')}>

          {onChangeStyleColor &&
            <SelectControl
              label={__('Paragraph Color', 'eightshift-boilerplate')}
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
              label={__('Paragraph Font Size', 'eightshift-boilerplate')}
              value={styleSize}
              options={[
                { label: __('Default (22px)', 'infinum'), value: 'default' },
                { label: __('Small (20px)', 'infinum'), value: 'small' },
              ]}
              onChange={onChangeStyleSize}
            />
          }

        </PanelBody>
      }
    </Fragment>
  );
};

