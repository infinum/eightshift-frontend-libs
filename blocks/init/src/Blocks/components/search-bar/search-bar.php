<?php

/**
 * Search Bar form
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$searchBarUse = Helpers::checkAttr('searchBarUse', $attributes, $manifest);
if (!$searchBarUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$searchBarMethod = Helpers::checkAttr('searchBarMethod', $attributes, $manifest);
$searchBarPostType = Helpers::checkAttr('searchBarPostType', $attributes, $manifest);
$searchBarAction = Helpers::checkAttr('searchBarAction', $attributes, $manifest);
$searchBarPlaceholder = Helpers::checkAttr('searchBarPlaceholder', $attributes, $manifest);
$searchBarId = Helpers::checkAttr('searchBarId', $attributes, $manifest);
$searchBarLabel = Helpers::checkAttr('searchBarLabel', $attributes, $manifest);
$searchBarLabelShow = Helpers::checkAttr('searchBarLabelShow', $attributes, $manifest);

$searchClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$inputClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass, 'input'),
]);

$labelClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass, 'label'),
	Helpers::selector(!$searchBarLabelShow, $componentClass, 'label', 'hidden'),
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
