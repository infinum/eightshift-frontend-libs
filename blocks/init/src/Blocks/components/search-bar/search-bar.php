<?php

/**
 * Search Bar form
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$searchBarUse = Components::checkAttr('searchBarUse', $attributes, $manifest);
if (!$searchBarUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$searchBarMethod = Components::checkAttr('searchBarMethod', $attributes, $manifest);
$searchBarPostType = Components::checkAttr('searchBarPostType', $attributes, $manifest);
$searchBarAction = Components::checkAttr('searchBarAction', $attributes, $manifest);
$searchBarPlaceholder = Components::checkAttr('searchBarPlaceholder', $attributes, $manifest);
$searchBarId = Components::checkAttr('searchBarId', $attributes, $manifest);
$searchBarLabel = Components::checkAttr('searchBarLabel', $attributes, $manifest);
$searchBarLabelShow = Components::checkAttr('searchBarLabelShow', $attributes, $manifest);

$searchClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$inputClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'input'),
]);

$labelClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'label'),
	Components::selector(!$searchBarLabelShow, $componentClass, 'label', 'hidden'),
]);

?>

<form
	role="search"
	method="<?php echo esc_attr($searchBarMethod); ?>"
	class="<?php echo esc_attr($searchClass); ?>"
	action="<?php echo esc_url($searchBarAction); ?>"
>
	<label
		class="<?php echo esc_attr($labelClass); ?>"
		for="<?php echo esc_attr($searchBarId); ?>">
		<?php echo esc_html($searchBarLabel); ?>
	</label>
	<input
		type="text"
		value="<?php echo get_search_query(); ?>"
		name="s"
		<?php if (!empty($searchBarId)) { ?>
			id="<?php echo esc_attr($searchBarId); ?>"
		<?php } ?>
		class="<?php echo esc_attr($inputClass); ?>"
		placeholder="<?php echo esc_attr($searchBarPlaceholder); ?>"
	/>
	<input type="hidden" name="post_type" value="<?php echo esc_attr($searchBarPostType); ?>" />
</form>
