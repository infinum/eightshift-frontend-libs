<?php

/**
 * Template for the Featured Categories view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$featuredCategoriesQuery = Components::checkAttr('featuredCategoriesQuery', $attributes, $manifest);
$featuredCategoriesItemsPerLine = Components::checkAttr('featuredCategoriesItemsPerLine', $attributes, $manifest);
$featuredCategoriesServerSideRender = Components::checkAttr('featuredCategoriesServerSideRender', $attributes, $manifest);

$taxonomyName = $featuredCategoriesQuery['taxonomy'] ?? '';

if (!$taxonomyName) {
	return;
}
?>

<div
	class="<?php echo \esc_attr($blockClass); ?>"
	data-items-per-line=<?php echo \esc_attr($featuredCategoriesItemsPerLine); ?>
>
	<?php

	$terms = $featuredCategoriesQuery['terms'] ?? [];

	$args = [
		'hide_empty' => false,
		'taxonomy' => $taxonomyName,
		'orderby' => 'include',
		'include' => array_map(
			function ($item) {
				return $item['value']; // @phpstan-ignore-line
			},
			(array)$terms
		),
	];

	$allTerms = \get_terms($args);

	if (!is_iterable($allTerms)) {
		return;
	}

	foreach ($allTerms as $termObject) {
		$cardProps = [
			'imageUse' => false,
			'introUse' => false,
			'headingContent' => is_object($termObject) ? $termObject->name : '',
			'paragraphContent' => is_object($termObject) ? $termObject->description : '',
			'buttonContent' => __('Show More', 'eightshift-frontend-libs'),
			'buttonUrl' => \get_term_link($termObject),
		];

		if ($featuredCategoriesServerSideRender) {
			$cardProps['headingTag'] = 'div';
			$cardProps['paragraphTag'] = 'div';
		}
		?>

		<div class="<?php echo esc_attr("{$blockClass}__item"); ?>">
			<?php
				echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					'card',
					$cardProps
				);
			?>
		</div>
	<?php } ?>
</div>
