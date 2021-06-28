<?php

/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\EightshiftLibs\Helpers\Components;

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
$videoPoster = Components::checkAttr('videoPoster', $attributes, $manifest, $componentName);
$videoLoop = Components::checkAttr('videoLoop', $attributes, $manifest, $componentName);
$videoAutoplay = Components::checkAttr('videoAutoplay', $attributes, $manifest, $componentName);
$videoControls = Components::checkAttr('videoControls', $attributes, $manifest, $componentName);
$videoMuted = Components::checkAttr('videoMuted', $attributes, $manifest, $componentName);
$videoPreload = Components::checkAttr('videoPreload', $attributes, $manifest, $componentName);

$videoClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$additionalAttributes = Components::classnames([
	$videoLoop ? 'loop' : '',
	$videoAutoplay ? 'autoplay playsinline' : '',
	$videoControls ? 'controls' : '',
	$videoMuted ? 'muted' : '',
]);

if (!$videoUrl) {
	return;
}

?>

<video
	class="<?php echo \esc_attr($videoClass); ?>"
	<?php echo \esc_attr($additionalAttributes); ?>
	preload="<?php echo \esc_attr($videoPreload); ?>"
	poster="<?php echo \esc_attr($videoPoster); ?>"
>
	<?php foreach ($videoUrl as $item) { ?>
		<?php
		$url = $item['url'] ?? '';
		$mime = $item['mime'] ?? '';

		if (!$url) {
			continue;
		}
		?>
		<source src="<?php echo esc_url($url); ?>" type="<?php echo esc_attr($mime); ?>" />
	<?php } ?>
</video>
