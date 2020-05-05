import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/block-editor';
import { CarouselNavigation } from '../../../components/carousel-navigation/carousel-navigation';

export const CarouselEditor = ({ attributes }) => {
  const {
    blockClass,
    blockJsClass,
    allowedBlocks,
  } = attributes;

  const componentClass = `
    ${blockClass}
    ${blockJsClass}
  `;

  const navigationClass = `${blockClass}__navigation`;

  const blocksObject = (typeof allowedBlocks === 'undefined') || allowedBlocks;

  return (
    <div className={componentClass}>
      <InnerBlocks
        allowedBlocks={blocksObject}
      />
      <div className={navigationClass}>
        <CarouselNavigation />
      </div>
    </div>
  );
};
