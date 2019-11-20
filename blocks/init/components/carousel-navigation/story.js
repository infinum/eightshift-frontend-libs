import React from 'react';

import { CarouselNavigation } from './carousel-navigation';

export default {
  title: 'Components|Carousel Navigation',
};


const defaultProps = {
  blockClass: 'block-button',
  title: 'Button Title',
  url: '',
  btnId: '',
};

export const component = () => (
  <CarouselNavigation
    attributes={{
      ...defaultProps
    }}
  />
);
