import React from './node_modules/react'; // eslint-disable-line no-unused-vars
import classnames from './node_modules/classnames';

export const CarouselNavigation = () => {

  const componentClass = 'carousel-navigation';

  const arrowItemPrevClass = classnames(
    `${componentClass}__arrow-item`,
    `${componentClass}__arrow-item--prev`,
  );

  const arrowItemNextClass = classnames(
    `${componentClass}__arrow-item`,
    `${componentClass}__arrow-item--next`,
  );

  const arrowIconClass = classnames(`${componentClass}__arrow-icon`);

  return (
    <div className={componentClass}>
      <div className={arrowItemPrevClass}>
        <svg className={arrowIconClass} xmlns="http://www.w3.org/2000/svg" width="30" height="12">
          <path fill="#353535" fillRule="evenodd" d="M7.174 6v4.483L.686 5.657 7.174.83V5H30v1H7.174z" />
        </svg>
      </div>
      <div className={arrowItemNextClass}>
        <svg className={arrowIconClass} xmlns="http://www.w3.org/2000/svg" width="30" height="12">
          <path fill="#353535" fillRule="evenodd" d="M22.826 5V.83l6.488 4.827-6.488 4.826V6H0V5h22.826z" />
        </svg>
      </div>
    </div>
  );
};
