<?php

/**
 * Template for the Tabs Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = Components::checkAttr('blockClass', $attributes, $manifest);
$blockJsClass = Components::checkAttr('blockJsClass', $attributes, $manifest);
$tabClass = $manifest['tabClass'] ?? '';

$tabJsClass = "js-$tabClass";
$tabPanelJsClass = "$blockJsClass-panel";
$tabPanelItemJsClass = "$tabPanelJsClass-item";
$tabPanelItemButtonJsClass = "$tabPanelJsClass-button";
$tabPanelItemTemplateId = "$tabPanelJsClass-template";
$tabPanelElement = 'panel';
$tabPanelItemElement = 'panel-item';
$tabPanelItemButtonElement = 'panel-item-button';

$tabsClass = Components::classnames([
	$blockClass,
	$blockJsClass
]);

$tabPanelClass = Components::classnames([
	$tabPanelJsClass,
	Components::selector($tabPanelElement && $blockClass, $blockClass, $tabPanelElement)
]);

$tabPanelItemClass = Components::classnames([
	$tabPanelItemJsClass,
	Components::selector($tabPanelItemElement && $blockClass, $blockClass, $tabPanelItemElement)
]);

$tabPanelItemButtonClass = Components::classnames([
	$tabPanelItemButtonJsClass,
	Components::selector($tabPanelItemButtonElement && $blockClass, $blockClass, $tabPanelItemButtonElement)
]);
?>
			
<div class="<?php echo \esc_attr($tabsClass); ?>">
	<div class="<?php echo \esc_attr($tabPanelClass); ?>"></div>
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>

<template id="<?php echo \esc_attr($tabPanelItemTemplateId); ?>">
	<li
		class="<?php echo \esc_attr($tabPanelItemClass); ?>"
	>
		<button
			role="tab"
			class="<?php echo \esc_attr($tabPanelItemButtonClass); ?>"
			data-triggers-tab-id="newTab"
		>
		</button>
	</li>
</template>