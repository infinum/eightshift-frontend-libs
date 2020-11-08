<?php

/**
 * Layout component
 *
 * @package Solplanet
 */

use SolplanetVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'layout';
$selectorClass = $attributes['selectorClass'] ?? '';

$hideDivider = $attributes['hideDivider'] ?? false;

$sidebar   = ! empty($attributes['sidebar']) ? Components::ensureString($attributes['sidebar']) : '';
$main   = ! empty($attributes['main']) ? Components::ensureString($attributes['main']) : '';

$layoutClass = Components::classnames([
	$componentClass,
	$selectorClass,
	$hideDivider ? "{$componentClass}--hide-divider" : '',
]);

$sidebarClass = Components::classnames([
	"{$componentClass}__sidebar",
	"{$selectorClass}__sidebar",
]);

$mainClass = Components::classnames([
	"{$componentClass}__main",
	"{$selectorClass}__main",
]);

$mainInnerClass = Components::classnames([
	"{$componentClass}__main-inner",
	"{$selectorClass}__main-inner",
]);

?>

<div class="<?php echo \esc_attr($layoutClass); ?>">
	<div class="<?php echo \esc_attr($sidebarClass); ?>">
		<?php echo wp_kses_post($sidebar); ?>
	</div>
	<div class="<?php echo \esc_attr($mainClass); ?>">
		<div class="<?php echo \esc_attr($mainInnerClass); ?>">
			<?php echo wp_kses_post($main); ?>
		</div>
	</div>
</div>
