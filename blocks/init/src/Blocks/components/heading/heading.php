<?php

/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
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

$headingClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$headingLevel = $headingLevel ? "h{$headingLevel}" : 'h2';

$unique = Components::getUnique();
?>

<<?php echo esc_attr($headingLevel); ?> class="<?php echo esc_attr($headingClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php echo wp_kses_post($headingContent); ?>
</<?php echo esc_attr($headingLevel); ?>>
