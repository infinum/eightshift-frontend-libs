<?php

/**
 * Mobile menu as drawer
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$drawerUse = Components::checkAttr('drawerUse', $attributes, $manifest);
if (!$drawerUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$drawerMenu = Components::checkAttr('drawerMenu', $attributes, $manifest);
$drawerTrigger = Components::checkAttr('drawerTrigger', $attributes, $manifest);

$drawerClass = Components::classnames([
	$componentClass,
	$componentJsClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass,
]);

$drawerInnerClass = Components::selector($componentClass, $componentClass, 'inner');
?>

<div
	class="<?php echo esc_attr($drawerClass); ?>"
	data-trigger="<?php echo esc_attr($drawerTrigger); ?>"
	aria-expanded="false"
>
	<div class="<?php echo esc_attr($drawerInnerClass); ?>">
		<?php
			// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
			echo $drawerMenu;
		?>
	</div>
</div>
