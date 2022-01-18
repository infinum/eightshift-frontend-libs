<?php

/**
 * Template for the Group block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$unique = $attributes['uniqueWrapperId'] ?? Components::getUnique();

echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
