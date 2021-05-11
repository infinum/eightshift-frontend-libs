<?php

/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate
 */

use ProjectVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$headingUse = Components::checkAttr('headingUse', $attributes, $manifest, $componentName);
if (!$headingUse) {
	return;
}

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$headingContent = Components::checkAttr('headingContent', $attributes, $manifest, $componentName);
$headingLevel = Components::checkAttr('headingLevel', $attributes, $manifest, $componentName);

$headingClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$headingLevel = $headingLevel ? "h{$headingLevel}" : 'h2';

?>

<<?php echo esc_attr($headingLevel); ?> class="<?php echo esc_attr($headingClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php echo wp_kses_post($headingContent); ?>
</<?php echo esc_attr($headingLevel); ?>>
