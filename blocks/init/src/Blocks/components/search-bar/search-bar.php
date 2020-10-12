<?php

/**
 * Search Bar form
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'search-bar';
$blockClass = $attributes['blockClass'] ?? '';

$method = $attributes['method'] ?? 'get';
$postType = $attributes['postType'] ?? 'any';
$action = $attributes['action'] ?? home_url('/');
$placeholder = $attributes['placeholder'] ?? esc_attr__('Type in search', 'eightshift-boilerplate');

$searchClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>


<form
	role="search"
	method="<?php echo \esc_attr($method); ?>"
	class="<?php echo \esc_attr($searchClass); ?>"
	action="<?php echo \esc_url($action); ?>"
>
	<input
		type="text"
		value="<?php echo \get_search_query(); ?>"
		name="s"
		class="<?php echo \esc_attr("{$componentClass}__input"); ?>"
		placeholder="<?php echo \esc_attr($placeholder); ?>"
	/>
	<input type="hidden" name="post_type" value="<?php echo \esc_attr($postType); ?>" />
</form>
