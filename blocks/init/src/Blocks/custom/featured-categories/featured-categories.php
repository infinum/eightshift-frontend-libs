<?php

/**
 * Template for the Featured Categories view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass =  Components::checkAttr('blockClass', $attributes, $manifest);
$query =  Components::checkAttr('query', $attributes, $manifest);
$itemsPerLine =  Components::checkAttr('itemsPerLine', $attributes, $manifest);
$serverSideRender =  Components::checkAttr('serverSideRender', $attributes, $manifest);

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
	];

	$allTerms = \get_terms($args);

	foreach ($allTerms as $term) {
		if ($terms && !in_array((string) $term->term_id, $terms, true)) { // phpcs:ignore Squiz.NamingConventions.ValidVariableName.NotCamelCaps
			continue;
		}

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
				echo wp_kses_post(
					Components::render(
						'card',
						$cardProps
					)
				);
			?>
		</div>
	<?php } ?>
</div>
