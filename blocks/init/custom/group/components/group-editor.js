import { InnerBlocks } from '@wordpress/block-editor';

export const GroupEditor = (props) => {
  const {
    attributes: {
      blockClass,
    },
  } = props;

  return (
    <div className={blockClass}>
      <InnerBlocks />
    </div>
  );
};
