<?php

/**
 * Template for the Image Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$globalManifest = Helpers::getSettings();
$manifest = Helpers::getManifestByDir(__DIR__);

$imageUse = Helpers::checkAttr('imageUse', $attributes, $manifest) ?? false;
$imageUrl = Helpers::checkAttrResponsive('imageUrl', $attributes, $manifest);

if (!$imageUse || !isset($imageUrl['large']) || empty($imageUrl['large'])) {
	return;
}

$unique = Helpers::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$imageAlt = Helpers::checkAttr('imageAlt', $attributes, $manifest) ?? '';

$pictureClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$imgClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass, 'img'),
	Helpers::selector($blockClass, $blockClass, "{$selectorClass}-img"),
]);
?>

<picture class="<?php echo esc_attr($pictureClass); ?>" data-id="<?php echo esc_attr($unique); ?>">

	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique);
	?>

	<?php foreach (array_reverse($imageUrl) as $breakpoint => $item) { ?>
		<?php
		if ($breakpoint === 'large') {
			continue;
		}
		if (!$item) {
			continue;
		}

		$breakpointValue = $globalManifest['globalVariables']['breakpoints'][$breakpoint] ?? ''; // @phpstan-ignore-line

		if (!$breakpointValue) {
			continue;
		}

		// phpcs:ignore Eightshift.Security.EscapeOutput.OutputNotEscaped
		echo '<source srcset="' . esc_url($item) . '" media="(max-width: ' . esc_attr($breakpointValue) . 'px)" />';
		?>
	<?php } ?>

	<img
		src="<?php echo esc_url($imageUrl['large']); ?>"
		alt="<?php echo esc_attr($imageAlt); ?>"
		class="<?php echo esc_attr($imgClass); ?>"
	/>
</picture>
