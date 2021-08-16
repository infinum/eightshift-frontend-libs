<?php

/**
 * Copyright component responsible for rendering site's copyright.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$copyrightUse = Components::checkAttr('copyrightUse', $attributes, $manifest);
if (!$copyrightUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$copyrightBy = Components::checkAttr('copyrightBy', $attributes, $manifest);
$copyrightYear = Components::checkAttr('copyrightYear', $attributes, $manifest);
$copyrightContent = Components::checkAttr('copyrightContent', $attributes, $manifest);

$copyrightClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>
<div class="<?php echo \esc_attr($copyrightClass); ?>">
	<?php echo \esc_html("&copy; {$copyrightBy} {$copyrightYear} - {$copyrightContent}"); // @phpstan-ignore-line Known bug. ?>
</div>
