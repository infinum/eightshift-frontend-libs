<?php

/**
 * Template for the Table of contents block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$tocClass = Helpers::classnames([
	$blockClass,
	$blockJsClass,
]);

$entriesClass = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass, 'entries'),
	"{$blockJsClass}-entries",
]);

$tableOfContentsHeadingLevels = Helpers::checkAttr('tableOfContentsHeadingLevels', $attributes, $manifest);

$headingLevelsToUse = implode(',', array_keys(array_filter($tableOfContentsHeadingLevels, fn($v) => $v))); // @phpstan-ignore-line
?>

<div class="<?php echo esc_attr($tocClass); ?>" data-levels="<?php echo esc_attr($headingLevelsToUse); ?>">
	<?php
	// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
	echo Helpers::render('paragraph', Helpers::props('paragraph', $attributes));
	?>
</div>
