<?php

/**
 * Template for the Paragraph Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$paragraphParagraphUse = $attributes['paragraphParagraphUse'] ?? true;

if (!$paragraphParagraphUse) {
	return;
}

$unique = Components::getUnique();
?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique),
	Components::render('paragraph', Components::props('paragraph', $attributes));
	?>
</div>
