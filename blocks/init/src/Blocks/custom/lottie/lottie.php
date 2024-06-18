<?php

/**
 * Template for the Lottie Component.
 *
 * @package %g_namespace%
 */

use %g_namespace%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';
$blockClass = $manifest['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $blockClass;
$blockJsClass = $manifest['blockJsClass'] ?? '';

$lottieUse = Helpers::checkAttr('lottieUse', $attributes, $manifest);
$lottieTriggerResponsive = Helpers::checkAttrResponsive('lottieTrigger', $attributes, $manifest);
$lottieLoopResponsive = Helpers::checkAttrResponsive('lottieLoop', $attributes, $manifest, true);
$lottieUrlResponsive = Helpers::checkAttrResponsive('lottieUrl', $attributes, $manifest);
$lottieElementOffsetFactorResponsive = Helpers::checkAttrResponsive('lottieElementOffsetFactor', $attributes, $manifest);
$lottieViewportOffsetFactorResponsive = Helpers::checkAttrResponsive('lottieViewportOffsetFactor', $attributes, $manifest);
$lottieTimelineOffsetFactorResponsive = Helpers::checkAttrResponsive('lottieTimelineOffsetFactor', $attributes, $manifest);

// Check if Lottie Url is set for any breakpoint.
$isLottieUrlEmpty = empty(
	array_filter(
		$lottieUrlResponsive,
		function ($value) {
			return !empty($value);
		}
	)
);

if (!$lottieUse || $isLottieUrlEmpty) {
	return;
}

$lottieClasses = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass),
	Helpers::selector($blockJsClass, $blockJsClass),
	Helpers::selector($blockClass, $blockClass, 'lottie'),
	Helpers::selector($blockJsClass, "{$blockJsClass}-lottie"),
]);

$dataTimelineOffsetFactor = '';

$unique = Helpers::getUnique();
?>

<div
	class="<?php echo esc_attr($lottieClasses); ?>"
	data-id=<?php echo esc_attr($unique); ?>
>
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique);

	foreach ($lottieUrlResponsive as $breakpoint => $lottieUrl) {
		$lottieContainerClasses = Helpers::classnames([
			Helpers::selector($blockClass, $blockClass, 'container'),
			Helpers::selector($blockJsClass, "{$blockJsClass}-container"),
			Helpers::selector($blockClass, $blockClass, 'lottie-container'),
			Helpers::selector($blockClass, $blockClass, 'lottie-container', $breakpoint),
			Helpers::selector($blockJsClass, "{$blockJsClass}-lottie-container"),
			'is-hidden',
		]);

		$dataUrl = $lottieUrl ? "data-path={$lottieUrl}" : '';

		$elementOffsetFactor = $lottieElementOffsetFactorResponsive[$breakpoint] ?? '';
		$viewportOffsetFactor = $lottieViewportOffsetFactorResponsive[$breakpoint] ?? '';
		$lottieTrigger = $lottieTriggerResponsive[$breakpoint] ?? '';
		$lottieLoop = $lottieLoopResponsive[$breakpoint] ?? '';
		$lottieLoopValue = $lottieLoop ? 'true' : 'false';

		$dataElementOffsetFactor = $elementOffsetFactor ? "data-element-offset-factor={$elementOffsetFactor}" : '';
		$dataViewportOffsetFactor = $viewportOffsetFactor ? "data-viewport-offset-factor={$viewportOffsetFactor}" : '';
		$dataLottieTrigger = $lottieTrigger ? "data-trigger={$lottieTrigger}" : '';
		$dataLottieLoop = isset($lottieLoopResponsive[$breakpoint]) ? "data-loop={$lottieLoopValue}" : '';

		$timelineOffsetFactor = 1;

		if ($lottieTrigger === 'scroll') {
			$timelineOffsetFactor = $lottieTimelineOffsetFactorResponsive[$breakpoint] ?? $timelineOffsetFactor;

			$dataTimelineOffsetFactor = $timelineOffsetFactor ? "data-timeline-offset-factor={$timelineOffsetFactor}" : '';
		}

		$dataAttributes = trim("
			{$dataUrl}
			{$dataLottieLoop}
			{$dataLottieTrigger}
			{$dataElementOffsetFactor}
			{$dataViewportOffsetFactor}
			{$dataTimelineOffsetFactor}
		");

		if (empty($dataAttributes)) {
			continue;
		}

		?>
		<div
			class="<?php echo esc_attr($lottieContainerClasses); ?>"
			data-breakpoint=<?php echo esc_attr($breakpoint); ?>
			<?php echo esc_attr($dataAttributes); ?>
		></div>
		<?php
	}
	?>
</div>
