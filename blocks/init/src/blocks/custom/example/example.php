<?php
/**
 * Template for the Example Block view.
 *
 * @package EightshiftBoilerplate
 */

$block_class = $attributes['blockClass'] ?? '';
$content     = $attributes['content'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <?php echo wp_kses_post( $content ); ?>
</div>
