<?php

/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplate
 */

$media = $attributes['media'] ?? [];

if (! $media) {
	return;
}

$url = $media['url'] ?? '';

if (! $url) {
	return;
}

$blockClass = $attributes['blockClass'] ?? '';

?>

<video
	src="<?php echo esc_url($url); ?>"
	class="<?php echo esc_attr("video {$blockClass}__video"); ?>"
	autoplay
	loop
	muted
	playsinline
	preload="metadata">
</video>
