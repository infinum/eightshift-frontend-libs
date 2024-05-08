<?php

/**
 * Template for the Video Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$videoUse = Helpers::checkAttr('videoUse', $attributes, $manifest);

if (!$videoUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$videoUrl = (array) Helpers::checkAttr('videoUrl', $attributes, $manifest) ?? []; // @phpstan-ignore-line
$videoPoster = Helpers::checkAttr('videoPoster', $attributes, $manifest);
$videoLoop = Helpers::checkAttr('videoLoop', $attributes, $manifest);
$videoAutoplay = Helpers::checkAttr('videoAutoplay', $attributes, $manifest);
$videoControls = Helpers::checkAttr('videoControls', $attributes, $manifest);
$videoMuted = Helpers::checkAttr('videoMuted', $attributes, $manifest);
$videoPreload = Helpers::checkAttr('videoPreload', $attributes, $manifest);
$videoSubtitleTracks = Helpers::checkAttr('videoSubtitleTracks', $attributes, $manifest) ?? [];

$videoClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$additionalAttributes = Helpers::classnames([
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
