<?php
/**
 * Template for the Divider Block view.
 *
 * @package EightshiftBoilerplate
 */

$block_class = $attributes['blockClass'] ?? '';
$color       = $attributes['color'] ?? '';
?>

<div class="<?php echo esc_attr( "{$block_class} {$block_class}__color--{$color}" ); ?>"></div>
