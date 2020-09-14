<?php
/**
 * Template for the Quote Block.
 *
 * @package EightshiftBoilerplate
 */

$author  = $attributes['author'] ?? '';
$content = $attributes['content'] ?? '';


$blockClass = $attributes['blockClass'] ?? '';
?>

<div class="<?php echo esc_attr( $blockClass ); ?>">
  
  <?php if ( ! empty( $content ) ) { ?>
    <div class="<?php echo esc_attr( "{$blockClass}__content" ); ?>">
      <?php echo wp_kses_post( $content ); ?>
    </div>
  <?php } ?>

  <div class="<?php echo esc_attr( "{$blockClass}__clear" ); ?>"></div>
  <?php if ( ! empty( $author ) ) { ?>
    <div class="<?php echo esc_attr( "{$blockClass}__author" ); ?>">
      <?php echo wp_kses_post( $author ); ?>
    </div>
  <?php } ?>
</div>
