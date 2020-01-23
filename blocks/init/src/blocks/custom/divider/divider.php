<?php
/**
 * Template for the Divider Block view.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class = $attributes['blockClass'] ?? '';
$color       = $attributes['color'] ?? '';
?>

<div class="<?php echo esc_attr( "{$block_class} {$block_class}__color--{$color}" ); ?>"></div>
