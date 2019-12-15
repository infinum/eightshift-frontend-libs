# Custom Block Structure

In order for the library to work and register blocks dynamically, a specific folder structure and naming must be followed. Individual blocks are placed in the `custom` folder.

Your custom block structure should look like this:

```
|____block-name
| |____components
| | |____block-name-editor.js
| |____block-name.js
| |____block-name.php
| |____block-name-editor.scss
| |____block-name-style.scss
| |____manifest.json
```

For example you can check the [button block](https://github.com/infinum/eightshift-blocks/tree/develop/blocks/custom/button) in the eightshift-blocks library.

### components
Components folder is optional, and can hold three files `block-name-options.js`, `block-name-editor.js` and `block-name-toolbars.js`. Each of these files represents a part of the Gutenberg block that is used in the editor. We have separated options, editor and toolbars in separate components for the sake of readability and reusing components in different projects. This folder is mostly not necessary.

### block-name.js
This file represents the `edit` callback method used in WordPress `registerBlockType` method.
We are not using the `save` callback component because this library is used to create dynamic blocks. The `edit` method describes how your block will be rendered in the editor once the block is used. 

### block-name.php
This file will pass the properties you've set in the `block-name.js` and use the `render_block_view()` method from the [eightshift libs](https://github.com/infinum/eightshift-blocks/blob/44c168f74ba57cc596f352d34a3e4c6441fc2b8b/src/class-blocks.php#L193). In the case of the button block it would look like this:

```php
$this->render_block_view(
  '/components/button/button.php',
  [
    'blockClass'     => $attributes['blockClass'] ?? '',
    'title'          => $attributes['title'] ?? '',
    'url'            => $attributes['url'] ?? '',
    'styleColor'     => $attributes['styleColor'] ?? '',
    'styleSize'      => $attributes['styleSize'] ?? '',
    'styleSizeWidth' => $attributes['styleSizeWidth'] ?? '',
  ]
);
```

This will render the `button` component view (first argument) with the attributes set in the `button` block (second argument).

### block-name-editor.scss
Holds only the editor styling for the block. You should be using this file to override styles in the editor set by the component. In 90% of cases, you will not need to write any overrides here. But if you are using any columns layout like a grid, flex, etc., you may need to add some corrections.

Corrections in the columns layout are necessary because Gutenberg editor adds its additional HTML and you can't change it.  
_This file is optional_.

### block-name-style.scss
Holds all the frontend and editor styling for the component. Like the above file, in most cases it can be avoided.  
_This file is optional_.

### manifest.json
This file contains all the configuration required for a block to work. It's used in WordPress [`registerBlockType`](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/) method to register a block.

It looks like this:

```json
{
  "blockName": "button",
  "title": "Button",
  "description" : "Button block with custom settings.",
  "category": "eightshift",
  "icon": {
    "src": "editor-removeformatting"
  },
  "keywords": [
    "button",
    "btn",
    "link"
  ],
  "attributes": {
    "title": {
      "type": "string"
    },
    "url": {
      "type": "string"
    },
    "styleSize": {
      "type": "string",
      "default": "default"
    },
    "styleColor": {
      "type": "string",
      "default": "default"
    },
    "styleSizeWidth": {
      "type": "string",
      "default": "default"
    },
    "btnId": {
      "type": "string"
    }
  }
}
```
