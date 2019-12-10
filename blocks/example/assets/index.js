import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ExampleEditor = (props) => {
  const {
    attributes: {
      blockClass,
      content,
    },
    actions: {
      onChangeContent,
    },
  } = props;

  return (
    <RichText
      placeholder={__('Add your content', 'eightshift-blocks')}
      className={blockClass}
      onChange={onChangeContent}
      value={content}
    />
  );
};
