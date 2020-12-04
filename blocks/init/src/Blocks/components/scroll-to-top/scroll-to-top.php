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


$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$scrollToTopContent = Components::checkAttr('scrollToTopContent', $attributes, $manifest);

$scrollClass = Components::classnames([
	$componentClass,
	Components::selectorCustom($componentClass, "js-{$componentClass}"),
	Components::selectorBlock($blockClass, $selectorClass),
]);

?>

<button class="<?php echo \esc_attr($scrollClass); ?>">
	<?php echo \esc_html($scrollToTopContent); ?>
</button>
