<?php

/**
 * Template for the Divider Block view.
 *
 * @package EightshiftBoilerplate
 */

$blockClass = $attributes['blockClass'] ?? '';
$color      = $attributes['color'] ?? '';
?>

<div class="<?php echo esc_attr("{$blockClass} {$blockClass}__color--{$color}"); ?>"></div>
