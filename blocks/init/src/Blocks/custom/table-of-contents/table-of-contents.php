<?php

/**
 * Template for the Table of contents block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$tocClass = Components::classnames([
	$blockClass,
	$blockJsClass,
]);

$entriesClass = Components::classnames([
	Components::selector($blockClass, $blockClass, 'entries'),
	"{$blockJsClass}-entries",
]);

$tableOfContentsHeadingLevels = Components::checkAttr('tableOfContentsHeadingLevels', $attributes, $manifest);

$headingLevelsToUse = implode(',', array_keys(array_filter($tableOfContentsHeadingLevels, fn($v) => $v))); // @phpstan-ignore-line
?>

<div class="<?php echo esc_attr($tocClass); ?>" data-levels="<?php echo esc_attr($headingLevelsToUse); ?>">
	<?php
	// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
	echo Components::render('paragraph', Components::props('paragraph', $attributes));
	?>
</div>
