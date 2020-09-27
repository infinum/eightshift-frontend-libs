<?php

/**
 * Copyright component responsible for rendering site's copyright.
 *
 * @package EightshiftBoilerplate
 */

$blockClass = $attributes['blockClass'] ?? 'copyright';
$by         = $attributes['by'] ?? 'Infinum';
$copyYear   = $attributes['year'] ?? gmdate('Y');

?>
<div class="copyright">
  <?php printf('%1$s %2$s %3$s', '&copy;', esc_html($copyYear), esc_html($by)); ?>
</div>
