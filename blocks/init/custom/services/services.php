<?php
/**
 * Template for the Services Block.
 *
 * @since 1.0.0
 * @package Infinum\Blocks.
 */

namespace Infinum\Blocks;

$block_class     = $attributes['blockClass'] ?? '';
$block_js_class  = $attributes['blockJsClass'] ?? '';
$title           = $attributes['title'] ?? '';
$number          = $attributes['number'] ?? '';

$component_class    = "{$block_class}";
$intro_class        = "{$block_class}__intro";
$intro_empty_class  = ( empty( $intro ) && empty( $title ) ) ? "{$block_class}__intro--empty" : '';
$title_class        = "{$block_class}__title";
$number_class       = "{$block_class}__number";
$content_class      = "{$block_class}__content";
$content_wrap_class = "{$block_class}__content-wrap";

?>

<div class="<?php echo esc_attr( $component_class ); ?>">
  <div class="<?php echo esc_attr( $intro_class ); ?> <?php echo esc_attr( $intro_empty_class ); ?>">

    <?php if ( ! empty( $number ) ) { ?>
      <div class="<?php echo esc_attr( $number_class ); ?>">
        <?php echo esc_html( $number ); ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $title ) ) { ?>
      <div class="<?php echo esc_attr( $title_class ); ?>">
        <?php echo wp_kses_post( $title ); ?>
      </div>
    <?php } ?>
  </div>

  <div class="<?php echo esc_attr( $content_class ); ?>">
    <div class="<?php echo esc_attr( $content_wrap_class ); ?>">
      <?php echo wp_kses_post( $inner_block_content ); ?>
    </div>
  </div>
</div>
