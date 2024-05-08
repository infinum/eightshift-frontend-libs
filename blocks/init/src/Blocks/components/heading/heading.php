<?php

/**
 * Template for the Heading Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$headingUse = Helpers::checkAttr('headingUse', $attributes, $manifest);

if (!$headingUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$headingContent = Helpers::checkAttr('headingContent', $attributes, $manifest);
$headingLevel = Helpers::checkAttr('headingLevel', $attributes, $manifest);

if (!$headingContent) {
	return;
}

$headingClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$headingLevel = $headingLevel ? "h{$headingLevel}" : 'h2';

$unique = Helpers::getUnique();
?>

<?php echo Helpers::outputCssVariables($attributes, $manifest, $unique); ?>

<<?php echo esc_attr($headingLevel); ?> class="<?php echo esc_attr($headingClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $headingContent;
	?>
</<?php echo esc_attr($headingLevel); ?>>
