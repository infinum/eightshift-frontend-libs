<?php

/**
 * Template for the Image Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getSettings();
$manifest = Components::getManifestByDir(__DIR__);

$imageUse = Components::checkAttr('imageUse', $attributes, $manifest) ?? false;
$imageUrl = Components::checkAttrResponsive('imageUrl', $attributes, $manifest);

if (!$imageUse || !isset($imageUrl['large']) || empty($imageUrl['large'])) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$imageAlt = Components::checkAttr('imageAlt', $attributes, $manifest) ?? '';

$pictureClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$imgClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'img'),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-img"),
]);
?>

<picture class="<?php echo esc_attr($pictureClass); ?>" data-id="<?php echo esc_attr($unique); ?>">

	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique);
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
