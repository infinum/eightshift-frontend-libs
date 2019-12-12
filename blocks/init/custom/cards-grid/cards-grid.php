<?php
/**
 * Template for the Cards Grid Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class = $attributes['blockClass'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <div class="<?php echo esc_attr( "{$block_class}__content" ); ?>">
    <?php echo wp_kses_post( $inner_block_content ); ?>
  </div>
</div>
