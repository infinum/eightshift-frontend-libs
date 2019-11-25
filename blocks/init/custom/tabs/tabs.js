import React from 'react';

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
