# PHP Render Block View Helper

Locate and return template part with passed attributes for a block.

Helper is located in the [eightshift-libs](https://github.com/infinum/eightshift-libs/blob/935e7bc777094d7518950316a45061f7675cf7ed/src/blocks/class-blocks.php#L295) library.

### Usage

Inside your block view PHP file you'd write:

```php
use Eightshift_Blocks\Helpers\Block_View_Helper;

Block_View_Helper::render_block_view(
  '/components/paragraph/paragraph.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'content'    => $attributes['content'] ?? '',
    'styleAlign' => $attributes['styleAlign'] ?? '',
    'styleColor' => $attributes['styleColor'] ?? '',
  ]
);
```

In the case you are using libs with dependency injection container, this should be handled by the library. 
