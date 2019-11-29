import React from 'react'; // eslint-disable-line no-unused-vars

import { TabsEditor } from './components/tabs-editor';

export const Tabs = (props) => {
  const {
    attributes,
  } = props;

  return (
    <TabsEditor
      attributes={attributes}
    />
  );
};
  
