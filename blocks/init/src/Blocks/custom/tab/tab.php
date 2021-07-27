<?php

/**
 * Template for the Tab Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $manifest['blockJsClass'] ?? '';
$tabId = $attributes['tabId'] ?? '';
$tabTitle = $attributes['tabTitle'] ?? '';

$tabClass = Components::classnames([
	$blockClass,
	$blockJsClass,
]);
?>

<div 
	class="<?php echo \esc_attr($tabClass); ?>"
	data-tabid="<?php echo \esc_attr($tabId); ?>"
	data-tabtitle="<?php echo \esc_attr($tabTitle); ?>"
>
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
