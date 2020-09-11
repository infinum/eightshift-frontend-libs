<?php
/**
 * Copyright component responsible for rendering site's copyright.
 *
 * @package EightshiftBoilerplate
 */

$block_class = $attributes['blockClass'] ?? 'copyright';
$by          = $attributes['by'] ?? 'Infinum';
$copy_year   = $attributes['year'] ?? gmdate( 'Y' );

?>
<div class="copyright">
  <?php printf( '%1$s %2$s %3$s', '&copy;', esc_html( $copy_year ), esc_html( $by ) ); ?>
</div>
