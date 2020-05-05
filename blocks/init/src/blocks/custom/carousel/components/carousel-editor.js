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

  return (
    <div className={componentClass}>
      <InnerBlocks
        allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
      />
      <div className={navigationClass}>
        <CarouselNavigation />
      </div>
    </div>
  );
};
