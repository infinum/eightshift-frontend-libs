<?php

/**
 * Template for the Carousel Navigation Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'carousel-navigation';
$blockClass = $attributes['blockClass'] ?? '';
$prevClass = $attributes['prevClass'] ?? '';
$nextClass = $attributes['nextClass'] ?? '';

$arrowPrevClass = Components::classnames([
	"{$componentClass}__arrow-item",
	"{$componentClass}__arrow-item--prev",
	$blockClass ? "{$blockClass}__navigation-arrow-item" : '',
	$blockClass ? "{$blockClass}__navigation-arrow-item--prev" : '',
	$prevClass,
]);

$arrowNextClass = Components::classnames([
	"{$componentClass}__arrow-item",
	"{$componentClass}__arrow-item--next",
	$blockClass ? "{$blockClass}__navigation-arrow-item" : '',
	$blockClass ? "{$blockClass}__navigation-arrow-item--next" : '',
	$nextClass
]);

$arrowIconClass = Components::classnames([
	"{$componentClass}__arrow-icon",
	$blockClass ? "{$blockClass}__navigation-arrow-icon" : '',
]);
?>

<div class="<?php echo esc_attr($arrowPrevClass); ?>">
	<svg class="<?php echo esc_attr($arrowIconClass); ?>" width="22" height="40" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode:multiply" stroke="#FFF" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M1 20L21 1M21 39L1 20"/></g></svg>
</div>
<div class="<?php echo esc_attr($arrowNextClass); ?>">
	<svg class="<?php echo esc_attr($arrowIconClass); ?>" width="22" height="40" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode:multiply" stroke="#FFF" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M21 20L1 1M1 39l20-19"/></g></svg>
</div>
