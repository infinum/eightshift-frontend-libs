<?php

/**
 * Template for the Paragraph Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$paragraphUse = Helpers::checkAttr('paragraphUse', $attributes, $manifest);
if (!$paragraphUse) {
	return;
}

$unique = Helpers::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$paragraphContent = Helpers::checkAttr('paragraphContent', $attributes, $manifest);

if (!$paragraphContent) {
	return;
}

$paragraphClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);
?>

<?php echo Helpers::outputCssVariables($attributes, $manifest, $unique); ?>

<p class="<?php echo esc_attr($paragraphClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $paragraphContent;
	?>
</p>
