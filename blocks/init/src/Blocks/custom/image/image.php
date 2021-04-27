<?php

/**
 * Template for the Image Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$blockName = $attributes['blockName'] ?? $manifest['blockName'];

$blockClass = $attributes['blockClass'] ?? '';

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

?>

<div class="<?php echo \esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'image',
		Blocks::props($attributes, $blockName, '', true)
	);
	?>
</div>
