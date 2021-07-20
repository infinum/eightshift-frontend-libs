<?php

/**
 * Template for the Image Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$imageUse = Components::checkAttr('imageUse', $attributes, $manifest);
if (!$imageUse) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$imageAlt = Components::checkAttr('imageAlt', $attributes, $manifest);
$imageUrl = Components::checkAttrResponsive('imageUrl', $attributes, $manifest);

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

<?php if (isset($imageUrl['large']) && $imageUrl['large']) { ?>
	<picture class="<?php echo \esc_attr($pictureClass); ?>" data-id="<?php echo esc_attr($unique); ?>">

		<?php echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

		<?php foreach (array_reverse($imageUrl) as $brakepoint => $item) { ?>
			<?php
			if ($brakepoint === 'large') {
				continue;
			}
			if (!$item) {
				continue;
			}

			$brakepointValue = $globalManifest['globalVariables']['breakpoints'][$brakepoint] ?? '';

			if (!$brakepointValue) {
				continue;
			}

			echo '<source srcset="' . \esc_url($item) . '" media="(max-width: ' . esc_attr($brakepointValue) . 'px)" />'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		<?php } ?>

		<img src="<?php echo \esc_url($imageUrl['large']); ?>" class="<?php echo \esc_attr($imgClass); ?>" />
	</picture>
<?php } ?>
