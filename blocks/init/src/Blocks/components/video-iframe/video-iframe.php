<?php

/**
 * Template for the Video Iframe Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$url         = $attributes['url'] ?? '';
$id          = $attributes['id'] ?? '';
$blockClass  = $attributes['blockClass'] ?? '';
$aspectRatio = $attributes['aspectRatio'] ?? 'default';

if (empty($url) || empty($id)) {
	return;
}

$componentClass   = 'video-iframe';
$aspectRatioClass = isset($attributes['aspectRatio']) ? "{$componentClass}__video-ratio--{$attributes['aspectRatio']}" : '';

$videoClass = Components::classnames(
	[
	$componentClass,
	$aspectRatioClass,
	"{$blockClass}__{$componentClass}",
	]
);

?>

<div class="<?php echo esc_attr($videoClass); ?>">
  <iframe
	class="<?php echo esc_attr("{$componentClass}__iframe"); ?>"
	src="<?php echo esc_url($url); ?><?php echo esc_attr($id); ?>"
	frameBorder="0"
	allow="autoplay; fullscreen"
	allowFullScreen
  ></iframe>
</div>
