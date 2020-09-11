import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockAlignmentToolbar } from '@wordpress/block-editor';
import { ImageToolbar } from '../../../components/image/components/image-toolbar';

export const cardListMediaPosition = [
  'left', 'right',
];

export const CardListToolbar = ({ attributes, actions }) => {
  const {
    mediaPosition,
    media,
  } = attributes;

  const {
    onChangeMediaPosition,
    onChangeMedia,
  } = actions;

  const mediaObject = (typeof media === 'undefined') || media;

  return (
    <Fragment>

      <ImageToolbar
        media={mediaObject}
        onChangeMedia={onChangeMedia}
      />

      {onChangeMediaPosition &&
        <BlockAlignmentToolbar
          value={mediaPosition}
          onChange={onChangeMediaPosition}
          controls={cardListMediaPosition}
        />
      }

    </Fragment>
  );
};
