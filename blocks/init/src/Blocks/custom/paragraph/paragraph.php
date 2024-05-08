<?php

/**
 * Template for the Paragraph Block view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$paragraphParagraphUse = $attributes['paragraphParagraphUse'] ?? true;

if (!$paragraphParagraphUse) {
	return;
}

$unique = Helpers::getUnique();
?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique),
	Helpers::render('paragraph', Helpers::props('paragraph', $attributes));
	?>
</div>
