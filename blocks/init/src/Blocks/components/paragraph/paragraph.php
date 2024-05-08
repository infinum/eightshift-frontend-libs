<?php

/**
 * Template for the Paragraph Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$paragraphUse = Components::checkAttr('paragraphUse', $attributes, $manifest);
if (!$paragraphUse) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$paragraphContent = Components::checkAttr('paragraphContent', $attributes, $manifest);

if (!$paragraphContent) {
	return;
}

$paragraphClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);
?>

<?php echo Components::outputCssVariables($attributes, $manifest, $unique); ?>

<p class="<?php echo esc_attr($paragraphClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $paragraphContent;
	?>
</p>
