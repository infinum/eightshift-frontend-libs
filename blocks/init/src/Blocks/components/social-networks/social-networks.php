<?php

/**
 * Social networks component.
 *
 * @package %g_namespace%
 */

 use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$socialNetworksUse = Helpers::checkAttr('socialNetworksUse', $attributes, $manifest);

if (!$socialNetworksUse) {
	return;
}

$socialNetworksNetworks = Helpers::checkAttr('socialNetworksNetworks', $attributes, $manifest);
$socialNetworksShareMode = Helpers::checkAttr('socialNetworksShareMode', $attributes, $manifest);

$networksToShow = [];

foreach ($socialNetworksNetworks as $network) {
	if ($network['enabled'] === false) {
		continue;
	}

	if (!$socialNetworksShareMode && !isset($manifest['networks'][$network['id']]['url'])) { // @phpstan-ignore-line
		continue;
	}

	if ($socialNetworksShareMode && !isset($manifest['networks'][$network['id']]['shareUrl'])) { // @phpstan-ignore-line
		continue;
	}

	$networksToShow[] = $network['id'];
}

if (empty($networksToShow)) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$componentJsClass = $manifest['componentJsClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$socialLinksClass = Helpers::classnames([
	$componentClass,
	$socialNetworksShareMode ? $componentJsClass : '',
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	$additionalClass,
]);

$itemClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass, 'link'),
	$socialNetworksShareMode ? "{$componentJsClass}-link" : '',
]);

?>
<div class="<?php echo esc_html($socialLinksClass); ?>">
	<?php
	if ($socialNetworksShareMode) {
		foreach ($networksToShow as $networkName) {
			$shareUrl = $manifest['networks'][$networkName]['shareUrl'] ?? ''; // @phpstan-ignore-line
			$shareUrl = str_replace('POST_TITLE', get_the_title(), $shareUrl); // @phpstan-ignore-line
			$shareUrl = str_replace('POST_URL', get_the_permalink(), $shareUrl); // @phpstan-ignore-line
			$shareUrl = str_replace('POST_FEATURED_IMAGE', get_the_post_thumbnail_url(get_the_ID(), 'large'), $shareUrl); // @phpstan-ignore-line
			?>
			<button
				class="<?php echo esc_html($itemClass); ?>"
				data-network="<?php echo esc_attr($networkName); ?>"
				data-share-url="<?php echo esc_url($shareUrl); ?>" <?php // @phpstan-ignore-line ?>
				data-page-title="<?php echo esc_attr(get_the_title()); ?>"
				data-page-url="<?php echo esc_url(get_the_permalink()); ?>" <?php // @phpstan-ignore-line ?>
			>
				<?php
				// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				echo $manifest['networks'][$networkName]['icon'] ?? ''; // @phpstan-ignore-line
				?>
			</button>
		<?php }
	} else {
		foreach ($networksToShow as $networkName) {
			?>
			<a
				class="<?php echo esc_html($itemClass); ?>"
				<?php // @phpstan-ignore-next-line ?>
				href="<?php echo esc_url($manifest['networks'][$networkName]['url'] ?? ''); ?>"
				<?php // @phpstan-ignore-next-line ?>
				title="<?php echo esc_attr($manifest['networks'][$networkName]['title'] ?? ''); ?>"
				target="_blank"
				rel="noreferrer noopener"
			>
				<?php
				// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				echo $manifest['networks'][$networkName]['icon'] ?? ''; // @phpstan-ignore-line
				?>
			</a>
			<?php
		}
	}
	?>
</div>
