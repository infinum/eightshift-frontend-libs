import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, FormTokenField, RangeControl } from '@wordpress/components';

export const postTypeOptions = [
  { label: __('Posts', 'eightshift-blocks'), value: 'posts' },
];

export const FeaturedPostsOptions = (props) => {
  const {
    attributes: {
      postNames,
      postNumber,
      postType,
    },
    actions: {
      onChangePostType,
      onChangePostNumber,
      onChangePostInput,
      onChangePost,
    },
    postResults,
  } = props;

  let suggestions = [];

  if (postResults.length) {
    suggestions = postResults.map((postResultsItem) => {
      return postResultsItem.title.rendered;
    });
  }

  return (
    <PanelBody title={__('Featured Post', 'eightshift-blocks')}>

      {onChangePostNumber &&
        <RangeControl
          value={postNumber}
          label={__('Number of posts to show', 'eightshift-blocks')}
          onChange={onChangePostNumber}
          min={1}
          max={10}
        />
      }

      {onChangePostType &&
        <SelectControl
          label={__('Post Type', 'eightshift-blocks')}
          value={postType}
          options={postTypeOptions}
          onChange={onChangePostType}
        />
      }

      {onChangePostInput &&
        <FormTokenField
          value={postNames}
          suggestions={suggestions}
          onInputChange={onChangePostInput}
          onChange={onChangePost}
          maxLength={postNumber}
          label={__('Select posts', 'eightshift-blocks')}
        />
      }
    </PanelBody>
  );
};
