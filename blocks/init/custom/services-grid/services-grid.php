<?php
/**
 * Template for the Services Grid Block.
 *
 * @since 1.0.0
 * @package Infinum\Blocks.
 */

namespace Infinum\Blocks;

$block_class = $attributes['blockClass'] ?? '';

$content_class = "{$block_class}__content";
?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <div class="<?php echo esc_attr( $content_class ); ?>">
    <?php echo wp_kses_post( $inner_block_content ); ?>
  </div>
</div>
