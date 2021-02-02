<?php

/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$videoUse = Components::checkAttr('videoUse', $attributes, $manifest, $componentName);
if (!$videoUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$videoUrl = Components::checkAttr('videoUrl', $attributes, $manifest, $componentName);
$videoType = Components::checkAttr('videoType', $attributes, $manifest, $componentName);
$videoAspectRatio = Components::checkAttr('videoAspectRatio', $attributes, $manifest, $componentName);
$videoAllow = Components::checkAttr('videoAllow', $attributes, $manifest, $componentName);
$videoAccept = Components::checkAttr('videoAccept', $attributes, $manifest, $componentName);
$videoAllowedTypes = Components::checkAttr('videoAllowedTypes', $attributes, $manifest, $componentName);
$videoUsePlaceholder = Components::checkAttr('videoUsePlaceholder', $attributes, $manifest, $componentName);

$videoWrapClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'wrap'),
	Components::selector($videoAspectRatio, $componentClass, 'ratio', $videoAspectRatio),
	Components::selector($videoType, $componentClass, 'ratio', $videoType),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-wrap"),
]);

$videoClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$localUrl = '';

switch ($videoType) {
	case 'vimeo':
		$localUrl = "https://player.vimeo.com/video/{$videoUrl}";
		break;
	case 'youtube':
		$localUrl = "https://www.youtube-nocookie.com/embed/{$videoUrl}";
		break;
	default:
		$localUrl = $videoUrl;
		break;
}

?>

<div class="<?php echo \esc_attr($videoWrapClass); ?>">
	<?php if ($videoType === 'local') { ?>
		<video class="<?php echo \esc_attr($videoClass); ?>" muted>
			<source src="<?php echo \esc_url($localUrl); ?>" type="video/mp4" />
		</video>
	<?php } else { ?>
		<iframe
		class="<?php echo \esc_attr($videoClass); ?>"
		src="<?php echo \esc_url($localUrl); ?>"
		allow="<?php echo \esc_attr($videoAllow); ?>"
		allowFullScreen
		></iframe>
	<?php } ?>
</div>
