import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

export const LinkOptions = (props) => {
  const {
    url,
    onChangeUrl,
    styleColor,
    onChangeColor,
    isAnchor,
    onChangeIsAnchor,
  } = props;

  return (
    <PanelBody title={__('Link Details', 'eightshift-boilerplate')}>

      {onChangeColor &&
        <SelectControl
          label={__('Link Color', 'eightshift-boilerplate')}
          value={styleColor}
          options={[
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
            { label: __('Inverse', 'eightshift-boilerplate'), value: 'inverse' },
          ]}
          onChange={onChangeColor}
        />
      }

      {onChangeUrl &&
        <div className="components-base-control">
          <label className="components-base-control__label" htmlFor="url">{__('Link Url', 'eightshift-boilerplate')}</label>
          <URLInput
            value={url}
            onChange={onChangeUrl}
          />
        </div>
      }

      {onChangeIsAnchor &&
        <ToggleControl
          label={__('Anchor', 'eightshift-boilerplate')}
          checked={isAnchor}
          onChange={onChangeIsAnchor}
        />
      }

    </PanelBody>
  );
};
