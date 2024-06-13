<?php

/**
 * Template for the Embed Component.
 *
 * @package %g_namespace%
 */

 use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifest(__DIR__);

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
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
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

/**
 * YouTube provider
 *
 * The link
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * will be transformed to
 *   https://www.youtube.com/embed/dQw4w9WgXcQ .
 */
if (strpos($embedUrl, 'https://www.youtube.com/watch?v=') !== false) {
	$embedUrl = str_replace('watch?v=', 'embed/', $embedUrl);
}

/**
 * Vimeo provider
 *
 * The link
 *   https://vimeo.com/642263700
 * will be transformed to
 *   https://player.vimeo.com/video/642263700 .
 */
if (strpos($embedUrl, 'https://vimeo.com') !== false) {
	preg_match_all('/https:\/\/vimeo\.com\/(\d+)/', $embedUrl, $matches);

	$videoId = $matches[1][0] ?? '';
	$embedUrl = "https://player.vimeo.com/video/{$videoId}";
}

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
