<?php

/**
 * Template for the Carousel Navigation Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$defaults = $manifest['attributes'];

$componentClass = $attributes['componentClass'] ?? 'carousel-navigation';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$jsPrevClass = $attributes['jsPrevClass'] ?? '';
$jsNextClass = $attributes['jsNextClass'] ?? '';

$navigationClass = Components::classnames([
	"{$componentClass}",
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);

$prevClass = Components::classnames([
	"{$componentClass}__item",
	"{$componentClass}__item--prev",
	$jsPrevClass,
]);

$nextClass = Components::classnames([
	"{$componentClass}__item",
	"{$componentClass}__item--next",
	$jsNextClass
]);

$iconClass = Components::classnames([
	"{$componentClass}__icon",
]);
?>

<div class="<?php echo esc_attr($navigationClass); ?>">
	<div class="<?php echo esc_attr($prevClass); ?>">
		<svg class="<?php echo esc_attr($iconClass); ?>" width="22" height="40" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode:multiply" stroke="#FFF" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M1 20L21 1M21 39L1 20"/></g></svg>
	</div>
	<div class="<?php echo esc_attr($nextClass); ?>">
		<svg class="<?php echo esc_attr($iconClass); ?>" width="22" height="40" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode:multiply" stroke="#FFF" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M21 20L1 1M1 39l20-19"/></g></svg>
	</div>
</div>
