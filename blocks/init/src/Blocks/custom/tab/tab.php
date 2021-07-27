<?php

/**
 * Template for the Tab Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = Components::checkAttr('blockClass', $attributes, $manifest);
$blockJsClass = Components::checkAttr('blockJsClass', $attributes, $manifest);
$tabId = Components::checkAttr('tabId', $attributes, $manifest);
$tabTitle = Components::checkAttr('tabTitle', $attributes, $manifest);

$tabClass = Components::classnames([
	$blockClass,
	$blockJsClass,
]);
?>

<div 
	class="<?php echo \esc_attr($tabClass); ?>"
	data-tab-id="<?php echo \esc_attr($tabId); ?>"
	data-tab-title="<?php echo \esc_attr($tabTitle); ?>"
>
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
