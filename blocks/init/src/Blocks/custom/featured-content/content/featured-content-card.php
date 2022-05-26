<?php

/**
 * Template for the Featured Content view - Card content map from ID.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$ids = $attributes['ids'] ?? [];
$ssr = $attributes['ssr'] ?? false;

$output = [];

if (!$ids) {
	return $output;
}

foreach ($ids as $id) {
	echo Components::render(
		'card',
		Components::props(
			'card',
			[
				'cardHeadingContent' => get_the_title($id),
				'cardParagraphContent' => get_the_excerpt($id),
				'cardButtonUrl' => get_the_permalink($id),
				'cardButtonContent' => __('View More', 'eightshift-boilerplate'),
				'cardImageUrl' => \get_the_post_thumbnail_url($id, 'large'),
				'blockSsr' => $ssr,
			],
		),
		'',
		true
	);
}
