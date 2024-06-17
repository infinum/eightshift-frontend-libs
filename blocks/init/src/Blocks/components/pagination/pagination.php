<?php

/**
 * Template for the Pagination Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$paginationUse = Helpers::checkAttr('paginationUse', $attributes, $manifest);
if (!$paginationUse) {
	return;
}

$paginationIconName = Helpers::checkAttr('paginationIconName', $attributes, $manifest);
$paginationCurrentPage = Helpers::checkAttr('paginationCurrentPage', $attributes, $manifest);
$paginationMaxPages = Helpers::checkAttr('paginationMaxPages', $attributes, $manifest);

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$navigationClass = Helpers::classnames(
	$componentClass,
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass,
);

$icon = Helpers::render(
	'icon',
	Helpers::props('icon', $attributes, [
		'blockClass' => $componentClass,
		'selectorClass' => 'icon',
		'iconName' => $paginationIconName,
	])
);
?>

<div class="<?php echo esc_attr($navigationClass); ?>">
	<?php
	echo paginate_links(
			[
				'before_page_number' => '<span>',
				'after_page_number' => '</span>',
				'prev_text' => '<span>' . $icon . __('Previous', '%g_textdomain%') . '</span>',
				'next_text' => '<span>' . __('Next', '%g_textdomain%') . $icon . '</span>',
			]
	);
	?>
</div>
