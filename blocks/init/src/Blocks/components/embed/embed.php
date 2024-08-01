<?php

/**
 * Template for the Embed Component.
 *
 * @package %g_namespace%
 */

 use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$embedUse = Helpers::checkAttr('embedUse', $attributes, $manifest);
if (!$embedUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$embedUrl = Helpers::checkAttr('embedUrl', $attributes, $manifest);
$embedTitle = Helpers::checkAttr('embedTitle', $attributes, $manifest);

$embedAutoplay = Helpers::checkAttr('embedAutoplay', $attributes, $manifest);
$embedEncryptedMedia = Helpers::checkAttr('embedEncryptedMedia', $attributes, $manifest);
$embedPictureInPicture = Helpers::checkAttr('embedPictureInPicture', $attributes, $manifest);
$embedAllowFullScreen = Helpers::checkAttr('embedAllowFullScreen', $attributes, $manifest);

$embedClass = Helpers::classnames([
	$componentClass,
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass, $additionalClass,
]);

$embedIframeClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass, "iframe"),
	Helpers::selector($blockClass, $blockClass, "{$selectorClass}-iframe"),
]);

$allow = Helpers::classnames([
	$embedAutoplay ? 'autoplay;' : '',
	$embedEncryptedMedia ? 'encrypted-media;' : '',
	$embedPictureInPicture ? 'picture-in-picture;' : '',
]);

$embedAllowFullScreen = $embedAllowFullScreen ? 'allowfullscreen' : '';
?>

<div class="<?php echo esc_attr($embedClass); ?>">
	<iframe
		class="<?php echo esc_attr($embedIframeClass); ?>"
		src="<?php echo esc_url($embedUrl); ?>"
		allow="<?php echo esc_attr($allow); ?>"
		title="<?php echo esc_attr($embedTitle); ?>"
		<?php echo esc_attr($embedAllowFullScreen); ?>
	>
	</iframe>
</div>
