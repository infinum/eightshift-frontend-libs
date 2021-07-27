<?php

/**
 * Template for the Tabs Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $manifest['blockJsClass'] ?? '';
$tabJsClass = $manifest['tabJsClass'] ?? '';
$tabPanelJsClass = $manifest['tabPanelJsClass'] ?? '';
$tabPanelItemButtonJsClass = $manifest['tabPanelItemButtonJsClass'] ?? '';
$tabPanelItemActiveClass = $manifest['tabPanelItemActiveClass'] ?? '';
$tabPanelItemTemplateId = $manifest['tabPanelItemTemplateId'] ?? '';
$tabPanelElement = $manifest['tabPanelElement'] ?? '';
$tabPanelItemElement = $manifest['tabPanelItemElement'] ?? '';
$tabPanelItemButtonElement = $manifest['tabPanelItemButtonElement'] ?? '';

$tabsClass = Components::classnames([
	$blockClass,
	$blockJsClass
]);

$tabPanelClass = Components::classnames([
	$tabPanelJsClass,
	Components::selector(
		$tabPanelElement && $blockClass,
		$blockClass,
		$tabPanelElement
	)
]);

$tabPanelItemClass = Components::classnames([
	Components::selector(
		$tabPanelItemElement && $blockClass,
		$blockClass,
		$tabPanelItemElement
	)
]);

$tabPanelItemButtonClass = Components::classnames([
	$tabPanelItemButtonJsClass,
	Components::selector(
		$tabPanelItemButtonElement && $blockClass,
		$blockClass,
		$tabPanelItemButtonElement
	)
]);
?>
			
<div class="<?php echo \esc_attr($tabsClass); ?>">
	<div class="<?php echo \esc_attr($tabPanelClass); ?>">
	</div>
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>

<template id="<?php echo \esc_attr($tabPanelItemTemplateId); ?>">
	<li
		class="<?php echo \esc_attr($tabPanelItemClass); ?>"
	>
		<button
			role="tab"
			class="<?php echo \esc_attr($tabPanelItemButtonClass); ?>"
			data-triggerstabid="newTab"
		>
		</button>
	</li>
</template>