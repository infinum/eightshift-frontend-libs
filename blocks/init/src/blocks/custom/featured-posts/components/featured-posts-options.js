import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, FormTokenField, RangeControl } from '@wordpress/components';

export const postTypeOptions = [
  { label: __('Posts', 'eightshift-boilerplate'), value: 'posts' },
];

export const FeaturedPostsOptions = ({ attributes, actions }) => {
  const {
    postNames,
    postNumber,
    postType,
    postResults,
  } = attributes;

  const {
    onChangePostType,
    onChangePostNumber,
    onChangePostInput,
    onChangePost,
  } = actions;

  let suggestions = [];

  if (postResults.length) {
    suggestions = postResults.map((postResultsItem) => {
      return postResultsItem.title.rendered;
    });
  }

  return (
    <PanelBody title={__('Featured Post', 'eightshift-boilerplate')}>

      {onChangePostNumber &&
        <RangeControl
          value={postNumber}
          allowReset={true}
          label={__('Number of posts to show', 'eightshift-boilerplate')}
          onChange={onChangePostNumber}
          min={1}
          max={10}
        />
      }

      {onChangePostType &&
        <SelectControl
          label={__('Post Type', 'eightshift-boilerplate')}
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
          label={__('Select posts', 'eightshift-boilerplate')}
        />
      }
    </PanelBody>
  );
};
