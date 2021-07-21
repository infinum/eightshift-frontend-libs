<?php

/**
 * Template for the Scroll To Top Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$scrollToTopUse = Components::checkAttr('scrollToTopUse', $attributes, $manifest);
if (!$scrollToTopUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$scrollToTopContent = Components::checkAttr('scrollToTopContent', $attributes, $manifest);

$scrollClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);

?>

<button class="<?php echo \esc_attr($scrollClass); ?>">
	<?php echo \esc_html($scrollToTopContent); ?>
</button>
