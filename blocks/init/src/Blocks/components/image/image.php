<?php

/**
 * Template for the Image Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$media = $attributes['media'] ?? [];
$use = $media['use'] ?? true;

if (! $media || !$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'image';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentBgClass = $attributes['componentClass'] ?? 'image-bg';
$selectorBgClass = $attributes['selectorClass'] ?? $componentBgClass;

$blockClass = $attributes['blockClass'] ?? '';
$bgImg = $media['bgImg'] ?? false;
$url = $media['url'] ?? '';
$size = $media['size'] ?? 'large';

$imageClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);

$imageBgClass = Components::classnames([
	$componentBgClass,
	$blockClass ? "{$blockClass}__{$selectorBgClass}" : '',
]);

if ($bgImg) { ?>
	<div style="background-image:url(<?php echo \esc_url($url); ?>)" class="<?php echo \esc_attr($imageBgClass); ?>" ></div>
<?php } else { ?>
		<img src="<?php echo \esc_url($url); ?>" class="<?php echo \esc_attr($imageClass); ?>" />
	<?php
}


