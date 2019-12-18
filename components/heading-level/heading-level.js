import { range } from 'lodash';
import { __, sprintf } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { createElement } from '@wordpress/element';

const createLevelControl = (targetLevel, selectedLevel, onChange) => {
  return {
    icon: 'heading',
    title: sprintf(__('Heading %d', 'eightshift-boilerplate'), targetLevel),
    isActive: targetLevel === selectedLevel,
    onClick: () => {
      onChange(targetLevel);
    },
    subscript: String(targetLevel),
  };
};

export const HeadingLevel = (props) => {
  const {
    minLevel = 1,
    maxLevel = 6,
    selectedLevel,
    onChange,
  } = props;

  return (
    createElement(Toolbar, {
      controls: range(minLevel, maxLevel + 1).map((index) => {
        return createLevelControl(index, selectedLevel, onChange);
      }),
    })
  );
};
