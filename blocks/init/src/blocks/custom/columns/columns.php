<?php
/**
 * Template for the Columns Block.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Helpers\Components;

$block_class       = $attributes['blockClass'] ?? '';

$component_class = Components::classnames([
  $block_class,
  $attributes['gutterVertical'] ? Components::responsive_selectors($attributes['gutterVertical'], 'gutter-vertical', $block_class) : '',
  $attributes['gutterHorizontal'] ? Components::responsive_selectors($attributes['gutterHorizontal'], 'gutter-horizontal', $block_class) : '',
]);
?>

<div class="<?php echo \esc_attr( $component_class ); ?>">
  <?php echo \wp_kses_post( $inner_block_content ); ?>
</div>
