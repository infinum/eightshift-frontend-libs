<?php
/**
 * Template for the Service Box Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$head   = $attributes['head'] ?? '';
$content = $attributes['content'] ?? '';

$id              = $attributes['id'] ?? '';
$block_class     = $attributes['blockClass'] ?? '';
$block_js_class  = $attributes['blockJsClass'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <?php if ( ! empty( $head ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__head {$block_js_class}-head" ); ?>" data-head="<?php echo esc_attr( $id ); ?>">
      <?php echo wp_kses_post( $head ); ?>
    </div>
  <?php } ?>

  <?php if ( ! empty( $content ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__content {$block_js_class}-content" ); ?>" data-content="<?php echo esc_attr( $id ); ?>">
      <div class="<?php echo esc_attr( "{$block_class}__content-inner" ); ?>">
        <?php echo wp_kses_post( $content ); ?>
      </div>
    </div>
  <?php } ?>
</div>
