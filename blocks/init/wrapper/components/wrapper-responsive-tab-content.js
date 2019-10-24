import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, RangeControl, ToggleControl, Icon } from '@wordpress/components';

import globalSettings from '../../manifest.json';

export const WrapperResponsiveTabContent = (props) => {
  const {
    contentWidth,
    contentOffset,
    containerWidth,
    containerSpacing,
    spacingTop,
    spacingBottom,
    hideBlock,
    onChangeContentWidth,
    onChangeContentOffset,
    onChangeContainerWidth,
    onChangeContainerSpacing,
    onChangeSpacingTop,
    onChangeSpacingBottom,
    onChangeHideBlock,
  } = props;

  const spacingOptions = {
    min: -1,
    max: 300,
    step: 10,
  };

  const widthOptions = {
    min: -1,
    max: globalSettings.maxCols,
    step: 1,
    initial: globalSettings.maxCols,
  };

  return (
    <Fragment>
      {onChangeContentWidth && (
        <RangeControl
          label={
            <Fragment>
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.4375 4v5.61390625l-3.9939844-3.99398437-1.1048828 1.10484374 2.1190234 2.11898438h-10.9304687l2.11902344-2.11898438-1.10492188-1.10484374-3.97878906 3.97878906v-5.59871094h-1.5625v11.328125h1.5625v-5.67683594l3.97878906 3.97878904 1.10492188-1.1048437-2.11902344-2.1189844h10.9304687l-2.1190234 2.1189844 1.1048828 1.1048437 3.9939844-3.99398435v5.69203125h1.5625v-11.328125z" /></svg>} />
              {__('Content Width', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={sprintf(__('Change block width in %d columns range. Example 6 = 50% screen width. If you set a value to -1 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate'), globalSettings.maxCols)}
          value={contentWidth}
          onChange={onChangeContentWidth}
          min={widthOptions.min}
          max={widthOptions.max}
          step={widthOptions.step}
          initialPosition={widthOptions.initial}
        />
      )}

      {onChangeContentOffset && (
        <SelectControl
          label={
            <Fragment>
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19 10c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1h-18c-.552 0-1-.448-1-1v-6c0-.552.448-1 1-1h2v2h2v-2h2v4h2v-4h2v2h2v-2h2v4h2v-4zm-3-8 3.414 3-3.414 3v-2h-16v-2h16z" /></svg>} />
              {__('Content Offset', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change content position inside a block.', 'eightshift-boilerplate')}
          value={contentOffset}
          options={[
            { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
            { label: __('Content Spacing', 'eightshift-boilerplate'), value: 'content-spacing' },
            { label: __('Center', 'eightshift-boilerplate'), value: 'center' },
          ]}
          onChange={onChangeContentOffset}
        />
      )}

      {onChangeContainerWidth &&
        <SelectControl
          label={
            <Fragment>
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.26147461 1.58157348h-1.56204223v-1.56204223h1.56204223zm9.17648319-1.56204223h-1.5228272v1.56204223h1.5228272v1.52282715h1.5620422v-1.52282715c0-.86273192-.6993103-1.56204223-1.5620422-1.56204223zm-6.1306763 0h-1.5620422v1.56204223h1.5620422zm3.0458069 0h-1.5618897v1.56204223h1.5618897zm3.0848694 6.16973875h1.5620422v-1.56188961h-1.5620422zm-16.86920171-1.56188961h-1.56204222v1.56188961h1.56204222zm4.64691164-4.60784914h-1.56204226v1.56204223h1.56204226zm-4.64691164 1.56204223h1.48391727v-1.56204223h-1.48391727c-.86273191 0-1.56204222.69931031-1.56204222 1.56204223v1.52282715h1.56204222zm7.61459352 7.73162843h-1.56204223v1.56204219h1.56204223zm9.25460819 0h-1.5228272v1.56204219h1.5228272c.8627319 0 1.5620422-.6993103 1.5620422-1.56204219v-1.56188964h-1.5620422zm-6.2088013 0h-1.5618897v1.56204219h1.5618897zm3.1239319 0h-1.5618897v1.56204219h1.5618897zm-9.21554567 0h-1.56204226v1.56204219h1.56204226zm-4.56878664 1.56204219h1.48391727v-1.56204219h-1.48391727v-1.56188964h-1.56204222v1.56188964c0 .86273189.69931031 1.56204219 1.56204222 1.56204219zm13.77517701 3.1176758 1.6586304 1.681366h-14.03747561l1.65878297-1.681366-1.11190797-1.0969543-3.51196289 3.5598755 3.51501465 3.5227966 1.10580445-1.1032104-1.63558961-1.6390992h13.99719241l-1.6354371 1.6390992 1.1056519 1.1032104 3.5150147-3.5227966-3.5118103-3.5598755z" /></svg>} />
              {__('Container Width', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change Container width. Changing this option will affect total width for Content Width option.', 'eightshift-boilerplate')}
          value={containerWidth}
          options={[
            { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
          ]}
          onChange={onChangeContainerWidth}
        />
      }

      {onChangeContainerSpacing &&
        <SelectControl
          label={
            <Fragment>
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m14.7668457 15.5073547-1.1035156-1.1042785 4.1334533-4.1307068-4.1360473-4.17343143 1.1087036-1.09893797 5.2305603 5.27771zm-8.43017578-1.1042785-4.13345336-4.1307068 4.13619992-4.17343143-1.10885617-1.09893797-5.23056031 5.27771 5.2331543 5.2296447zm4.44396968-4.1311646c0 .4302979-.3501892.7804871-.7806396.7804871-.43045043 0-.78048707-.3501892-.78048707-.7804871 0-.43045043.35003664-.78063965.78048707-.78063965.4304504 0 .7806396.35018922.7806396.78063965zm3.1222534 0c0 .4302979-.3501891.7804871-.7806396.7804871-.4304504 0-.780487-.3501892-.780487-.7804871 0-.43045043.3500366-.78063965.780487-.78063965.4304505 0 .7806396.35018922.7806396.78063965zm-6.24450675 0c0 .4302979-.35018922.7804871-.78063969.7804871-.43045043 0-.78048703-.3501892-.78048703-.7804871 0-.43045043.3500366-.78063965.78048703-.78063965.43045047 0 .78063969.35018922.78063969.78063965z" /></svg>} />
              {__('Container Spacing', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change Container spacing on the left and right.', 'eightshift-boilerplate')}
          value={containerSpacing}
          options={[
            { label: __('Not Set', 'eightshift-boilerplate'), value: '' },
            { label: __('Default', 'eightshift-boilerplate'), value: 'default' },
            { label: __('No Spacing', 'eightshift-boilerplate'), value: 'no-spacing' },
          ]}
          onChange={onChangeContainerSpacing}
        />
      }

      {onChangeSpacingTop &&
        <RangeControl
          label={
            <Fragment>
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.4936829 16.8025207-3.50662235-3.7069702 1.13510132-1.073761 2.36846923 2.5038148 2.3544312-2.5022889 1.1380004 1.0707092zm6.4750671-1.4900207v-10.625c0-2.58468629-2.1028137-4.6875-4.6875-4.6875h-3.59375c-2.58468629 0-4.6875 2.10281371-4.6875 4.6875v10.625c0 2.5846863 2.10281371 4.6875 4.6875 4.6875h3.59375c2.5846863 0 4.6875-2.1028137 4.6875-4.6875zm-4.6875-13.75c1.723175 0 3.125 1.40182496 3.125 3.125v10.625c0 1.723175-1.401825 3.125-3.125 3.125h-3.59375c-1.72317504 0-3.125-1.401825-3.125-3.125v-10.625c0-1.72317504 1.40182496-3.125 3.125-3.125zm-1.796875 1.6015625c-.4315186 0-.78125.34973145-.78125.78125s.3497314.78125.78125.78125.78125-.34973145.78125-.78125-.3497314-.78125-.78125-.78125zm0 3.125c-.4315186 0-.78125.34973145-.78125.78125s.3497314.78125.78125.78125.78125-.34973145.78125-.78125-.3497314-.78125-.78125-.78125zm0 3.125c-.4315186 0-.78125.34973145-.78125.78125 0 .4315186.3497314.78125.78125.78125s.78125-.3497314.78125-.78125c0-.43151855-.3497314-.78125-.78125-.78125z" transform="matrix(-1 0 0 -1 20.96875 20)" /></svg>} />
              {__('Spacing Top', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change Block Spacing from the top. If you set a value to -1 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
          value={spacingTop}
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
              <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.4936829 16.8025207-3.50662235-3.7069702 1.13510132-1.073761 2.36846923 2.5038148 2.3544312-2.5022889 1.1380004 1.0707092zm6.4750671-1.4900207v-10.625c0-2.58468629-2.1028137-4.6875-4.6875-4.6875h-3.59375c-2.58468629 0-4.6875 2.10281371-4.6875 4.6875v10.625c0 2.5846863 2.10281371 4.6875 4.6875 4.6875h3.59375c2.5846863 0 4.6875-2.1028137 4.6875-4.6875zm-4.6875-13.75c1.723175 0 3.125 1.40182496 3.125 3.125v10.625c0 1.723175-1.401825 3.125-3.125 3.125h-3.59375c-1.72317504 0-3.125-1.401825-3.125-3.125v-10.625c0-1.72317504 1.40182496-3.125 3.125-3.125zm-1.796875 1.6015625c-.4315186 0-.78125.34973145-.78125.78125s.3497314.78125.78125.78125.78125-.34973145.78125-.78125-.3497314-.78125-.78125-.78125zm0 3.125c-.4315186 0-.78125.34973145-.78125.78125s.3497314.78125.78125.78125.78125-.34973145.78125-.78125-.3497314-.78125-.78125-.78125zm0 3.125c-.4315186 0-.78125.34973145-.78125.78125 0 .4315186.3497314.78125.78125.78125s.78125-.3497314.78125-.78125c0-.43151855-.3497314-.78125-.78125-.78125z" /></svg>} />
              {__('Spacing Bottom', 'eightshift-boilerplate')}
            </Fragment>
          }
          help={__('Change Block Spacing from the bottom. If you set a value to -1 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
          value={spacingBottom}
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
          checked={hideBlock}
          onChange={onChangeHideBlock}
        />
      }
    </Fragment>
  );
};
