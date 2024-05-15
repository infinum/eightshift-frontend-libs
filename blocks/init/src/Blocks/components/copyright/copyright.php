<?php

/**
 * Copyright component responsible for rendering site's copyright.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$copyrightUse = Helpers::checkAttr('copyrightUse', $attributes, $manifest);
if (!$copyrightUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$copyrightYear = date('Y');
$copyrightContent = Components::checkAttr('copyrightContent', $attributes, $manifest);

$copyrightClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

?>
<div class="<?php echo esc_attr($copyrightClass); ?>">
	<?php echo esc_html("&copy;{$copyrightYear} | {$copyrightContent}"); ?>
</div>
