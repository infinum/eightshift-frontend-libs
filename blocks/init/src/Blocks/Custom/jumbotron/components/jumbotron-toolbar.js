import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockAlignmentToolbar, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { ImageToolbar as ImageToolbarComponent } from '../../../Components/image/components/image-toolbar';

export const jumbotronContentHorizontalPosition = [
  'left', 'center', 'right',
];

export const jumbotronContentVerticalPosition = [
  'top', 'center', 'bottom',
];

export const jumbotronMediaHorizontalPosition = [
  'left', 'right',
];

export const JumbotronToolbar = ({ attributes, actions }) => {
  const {
    contentHorizontalPosition,
    contentVerticalPosition,
    mediaHorizontalPosition,
    media,
  } = attributes;

  const {
    onChangeContentHorizontalPosition,
    onChangeContentVerticalPosition,
    onChangeMediaHorizontalPosition,
    onChangeMedia,
  } = actions;

  const mediaObject = (typeof media === 'undefined') || media;

  return (
    <Fragment>

      {onChangeContentHorizontalPosition &&
        <BlockAlignmentToolbar
          value={contentHorizontalPosition}
          onChange={onChangeContentHorizontalPosition}
          controls={jumbotronContentHorizontalPosition}
        />
      }

      {onChangeContentVerticalPosition &&
        <BlockVerticalAlignmentToolbar
          value={contentVerticalPosition}
          onChange={onChangeContentVerticalPosition}
          controls={jumbotronContentVerticalPosition}
        />
      }

      {onChangeMediaHorizontalPosition &&
        <BlockAlignmentToolbar
          value={mediaHorizontalPosition}
          onChange={onChangeMediaHorizontalPosition}
          controls={jumbotronMediaHorizontalPosition}
        />
      }

      <ImageToolbarComponent
        media={mediaObject}
        onChangeMedia={onChangeMedia}
      />

    </Fragment>
  );
};
