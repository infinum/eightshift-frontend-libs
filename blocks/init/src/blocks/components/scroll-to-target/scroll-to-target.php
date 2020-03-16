<?php
/**
 * Template for the Scroll To Target Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$scroll_target = $attributes['scrollTarget'] ?? '';
$scroll_text   = $attributes['scrollText'] ?? '';
?>

<a href='<?php echo esc_attr( "#{$scroll_target}" ); ?>' class='js-scroll-to-target scroll-to-target'>
  <?php echo esc_html( $scroll_text ); ?>
</a>
