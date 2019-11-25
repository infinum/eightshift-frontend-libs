<?php
/**
 * Template for the Accordion Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class    = $attributes['blockClass'] ?? '';
$block_js_class = $attributes['blockJsClass'] ?? '';

$component_class  = "
  {$block_class}
  {$block_js_class}
";

?>

<div class="<?php echo esc_attr( $component_class ); ?>">
  <?php echo wp_kses_post( $inner_block_content ); ?>
</div>
