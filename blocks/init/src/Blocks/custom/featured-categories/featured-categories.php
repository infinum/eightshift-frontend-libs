<?php

/**
 * Template for the Featured Categories view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

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
	echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest);

	$args = [
		'hide_empty' => false,
		'taxonomy' => $taxonomyName,
		'orderby' => 'include',
		'include' => array_map(
			function ($item) {
				return $item['value'];
			},
			$featuredCategoriesManualTerms // @phpstan-ignore-line
		),
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
			'buttonContent' => __('See posts', 'eightshift-frontend-libs'),
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
