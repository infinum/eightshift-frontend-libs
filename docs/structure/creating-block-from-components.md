# Creating Block from Components

You may wonder: what is the difference between components and blocks? Aren't they the same thing? 

They are similar, but not the same. Components are, for lack of a better word, _dumb_. They don't have any styling, they aren't bothered with the context. And they are **reusable**.  
This is the key word in this whole ordeal. One component may be reused in different blocks. Let's look at an example. For instance, we want to create a service box block. This block consists of an image, a title and a text.

```shell
         Image

         Title

Some text can go here
in one or multuple lines.
```

### Folder structure

First we'll create a block in the `src/blocks/custom/service-box` folder. The folder structure will look like this

```shell
|____service-box
| |____components
| | |____service-box-editor.js
| | |____service-box-options.js
| |____service-box.js
| |____service-box.php
| |____service-box-style.scss
| |____manifest.json
``` 

The `manifest.json` will hold all the default attributes and data about the new block

### Manifest

```json
{
  "blockName": "service-box",
  "title": "Service Box",
  "description" : "Service Box with custom settings.",
  "category": "eightshift",
  "icon": {
    "src": "buddicons-buddypress-logo"
  },
  "keywords": [
    "Service",
    "Box",
    "Service Box"
  ],
  "hasWrapper": false,
  "attributes": {
    "mediaId": {
      "type": "number"
    },
    "mediaUrl": {
      "type": "string"
    },
    "mediaSize": {
      "type": "string",
      "default": "large"
    },
    "title": {
      "type": "string"
    },
    "content": {
      "type": "string"
    }
  }
}
```

### Components

Next, we want to set up the editor and options component for this block. So in the `components` folder we'll add `service-box-editor.js` and `service-box-options.js` files

**service-box-editor.js**

```js
import { RichText } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { ImageEditor } from './../../../components/image/components/image-editor';

export const ServiceBoxEditor = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      content,
      mediaUrl,
    },
    actions: {
      onChangeTitle,
      onChangeContent,
    },
  } = props;

  const titleClass = `${blockClass}__title`;
  const contentClass = `${blockClass}__content`;
  const imageClass = `${blockClass}__image`;

  return (
    <div className={blockClass}>
      <div className={imageClass}>
        <ImageEditor
          blockClass={blockClass}
          url={mediaUrl}
        />
      </div>
      <div className={titleClass}>
        <RichText
          placeholder={__('Add title', 'eightshift')}
          onChange={onChangeTitle}
          value={title}
        />
      </div>
      <div className={contentClass}>
        <RichText
          placeholder={__('Add content', 'eightshift')}
          onChange={onChangeContent}
          value={content}
        />
      </div>
    </div>
  );
};
```

Notice how we've imported the [`image-editor`](https://github.com/infinum/eightshift-frontend-libs/blob/develop/blocks/init/components/image/components/image-editor.js) component from the project's component folder. Note that in your project you'd just copy this component from the frontend-libs blocks (that is you'd copy the entire folder in your project as previously described).

Our service box editor component will have an `<ImageEditor />` component and two `<RichText />` components (which come from the core editor).

**service-box-options.js**

```js
import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';

export const ServiceBoxOptions = (props) => {
  const {
    attributes: {
      mediaUrl,
    },
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Service Box Details', 'infinum')}>

      <ImageOptionsComponent
        url={mediaUrl}
        onChangeMedia={onChangeMedia}
      />

    </PanelBody>
  );
};
```

The options component (the one shown on the right side in the editor screen), will only contain the `<ImageOptionsComponent />` so that we can upload image in our block.

### Editor render

Back to the block, we need to create the `edit` method functionality and the view that we'll render on the front.

**service-box.js**

```js
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { ServiceBoxEditor } from './components/service-box-editor';
import { ServiceBoxOptions } from './components/service-box-options';

export const ServiceBox = (props) => {

  const {
    attributes,
    setAttributes,
  } = props;

  const actions = {
    ...getActions(props, manifest),
    onChangeMedia: (value) => {
      setAttributes({
        mediaId: value.id,
        mediaUrl: value.url,
      });
    },
  };

  return (
    <Fragment>
      <InspectorControls>
        <ServiceBoxOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <ServiceBoxEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
```

Here we'll use our ready made component (built out of other components - reusability), and wrap it in [React Fragment](https://reactjs.org/docs/fragments.html). It is a pattern used so that we can return multiple elements.  
Another thing you'll note is the usage of `<InspectorControls />` [component](https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/inspector-controls). It is used to display settings of the block in the sidebar (in our case our options that contain the image upload component).  
Lastly, both our `<ServiceBoxEditor />` and `<InspectorControls />` are wrapped in the `<Fragment />` wrapper.

### PHP view

So all we need now is the PHP view.

**service-box.php**

```php
<?php
/**
 * Template for the Service Box Block.
 *
 * @since 1.0.0
 * @package Eightshift\Blocks.
 */

namespace Infinum\Blocks;

$title    = $attributes['title'] ?? '';
$content  = $attributes['content'] ?? '';
$media_id = $attributes['mediaId'] ?? '';
$block_class      = $attributes['blockClass'] ?? '';
$wrap_class       = '
  content-reveal
  js-content-reveal
';
$no_content_class = ( empty( $title ) && empty( $content ) ) ? "{$block_class}__image--no-content" : '';
$title_class      = "{$block_class}__title";
$content_class    = "
{$block_class}__content
";
$image_class      = "
  {$block_class}__image
  {$no_content_class}
";
?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <div class="<?php echo esc_attr( $wrap_class ); ?>">

    <?php if ( ! empty( $media_id ) ) { ?>
      <div class="<?php echo esc_attr( $image_class ); ?>">
        <?php $this->render_block_view(
          '/components/image/image.php',
          [
            'blockClass' => $attributes['blockClass'] ?? '',
            'id' => $media_id,
            'size' => $attributes['mediaSize'] ?? 'large',
          ]
        );
        ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $title ) ) { ?>
      <div class="<?php echo esc_attr( $title_class ); ?>">
        <?php echo wp_kses_post( $title ); ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $content ) ) { ?>
      <div class="<?php echo esc_attr( $content_class ); ?>">
        <?php echo wp_kses_post( $content ); ?>
      </div>
    <?php } ?>
  </div>
</div>
```

Notice how we used 

```php
<?php $this->render_block_view(
  '/components/image/image.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'id' => $media_id,
    'size' => $attributes['mediaSize'] ?? 'large',
  ]
);
?>
```

To render out our `image` component. Again, we're showing the power of reusability here. 

### Styling

You can style them how you want, but we added some default styles

**service-box-style.scss**

```scss
$block-service-box: (
  title: (
    mobile: (
      font-size: 24px,
      line-height: 1.33,
      font-family: $secondary-font-family,
    ),
  ),
  content: (
    mobile: (
      font-size: 18px,
      line-height: 1.5,
    ),
  ),
);

.block-service-box {
  &__image {
    margin-bottom: 25px;
    display: none;

    @include media(mobile up) {
      display: block;
    }

    &--no-content {
      margin-bottom: 0;
    }
  }

  &__title {
    @include responsive($block-service-box, title);
    font-weight: bold;
  }

  &__content {
    @include responsive($block-service-box, content);
    margin-top: 12px;
  }
}
```
