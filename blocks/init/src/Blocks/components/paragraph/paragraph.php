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

<?php echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

<p class="<?php echo \esc_attr($paragraphClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php echo \wp_kses_post($paragraphContent); ?>
</p>
