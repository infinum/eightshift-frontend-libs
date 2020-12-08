<?php

/**
 * Template for the Paragraph Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$paragraphUse = Components::checkAttr('paragraphUse', $attributes, $manifest, $componentName);
if (!$paragraphUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$paragraphContent = Components::checkAttr('paragraphContent', $attributes, $manifest, $componentName);
$paragraphColor = Components::checkAttr('paragraphColor', $attributes, $manifest, $componentName);
$paragraphSize = Components::checkAttr('paragraphSize', $attributes, $manifest, $componentName);
$paragraphAlign = Components::checkAttr('paragraphAlign', $attributes, $manifest, $componentName);

$paragraphClass = Components::classnames([
	$componentClass,
	Components::selector($paragraphColor, $componentClass, 'color', $paragraphColor),
	Components::selector($paragraphSize, $componentClass, 'size', $paragraphSize),
	Components::selector($paragraphAlign, $componentClass, 'align', $paragraphAlign),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<p class="<?php echo \esc_attr($paragraphClass); ?>">
	<?php echo \wp_kses_post($paragraphContent); ?>
</p>
