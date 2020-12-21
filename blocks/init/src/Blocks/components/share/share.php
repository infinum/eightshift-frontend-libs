<?php

/**
 * Template for the Share Component view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$postUrl = $attributes['postUrl'] ?? \get_the_permalink();
$postTitle = $attributes['postTitle'] ?? \get_the_title();
$postImageUrl = $attributes['postImageUrl'] ?? \get_the_post_thumbnail_url(\get_the_ID(), 'large');

$socialNetworks = [
	'twitter' => "https://twitter.com/intent/tweet?url={$postUrl}&text={$postTitle}",
	'linkedin' => "http://www.linkedin.com/shareArticle?mini=true&url={$postUrl}&title={$postTitle}",
	'facebook' => "https://www.facebook.com/sharer/sharer.php?u={$postUrl}",
	'pinterest' => "https://pinterest.com/pin/create/button/?url={$postUrl}&media={$postImageUrl}&description={$postTitle}",
];

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$shareClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$shareItemClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'item'),
	Components::selector($blockClass, $blockClass, 'item'),
	Components::selector($componentClass, "js-{$componentClass}-link"),
]);

?>
<div class="<?php echo \esc_attr($shareClass); ?>">
	<?php
	foreach ($socialNetworks as $name => $url) {
		?>
		<a
			href="<?php echo esc_url($url); ?>"
			data-share-url="<?php echo esc_attr($postUrl);?>"
			data-share-title="<?php echo esc_attr($postTitle);?>"
			class="<?php echo esc_attr($shareItemClass); ?>"
		>
			<?php echo esc_html($name); ?>"
		</a>
		<?php
	}
	?>
</div>
