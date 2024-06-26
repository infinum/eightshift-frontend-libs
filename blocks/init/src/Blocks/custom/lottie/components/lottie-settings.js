import { __ } from '@wordpress/i18n';
import { Responsive, checkAttrResponsive, getAttrKey, icons, ucfirst, IconLabel} from '@eightshift/frontend-libs/scripts';
import { BaseControl, Button, Icon, ButtonGroup } from '@wordpress/components';
import globalManifest from '../../../manifest.json';

export const LottieSettings = ({
	attributes,
	setAttributes,
	manifest,
}) => {
	const {
		attributes: manifestAttributes,
		responsiveAttributes: {
			lottieLoop
		},
	} = manifest;

	const {
		globalVariables: {
			breakpoints,
		},
	} = globalManifest;

	const lottieTriggerValue = checkAttrResponsive('lottieTrigger', attributes, manifest, true);
	const lottieUrlValue = checkAttrResponsive('lottieUrl', attributes, manifest);
	const lottieLoopValue = checkAttrResponsive('lottieLoop', attributes, manifest, true);

	// Fallback used for showing options.
	let lottieTriggerFallback = '';

	return (
		<Responsive label={<IconLabel icon={<Icon icon={icons.options} />} label={__('Settings', 'safer-internet')} />}>
			{Object.keys(breakpoints).reverse().map((breakpointName) => {
				const lottieLoopKey = getAttrKey(lottieLoop[breakpointName], attributes, manifest);

				let point = ucfirst(breakpointName);
				let pointLabel = point;
				if (point === 'Large') {
					point = '';
					pointLabel = __('Default (all screens)', 'safer-internet');
				}

				lottieTriggerFallback = lottieTriggerValue[breakpointName] || lottieTriggerFallback;

				const {
					[lottieLoop[breakpointName]]: {
						default: lottieLoopDefault,
					},
				} = manifestAttributes;

				if (!lottieUrlValue[breakpointName]) {
					return null;
				}

				return (
					<BaseControl label={<IconLabel icon={icons[breakpointName]} label={pointLabel} />} key={breakpointName}>
						{lottieTriggerFallback === 'autoPlay' &&
							<BaseControl label={<IconLabel label={__('Loop', 'safer-internet')} icon={icons.loopMode} />} key={breakpointName}>
								<ButtonGroup>
									{breakpointName !== 'large' &&
										<Button
											variant='secondary'
											isPressed={lottieLoopValue[breakpointName] === lottieLoopDefault}
											icon={icons.arrowUp}
											label={__('Inherit', 'safer-internet')}
											onClick={() => setAttributes({ [lottieLoopKey]: lottieLoopDefault })}
										>
											{lottieLoopValue[breakpointName] === lottieLoopDefault && __('Inherit', 'safer-internet')}
										</Button>
									}
									<Button
										variant='secondary'
										isPressed={lottieLoopValue[breakpointName] === false}
										icon={icons.play}
										label={__('Play once', 'safer-internet')}
										onClick={() => setAttributes({ [lottieLoopKey]: false })}
									>
										{lottieLoopValue[breakpointName] === false && __('Play once', 'safer-internet')}
									</Button>
									<Button
										variant='secondary'
										isPressed={lottieLoopValue[breakpointName] === true}
										icon={icons.loopMode}
										label={__('Loop', 'safer-internet')}
										onClick={() => setAttributes({ [lottieLoopKey]: true })}
									>
										{lottieLoopValue[breakpointName] === true && __('Loop', 'safer-internet')}
									</Button>
								</ButtonGroup>
							</BaseControl>
						}
						<hr />
					</BaseControl>
				);
			})
			}
		</Responsive>
	);
};
