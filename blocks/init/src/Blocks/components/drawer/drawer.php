<?php

/**
 * Mobile menu as drawer
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'drawer';
$blockClass = $attributes['blockClass'] ?? '';
$drawerPosition = $attributes['drawerPosition'] ?? 'left';
$menu = $attributes['menu'] ?? '';
$trigger = $attributes['trigger'] ?? '';
$overlay = $attributes['overlay'] ?? '';

$drawerClass = Components::classnames([
	$componentClass,
	"js-{$componentClass}",
	"{$componentClass}--{$drawerPosition}",
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>
<div
	class="<?php echo \esc_attr($drawerClass); ?>"
	data-trigger="<?php echo \esc_attr($trigger); ?>"
	data-overlay="<?php echo \esc_attr($overlay); ?>"
>
	<?php echo \wp_kses_post($menu); ?>
</div>
