<?php
/**
 * Template for the Column Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Helpers\Components;

$block_class = $attributes['blockClass'] ?? '';

$component_class = Components::classnames([
  $block_class,
  $attributes['width'] ? Components::responsive_selectors($attributes['width'], 'width', $block_class) : '',
  $attributes['offset'] ? Components::responsive_selectors($attributes['offset'], 'offset', $block_class) : '',
  $attributes['hide'] ? Components::responsive_selectors($attributes['hide'], 'hide', $block_class, false) : '',
]);
?>

<div class="<?php echo \esc_attr( $component_class ); ?>">
  <?php echo \wp_kses_post( $inner_block_content ); ?>
</div>
