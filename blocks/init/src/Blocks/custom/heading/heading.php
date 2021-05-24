<?php

/**
 * Template for the Heading Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);
$blockName = $attributes['blockName'] ?? $manifest['blockName'];

$blockClass =  Components::checkAttr('blockClass', $attributes, $manifest);

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo \esc_attr($unique); ?>">
	<?php
	echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'heading',
		Blocks::props($attributes, $blockName, '', true)
	);
	?>
</div>
