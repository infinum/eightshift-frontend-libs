<?php

/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$videoUse = Components::checkAttr('videoUse', $attributes, $manifest);

if (!$videoUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$videoUrl = (array) Components::checkAttr('videoUrl', $attributes, $manifest) ?? []; // @phpstan-ignore-line
$videoPoster = Components::checkAttr('videoPoster', $attributes, $manifest);
$videoLoop = Components::checkAttr('videoLoop', $attributes, $manifest);
$videoAutoplay = Components::checkAttr('videoAutoplay', $attributes, $manifest);
$videoControls = Components::checkAttr('videoControls', $attributes, $manifest);
$videoMuted = Components::checkAttr('videoMuted', $attributes, $manifest);
$videoPreload = Components::checkAttr('videoPreload', $attributes, $manifest);
$videoSubtitleTracks = Components::checkAttr('videoSubtitleTracks', $attributes, $manifest) ?? [];

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
	class="<?php echo esc_attr($videoClass); ?>"
	<?php echo esc_attr($additionalAttributes); ?>
	preload="<?php echo esc_attr($videoPreload); ?>"
	poster="<?php echo esc_attr($videoPoster); ?>"
	<?php if ($videoPoster) { ?>
		poster="<?php echo esc_attr($videoPoster); ?>"
	<?php } ?>
>
	<?php
	if (!is_iterable($videoUrl)) {
		return;
	}

	foreach ($videoUrl as $item) { ?>
		<?php
		$url = $item['url'] ?? '';
		$mime = $item['mime'] ?? '';

		if ($url && $mime) { ?>
			<source src="<?php echo esc_url($url); ?>" type="<?php echo esc_attr($mime); ?>" />
		<?php } ?>
	<?php } ?>

	<?php foreach ($videoSubtitleTracks as $track) {
		if (!($track['src'] ?? '') || !($track['kind'] ?? '') || !($track['label'])) {
			continue;
		}
		?>

		<track
			src="<?php echo esc_url($track['src']); ?>"
			kind="<?php echo esc_attr($track['kind']); ?>"
			label="<?php echo esc_attr($track['label']); ?>"
			<?php if ($track['srclang']) { ?>
				srclang="<?php echo esc_attr($track['srclang']); ?>"
			<?php } ?>
		>
	<?php } ?>
</video>
