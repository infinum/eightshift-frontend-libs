<?php

/**
 * Template for the Featured Categories view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = Components::checkAttr('blockClass', $attributes, $manifest);
$query = Components::checkAttr('query', $attributes, $manifest);
$itemsPerLine = Components::checkAttr('itemsPerLine', $attributes, $manifest);
$serverSideRender = Components::checkAttr('serverSideRender', $attributes, $manifest);

$taxonomy = $query['taxonomy'] ?? '';

if (!$taxonomy) {
	return;
}
?>

<div class="<?php echo esc_attr($blockClass); ?>" data-items-per-line=<?php echo \esc_attr($itemsPerLine); ?>>
	<?php

	$terms = $query['terms'] ?? '';

	$args = [
		'hide_empty' => false,
		'taxonomy' => $taxonomy,
		'orderby' => 'include',
		'include' => array_map(
			function ($item) {
				return $item['value'];
			},
			$terms
		),
	];

	$allTerms = \get_terms($args);

	foreach ($allTerms as $term) {
		$cardProps = [
			'imageUse' => false,
			'introUse' => false,
			'headingContent' => $term->name,
			'paragraphContent' => $term->description,
			'buttonContent' => __('Show More', 'eightshift-frontend-libs'),
			'buttonUrl' => \get_term_link($term),
		];

		if ($serverSideRender) {
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
