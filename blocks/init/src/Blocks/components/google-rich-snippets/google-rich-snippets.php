<?php

/**
 * Google Rich Snippets
 *
 * @package EightshiftBoilerplate
 */

// phpcs:ignoreFile

use EightshiftBoilerplate\Manifest\Manifest;

$logoImg = apply_filters(Manifest::MANIFEST_ITEM, 'logo.svg');
?>

<!-- Google Rich Snippets -->
<script type="application/ld+json">
	{
	"@context": "http://schema.org",
	"@type": "NewsArticle",
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": "https://google.com/article"
	},
	"headline": "<?php the_title(); ?>",
	<?php if (! empty($image)) { ?>
	"image": {
	"@type": "ImageObject",
	"url": "<?php echo esc_url($image['image']); ?>",
	"height": <?php echo esc_attr($image['height']); ?>,
	"width": <?php echo esc_attr($image['width']); ?>
	},
	<?php } ?>
	"datePublished": "<?php echo esc_attr(get_the_time('c')); ?>",
	"dateModified": "<?php echo esc_attr(gmdate('c', strtotime($post->post_modified))); ?>",
	"author": {
	"@type": "Person",
	"name": "<?php echo esc_attr(get_the_author()); ?>"
	},
	"publisher": {
	"@type": "Organization",
	"name": "<?php echo esc_attr(get_bloginfo('name')); ?>",
	"logo": {
	"@type": "ImageObject",
	"url": "<?php echo esc_url($logoImg); ?>",
	"width": 220,
	"height": 60
	}
	},
	"description": "<?php echo esc_attr(wp_strip_all_tags(get_the_excerpt())); ?>"
	}
</script>
