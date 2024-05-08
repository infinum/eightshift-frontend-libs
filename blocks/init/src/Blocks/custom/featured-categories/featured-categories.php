<?php

/**
 * Template for the Featured Categories view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$unique = Components::getUnique();

$featuredCategoriesTaxonomy = Components::checkAttr('featuredCategoriesTaxonomy', $attributes, $manifest);
$featuredCategoriesManualTerms = Components::checkAttr('featuredCategoriesManualTerms', $attributes, $manifest);

$featuredCategoriesItemsPerLine = Components::checkAttr('featuredCategoriesItemsPerLine', $attributes, $manifest);
$featuredCategoriesServerSideRender = Components::checkAttr('featuredCategoriesServerSideRender', $attributes, $manifest);

$taxonomyName = $featuredCategoriesTaxonomy['value'];

if (!$taxonomyName) {
	return;
}
?>

<ul
	class="<?php echo esc_attr($blockClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
>
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique);

	$args = [
		'hide_empty' => false,
		'taxonomy' => $taxonomyName,
		'orderby' => 'include',
		'include' => array_map(fn ($item) => $item['value'], $featuredCategoriesManualTerms), // @phpstan-ignore-line
	];

	$allTerms = get_terms($args); // @phpstan-ignore-line

	if (!is_iterable($allTerms)) {
		return;
	}

	foreach ($allTerms as $termObject) {
		$cardProps = [
			'imageUse' => false,
			'introUse' => false,
			'headingContent' => is_object($termObject) ? $termObject->name : '',
			'paragraphContent' => is_object($termObject) ? $termObject->description : '',
			'paragraphUse' => is_object($termObject),
			'buttonContent' => __('See posts', '%g_textdomain%'),
			'buttonIconUse' => false,
			'buttonVariant' => 'outline',
			'buttonUrl' => get_term_link($termObject),
			'buttonColor' => 'primary',
			'headingSize' => 'h5:medium',
		];

		if ($featuredCategoriesServerSideRender) {
			$cardProps['headingTag'] = 'div';
			$cardProps['paragraphTag'] = 'div';
		}
		?>

		<li class="<?php echo esc_attr("{$blockClass}__item"); ?>">
			<?php echo Components::render('card', $cardProps); ?>
		</li>
	<?php } ?>
</ul>
