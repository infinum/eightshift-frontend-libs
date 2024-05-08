<?php

/**
 * Template for the Skip Link component view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$skipLinkUse = Helpers::checkAttr('skipLinkUse', $attributes, $manifest);
if (!$skipLinkUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$skipLinkClasses = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$skipLinkTarget = Helpers::checkAttr('skipLinkTarget', $attributes, $manifest);
?>
<a
	href="<?php echo esc_url($skipLinkTarget); ?>"
	class="<?php echo esc_attr($skipLinkClasses); ?>"
>
	<?php echo esc_html__('Skip to main content', '%g_textdomain%'); ?>
</a>
