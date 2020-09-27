import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { CarouselNavigation } from '../../../components/carousel-navigation/carousel-navigation';

export const CarouselEditor = ({ attributes }) => {
    const {
        blockClass,
        blockJsClass,
        allowedBlocks,
    } = attributes;

    const blocksObject = (typeof allowedBlocks === 'undefined') || allowedBlocks;

    return (
    <div className={classnames(blockClass, blockJsClass)}>
      <InnerBlocks
        allowedBlocks={blocksObject}
      />
      <div className={`${blockClass}__navigation`}>
        <CarouselNavigation />
      </div>
    </div>
  );
};
