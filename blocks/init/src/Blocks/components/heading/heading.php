<?php

/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$headingUse = Components::checkAttr('headingUse', $attributes, $manifest, $componentName);
if (!$headingUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$headingContent = Components::checkAttr('headingContent', $attributes, $manifest, $componentName);
$headingLevel = Components::checkAttr('headingLevel', $attributes, $manifest, $componentName);
$headingColor = Components::checkAttr('headingColor', $attributes, $manifest, $componentName);
$headingSize = Components::checkAttr('headingSize', $attributes, $manifest, $componentName);
$headingAlign = Components::checkAttr('headingAlign', $attributes, $manifest, $componentName);

$headingClass = Components::classnames([
	$componentClass,
	Components::selector($headingColor, $componentClass, 'color', $headingColor),
	Components::selector($headingSize, $componentClass, 'size', $headingSize),
	Components::selector($headingAlign, $componentClass, 'align', $headingAlign),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$headingLevel = $headingLevel ? "h{$headingLevel}" : 'h2';

?>

<<?php echo esc_attr($headingLevel); ?> class="<?php echo esc_attr($headingClass); ?>">
	<?php echo wp_kses_post($headingContent); ?>
</<?php echo esc_attr($headingLevel); ?>>
