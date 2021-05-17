<?php

/**
 * Template for the Scroll To Top Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$scrollToTopUse = Components::checkAttr('scrollToTopUse', $attributes, $manifest, $componentName);
if (!$scrollToTopUse) {
	return;
}


$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$componentJsClass = $attributes['componentJsClass'] ?? $manifest['componentJsClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$scrollToTopContent = Components::checkAttr('scrollToTopContent', $attributes, $manifest, $componentName);

$scrollClass = Components::classnames([
	$componentClass,
	$componentJsClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<button class="<?php echo \esc_attr($scrollClass); ?>">
	<?php echo \esc_html($scrollToTopContent); ?>
</button>
