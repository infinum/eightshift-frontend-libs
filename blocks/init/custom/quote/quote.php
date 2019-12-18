<?php
/**
 * Template for the Quote Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$author   = $attributes['author'] ?? '';
$content = $attributes['content'] ?? '';


$block_class   = $attributes['blockClass'] ?? '';
?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  
  <?php if ( ! empty( $content ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__content" ); ?>">
      <?php echo wp_kses_post( $content ); ?>
    </div>
  <?php } ?>

  <div class="<?php echo esc_attr( "{$block_class}__clear" ); ?>"></div>
  <?php if ( ! empty( $author ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__author" ); ?>">
      <?php echo wp_kses_post( $author ); ?>
    </div>
  <?php } ?>
</div>
