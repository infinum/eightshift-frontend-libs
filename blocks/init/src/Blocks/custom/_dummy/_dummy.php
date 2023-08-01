<?php

/**
 * Template for the %block-name-title-case% Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$%block-name-camel-case%Content = Components::checkAttr('%block-name-camel-case%Content', $attributes, $manifest);

?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $%block-name-camel-case%Content;
	?>
</div>
