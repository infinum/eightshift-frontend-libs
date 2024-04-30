<?php

/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$headingUse = Components::checkAttr('headingUse', $attributes, $manifest);

if (!$headingUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$headingContent = Components::checkAttr('headingContent', $attributes, $manifest);
$headingLevel = Components::checkAttr('headingLevel', $attributes, $manifest);

if (!$headingContent) {
	return;
}

$headingClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$headingLevel = $headingLevel ? "h{$headingLevel}" : 'h2';

$unique = Components::getUnique();
?>

<?php echo Components::outputCssVariables($attributes, $manifest, $unique); ?>

<<?php echo esc_attr($headingLevel); ?> class="<?php echo esc_attr($headingClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $headingContent;
	?>
</<?php echo esc_attr($headingLevel); ?>>
