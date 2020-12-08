<?php

/**
 * Search Bar form
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$searchBarUse = Components::checkAttr('searchBarUse', $attributes, $manifest, $componentName);
if (!$searchBarUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$searchBarMethod = Components::checkAttr('searchBarMethod', $attributes, $manifest, $componentName);
$searchBarPostType = Components::checkAttr('searchBarPostType', $attributes, $manifest, $componentName);
$searchBarAction = Components::checkAttr('searchBarAction', $attributes, $manifest, $componentName);
$searchBarPlaceholder = Components::checkAttr('searchBarPlaceholder', $attributes, $manifest, $componentName);

$searchClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<form
	role="search"
	method="<?php echo \esc_attr($searchBarMethod); ?>"
	class="<?php echo \esc_attr($searchClass); ?>"
	action="<?php echo \esc_url($searchBarAction); ?>"
>
	<input
		type="text"
		value="<?php echo \get_search_query(); ?>"
		name="s"
		class="<?php echo \esc_attr("{$componentClass}__input"); ?>"
		placeholder="<?php echo \esc_attr($searchBarPlaceholder); ?>"
	/>
	<input type="hidden" name="post_type" value="<?php echo \esc_attr($searchBarPostType); ?>" />
</form>
