<?php

/**
 * Template for the Video Iframe Component.
 *
 * @package EightshiftBoilerplates
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? '';
$video = $attributes['video'] ?? [];
$id = $video['id'] ?? '';
$aspectRatio = $video['aspectRatio'] ?? 'default';
$type = $video['type'] ?? 'youtube';

if (!$id) {
	return;
}

switch ($type) {
	case 'vimeo':
		$url = "https://player.vimeo.com/video/{$id}?enablejsapi=1";
		break;
	default:
		$url = "https://www.youtube-nocookie.com/embed/{$id}?enablejsapi=1";
		break;
}

$componentClass = 'video-iframe';

$videoClass = Components::classnames(
	[
	$componentClass,
	"{$componentClass}__video-ratio--{$aspectRatio}",
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
	]
);

?>

<div class="<?php echo \esc_attr($videoClass); ?>">
	<iframe
	class="<?php echo \esc_attr("{$componentClass}__iframe"); ?>"
	src="<?php echo \esc_url($url); ?>"
	frameBorder="0"
	allow="autoplay; fullscreen"
	allowFullScreen
	></iframe>
</div>
