<?php

/**
 * Template for the Lists Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$listsUse = Components::checkAttr('listsUse', $attributes, $manifest, $componentName);
if (!$listsUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$listsContent = Components::checkAttr('listsContent', $attributes, $manifest, $componentName);
$listsOrdered = Components::checkAttr('listsOrdered', $attributes, $manifest, $componentName);
$listsColor = Components::checkAttr('listsColor', $attributes, $manifest, $componentName);
$listsSize = Components::checkAttr('listsSize', $attributes, $manifest, $componentName);
$listsAlign = Components::checkAttr('listsAlign', $attributes, $manifest, $componentName);

$listsClass = Components::classnames([
	$componentClass,
	Components::selector($listsColor, $componentClass, 'color', $listsColor),
	Components::selector($listsSize, $componentClass, 'size', $listsSize),
	Components::selector($listsAlign, $componentClass, 'align', $listsAlign),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<<?php echo esc_attr($listsOrdered); ?> class="<?php echo esc_attr($listsClass); ?>">
	<?php echo wp_kses_post($listsContent); ?>
</<?php echo esc_attr($listsOrdered); ?>>
