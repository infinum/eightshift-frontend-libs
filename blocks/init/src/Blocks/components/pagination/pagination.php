<?php

/**
 * Template for the Pagination Component.
 *
 * @package %g_namespace%
 */

 use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$paginationClass = Helpers::classnames([
	$componentClass,
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass
]);

$paginationPrevClass = Helpers::selector($componentClass, $componentClass, 'prev');
$paginationNextClass = Helpers::selector($componentClass, $componentClass, 'next');
$paginationLinkClass = Helpers::selector($componentClass, $componentClass, 'link');

$icon = Helpers::render(
	'icon',
	Helpers::props('icon', $attributes, [
		'blockClass' => $componentClass,
		'selectorClass' => 'icon',
	])
);
?>

<div class="<?php echo esc_attr($paginationClass); ?>">
	<?php
	$pagination_links = paginate_links(
		[
			'before_page_number' => '<span>',
			'after_page_number' => '</span>',
			'prev_text' => '<span class="' . $paginationPrevClass . '" aria-label = ' . __('Previous', '%g_textdomain%') . '>' .  $icon . '</span>',
			'next_text' => '<span class="' . $paginationNextClass . '"aria-label = ' . __('Next', '%g_textdomain%') . '>' .  $icon . '</span>',
		]
	);

	// Add custom css classes.
	$pagination_links = str_replace('<a', '<a class="' . $paginationLinkClass . '"', $pagination_links);

	echo $pagination_links;
	?>
</div>
