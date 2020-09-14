<?php
/**
 * Template for the Scroll To Target Component.
 *
 * @package EightshiftBoilerplate
 */

$scrollTarget = $attributes['scrollTarget'] ?? '';
$scrollText   = $attributes['scrollText'] ?? '';
?>

<a href='<?php echo esc_attr( "#{$scrollTarget}" ); ?>' class='js-scroll-to-target scroll-to-target'>
  <?php echo esc_html( $scrollText ); ?>
</a>
