import React from 'react'; // eslint-disable-line no-unused-vars

export const DividerEditor = (props) => {
  const {
    attributes: {
      blockClass,
      color,
    },
  } = props;

  return (
    <div className={`${blockClass} ${blockClass}__color--${color}`}></div>
  );
};
