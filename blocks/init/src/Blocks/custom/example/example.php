<?php

/**
 * Template for the Example Block view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$exampleContent = Components::checkAttr('exampleContent', $attributes, $manifest);

?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $exampleContent;
	?>
</div>
