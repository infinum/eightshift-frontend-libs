<?php

/**
 * Template for the Site navigation block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$siteNavigationLinks = Helpers::checkAttr('siteNavigationLinks', $attributes, $manifest) ?? [];

if (!empty($siteNavigationLinks)) {
	$siteNavigationLinks = array_filter($siteNavigationLinks, fn($item) => !empty($item['text']) && !empty($item['url'])); // @phpstan-ignore-line
}

$navbarClass = Helpers::classnames([
	$blockClass,
	$blockJsClass,
]);

$linksClass = Helpers::selector($blockClass, $blockClass, 'links');
$linkClass = Helpers::selector($blockClass, $blockClass, 'link');

$linksToShow = '';

if (!empty($siteNavigationLinks)) {
	foreach ($siteNavigationLinks as $navbarLink) {
		$url = esc_url($navbarLink['url']);
		$text = esc_attr($navbarLink['text']);

		$linksToShow .= "<a class='{$linkClass}' href='{$url}'>{$text}</a>";
	}
}
?>

<nav class="<?php echo esc_attr($navbarClass); ?>">
	<?php
	echo Helpers::render('image', Helpers::props('logo', $attributes, [
		'blockClass' => $blockClass,
		'selectorClass' => 'logo',
	]));
	?>

	<?php if (!empty($linksToShow)) { ?>
		<div class="<?php echo esc_attr($linksClass); ?>">
			<?php
			// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
			echo $linksToShow;
			?>
		</div>
	<?php } ?>

	<?php
	echo Helpers::render('hamburger', [
		'blockClass' => $blockClass,
	]);
	?>
</nav>

<?php
echo Helpers::render('drawer', [
	'drawerTrigger' => 'js-hamburger',
	'drawerMenu' => $linksToShow,
]);
