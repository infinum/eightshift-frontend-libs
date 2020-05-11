import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import apiFetch from '@wordpress/api-fetch'; // eslint-disable-line import/no-extraneous-dependencies

import manifest from './manifest.json';
import { FeaturedPostsEditor } from './components/featured-posts-editor';
import { FeaturedPostsOptions } from './components/featured-posts-options';

export const FeaturedPosts = (props) => {
  const {
    setAttributes,
    attributes,
    attributes: {
      postType,
      posts,
    },
  } = props;

  const [postResults, setPostResults] = useState(posts);

  const actions = {
    ...getActions(props, manifest),

    onChangePostInput: (value) => {
      apiFetch({ path: `/wp/v2/${postType}/?search=${value}` })
        .then((response) => {
          setPostResults(response);
        });
    },

    onChangePost: (postNames) => {
      const selectedPosts = [...posts, ...postResults].filter((postResultsItem) => {
        return postNames.includes(postResultsItem.title.rendered);
      });

      setAttributes({
        postNames,
        posts: selectedPosts,
      });

    },
  };

  return (
    <Fragment>
      <InspectorControls>
        <FeaturedPostsOptions
          attributes={attributes}
          actions={actions}
          postResults={postResults}
        />
      </InspectorControls>

      {!posts.length ?
        <Fragment>
          Click to select posts
          <Spinner />
        </Fragment> :

        <FeaturedPostsEditor
          attributes={attributes}
          actions={actions}
        />
      }
    </Fragment>
  );
};
