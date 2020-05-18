<?php
/**
 * Template for the Columns Block.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Helpers\Components;

$block_class = $attributes['blockClass'] ?? '';

$component_class = Components::classnames([
  $block_class,
  $attributes['gutter'] ? Components::responsive_selectors($attributes['gutter'], 'gutter', $block_class) : '',
  $attributes['horizontalSpacing'] ? Components::responsive_selectors($attributes['horizontalSpacing'], 'horizontal-spacing', $block_class) : '',
]);
?>

<div class="<?php echo \esc_attr( $component_class ); ?>">
  <?php echo \wp_kses_post( $inner_block_content ); ?>
</div>
