<?php

/**
 * Template for the Paragraph Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$paragraphUse = Components::checkAttr('paragraphUse', $attributes, $manifest);
if (!$paragraphUse) {
	return;
}

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$paragraphContent = Components::checkAttr('paragraphContent', $attributes, $manifest);

$paragraphClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<p class="<?php echo \esc_attr($paragraphClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php echo \wp_kses_post($paragraphContent); ?>
</p>
