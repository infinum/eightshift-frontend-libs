import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

export const ButtonOptions = (props) => {
  const {
    url,
    onChangeUrl,
    styleSize,
    onChangeStyleSize,
    styleColor,
    onChangeStyleColor,
    styleSizeWidth,
    onChangeStyleSizeWidth,
    id,
    onChangeId,
    title,
    onChangeTitle,
  } = props;

  return (
    <PanelBody title={__('Button Details', 'eightshift-boilerplate')}>

      {onChangeStyleColor &&
        <SelectControl
          label={__('Button Color', 'eightshift-boilerplate')}
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
          label={__('Button Size', 'eightshift-boilerplate')}
          value={styleSize}
          options={[
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
            { label: __('Big', 'eightshift-boilerplate'), value: 'big' },
          ]}
          onChange={onChangeStyleSize}
        />
      }

      {onChangeStyleSizeWidth &&
        <SelectControl
          label={__('Button Size Width', 'eightshift-boilerplate')}
          value={styleSizeWidth}
          options={[
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
            { label: __('Block', 'eightshift-boilerplate'), value: 'block' },
          ]}
          onChange={onChangeStyleSizeWidth}
        />
      }

      {onChangeUrl &&
        <div className="components-base-control">
          <label className="components-base-control__label" htmlFor="url">{__('Button Link', 'eightshift-boilerplate')}</label>
          <URLInput
            value={url}
            onChange={onChangeUrl}
          />
        </div>
      }

      {onChangeTitle &&
        <TextControl
          label={__('Button Title', 'eightshift-boilerplate')}
          value={title}
          onChange={onChangeTitle}
        />
      }

      {onChangeId &&
        <TextControl
          label={__('Button ID', 'eightshift-boilerplate')}
          value={id}
          onChange={onChangeId}
        />
      }

    </PanelBody>
  );
};
