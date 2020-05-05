import React from 'react'; // eslint-disable-line no-unused-vars

export const DividerEditor = ({ attributes }) => {
  const {
    blockClass,
    color,
  } = attributes;

  return (
    <div className={`${blockClass} ${blockClass}__color--${color}`}></div>
  );
};
