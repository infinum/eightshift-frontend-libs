<?php

/**
 * Template for the Skip Link component view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$skipLinkUse = Components::checkAttr('skipLinkUse', $attributes, $manifest);
if (!$skipLinkUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$skipLinkClasses = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$skipLinkTarget = Components::checkAttr('skipLinkTarget', $attributes, $manifest);
?>
<a
	href="<?php echo esc_url($skipLinkTarget); ?>"
	class="<?php echo esc_attr($skipLinkClasses); ?>"
>
	<?php echo esc_html__('Skip to main content', '%g_textdomain%'); ?>
</a>
