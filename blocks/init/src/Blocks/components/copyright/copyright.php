<?php

/**
 * Copyright component responsible for rendering site's copyright.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$copyrightUse = Components::checkAttr('copyrightUse', $attributes, $manifest);
if (!$copyrightUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$copyrightBy = Components::checkAttr('copyrightBy', $attributes, $manifest);
$copyrightYear = Components::checkAttr('copyrightYear', $attributes, $manifest);
$copyrightContent = Components::checkAttr('copyrightContent', $attributes, $manifest);

$copyrightClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>
<div class="<?php echo \esc_attr($copyrightClass); ?>">
	<?php echo \esc_html("&copy; {$copyrightBy} {$copyrightYear} - {$copyrightContent}"); ?>
</div>
