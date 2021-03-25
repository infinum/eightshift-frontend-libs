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

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$imageAlt = Components::checkAttr('imageAlt', $attributes, $manifest, $componentName);
$imageFull = Components::checkAttr('imageFull', $attributes, $manifest, $componentName);
$imageZoom = Components::checkAttr('imageZoom', $attributes, $manifest, $componentName);

$imageUrl = [
	'default' => Components::checkAttr('imageUrl', $attributes, $manifest),
	'desktop' => Components::checkAttr('imageUrlDesktop', $attributes, $manifest),
	'tablet' => Components::checkAttr('imageUrlTablet', $attributes, $manifest),
	'mobile' => Components::checkAttr('imageUrlMobile', $attributes, $manifest),
];

$pictureClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($imageFull, $componentClass, '', 'full'),
	Components::selector($imageZoom, $componentClass, '', 'zoom'),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-picture"),
]);

$imgClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'img'),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-img"),
]);

?>

<?php if (isset($imageUrl['default']) && $imageUrl['default']) { ?>
	<picture class="<?php echo \esc_attr($pictureClass); ?>">
		<?php foreach (array_reverse($imageUrl) as $brakepoint => $item) { ?>
			<?php
			if ($brakepoint === 'default') {
				continue;
			}
			if (!$item) {
				continue;
			}

			$brakepointValue = $globalManifest['globalVariables']['breakpoints'][$brakepoint] ?? '';

			if (!$brakepointValue) {
				continue;
			}

			echo '<source srcset="' . \esc_url($item['url']) . '" media="(max-width: ' . esc_attr($brakepointValue) . 'px)" />';
			?>
		<?php } ?>

		<img src="<?php echo \esc_url($imageUrl['default']['url']); ?>" class="<?php echo \esc_attr($imgClass); ?>" />
	</picture>
<?php } ?>
