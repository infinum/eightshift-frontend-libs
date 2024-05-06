<?php

/**
 * Mobile menu as drawer
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$drawerUse = Helpers::checkAttr('drawerUse', $attributes, $manifest);
if (!$drawerUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$drawerMenu = Helpers::checkAttr('drawerMenu', $attributes, $manifest);
$drawerTrigger = Helpers::checkAttr('drawerTrigger', $attributes, $manifest);

$drawerClass = Helpers::classnames([
	$componentClass,
	$componentJsClass,
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass,
]);

$drawerInnerClass = Helpers::selector($componentClass, $componentClass, 'inner');
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
