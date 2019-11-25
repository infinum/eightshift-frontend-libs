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

$author_class  = "{$block_class}__author";
$content_class = "{$block_class}__content";

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  
  <?php if ( ! empty( $content ) ) { ?>
    <div class="<?php echo esc_attr( $content_class ); ?>">
      <?php echo wp_kses_post( $content ); ?>
    </div>
  <?php } ?>

  <?php if ( ! empty( $author ) ) { ?>
    <div class="<?php echo esc_attr( $author_class ); ?>">
      <?php echo wp_kses_post( $author ); ?>
    </div>
  <?php } ?>
</div>
