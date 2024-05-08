<?php

/**
 * Template for the Column Block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$unique = Components::getUnique();
?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique) ?>">
	<?php
		echo Components::outputCssVariables($attributes, $manifest, $unique), $innerBlockContent;
	?>
</div>
