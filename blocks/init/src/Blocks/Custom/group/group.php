<?php
/**
 * Template for the Group block.
 *
 * @package EightshiftBoilerplate
 */

$block_class = $attributes['blockClass'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <?php echo wp_kses_post( $inner_block_content ); ?>
</div>
