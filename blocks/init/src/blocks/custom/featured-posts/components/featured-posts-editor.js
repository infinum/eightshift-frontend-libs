import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';

export const FeaturedPostsEditor = (props) => {
  const {
    attributes: {
      posts,
    },
  } = props;

  return (
    <Fragment>
      {posts.map((post, key) => {
        return (
          <Fragment key={key}>
            <h3>{post.title.rendered}</h3>
            <div>{post.excerpt.rendered}</div>
          </Fragment>
        );
      })
      }
    </Fragment>
  );
};
