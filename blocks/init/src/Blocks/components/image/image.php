<?php

/**
 * Template for the Image Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$imageUse = Components::checkAttr('imageUse', $attributes, $manifest, $componentName);
if (!$imageUse) {
	return;
}

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$imageAlt = Components::checkAttr('imageAlt', $attributes, $manifest, $componentName);

$imageUrl = Components::checkAttrResponsive('imageUrl', $attributes, $manifest, $componentName);

$pictureClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$imgClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'img'),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-img"),
]);

?>

<?php if (isset($imageUrl['large']) && $imageUrl['large']) { ?>
	<picture class="<?php echo \esc_attr($pictureClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
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

			echo '<source srcset="' . \esc_url($item['url']) . '" media="(max-width: ' . esc_attr($brakepointValue) . 'px)" />'; // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
			?>
		<?php } ?>

		<img src="<?php echo \esc_url($imageUrl['large']['url']); ?>" class="<?php echo \esc_attr($imgClass); ?>" />
	</picture>
<?php } ?>
