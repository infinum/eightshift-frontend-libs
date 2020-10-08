<?php

/**
 * Template for the Image Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'image';
$componentBgClass = $attributes['componentClass'] ?? 'image-bg';
$blockClass = $attributes['blockClass'] ?? '';

$media = $attributes['media'] ?? [];
$bgImg = $attributes['bgImg'] ?? false;

$id = $media['id'] ?? '';
$url = $media['url'] ?? '';
$size = $media['size'] ?? 'large';

if (! $media) {
	return;
}

$imageClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

$imageBgClass = Components::classnames([
	$componentBgClass,
	$blockClass ? "{$blockClass}__{$componentBgClass}" : '',
]);

if (empty($url)) {
	$media = \wp_get_attachment_image_src(
		$id,
		$size
	);
	
	$image = $media[0] ?? '';
} else {
	$image = $url;
}

if (!$image) {
	return;
}

if (! $bgImg) { ?>
	<img src="<?php echo esc_url($image); ?>" class="<?php echo esc_attr($imageClass); ?>" />
<?php } else { ?>
	<div style="background-image:url(<?php echo esc_url($image); ?>)" class="<?php echo esc_attr($imageBgClass); ?>" ></div>
	<?php
}


