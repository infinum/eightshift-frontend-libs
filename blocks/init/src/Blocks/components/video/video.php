<?php

/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$videoUse = Components::checkAttr('videoUse', $attributes, $manifest);

if (!$videoUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$videoUrl = Components::checkAttr('videoUrl', $attributes, $manifest);
$videoPoster = Components::checkAttr('videoPoster', $attributes, $manifest);
$videoLoop = Components::checkAttr('videoLoop', $attributes, $manifest);
$videoAutoplay = Components::checkAttr('videoAutoplay', $attributes, $manifest);
$videoControls = Components::checkAttr('videoControls', $attributes, $manifest);
$videoMuted = Components::checkAttr('videoMuted', $attributes, $manifest);
$videoPreload = Components::checkAttr('videoPreload', $attributes, $manifest);

$videoClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
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
	<?php
	if (!is_iterable($videoUrl)) {
		return;
	}

	foreach ($videoUrl as $item) { ?>
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
