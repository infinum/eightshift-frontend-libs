# JavaScript GetActions Helper

This helper will create attributes actions from blocks `manifest.json`.
Actions are passed in child components in order to update props on an event (`onChange`, `onClick`, etc.).

Default function output is `onChange` + attribute name.  
Example: `onChangeContent`.

Helper is located [here](https://github.com/infinum/eightshift-frontend-libs/blob/d14c02804c1e55fc4ca11af0546a40205fee93a7/scripts/get-actions.js).

`manifest.json`

```json
{
  "attributes": {
    "content": {
      "type": "string"
    },
    "styleSize": {
      "type": "string",
      "default": "default"
    }
  }
}
```

### Usage

```js
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

const actions = getActions(props, manifest);
```

Output:

```js
const actions = {
  onChangeContent: (value) => {
    setAttributes({
      content: value,
    });
  },
  onChangeStyleSize: (value) => {
    setAttributes({
      styleSize: value,
    });
  },
};
```
