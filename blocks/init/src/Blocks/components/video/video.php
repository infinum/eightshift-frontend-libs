<?php

/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplates
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'video';
$blockClass = $attributes['blockClass'] ?? '';

$video = $attributes['video'] ?? [];
$id = $video['id'] ?? '';
$aspectRatio = $video['aspectRatio'] ?? 'default';
$type = $video['type'] ?? 'youtube';
$allow = $video['allow'] ?? 'autoplay; fullscreen';

switch ($type) {
	case 'vimeo':
		$url = "https://player.vimeo.com/video/{$id}?enablejsapi=1";
		break;
	default:
		$url = "https://www.youtube-nocookie.com/embed/{$id}?enablejsapi=1";
		break;
}

$videoClass = Components::classnames([
	$componentClass,
	$aspectRatio ? "{$componentClass}__video-ratio--{$aspectRatio}" : '',
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<div class="<?php echo \esc_attr($videoClass); ?>">
	<iframe
	class="<?php echo \esc_attr("{$componentClass}__iframe"); ?>"
	src="<?php echo \esc_url($url); ?>"
	frameBorder="0"
	allow="<?php echo \esc_attr($allow); ?>"
	allowFullScreen
	></iframe>
</div>
