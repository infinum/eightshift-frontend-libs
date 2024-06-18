import React, { useState, useEffect, useRef } from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import lottie from 'lottie-web';
import { checkAttr, icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';
import manifest from '../manifest.json';

export const LottieEditor = (attributes) => {
	const {
		componentClass,
		componentJsClass
	} = manifest;

	const lottieUse = checkAttr('lottieUse', attributes, manifest);

	const componentClasses = classnames([
		componentClass,
		componentJsClass,
	]);

	const ref = useRef();
	const lottieUrlLarge = checkAttr('lottieUrlLarge', attributes, manifest, true);

	const { current } = ref;
	const [animation, setAnimation] = useState({});

	useEffect(() => {
		if ((!lottieUrlLarge || !lottieUse) && Object.entries(animation).length) {
			animation.destroy();
			setAnimation({});
		}

		if (lottieUrlLarge && current && !Object.entries(animation).length && lottieUse) {
			setAnimation(lottie.loadAnimation({
				container: current,
				renderer: 'svg',
				progressiveLoad: true,
				loop: false,
				path: lottieUrlLarge,
			}));
		}
	}, [lottieUrlLarge, animation, lottieUse, current]);

	return (
		<>
			<div
				ref={ref}
				onMouseEnter={() => {
					if (lottieUrlLarge && Object.entries(animation).length) {
						animation.goToAndPlay(0);
					}
				}}
				onMouseLeave={() => {
					if (lottieUrlLarge && Object.entries(animation).length) {
						animation.pause();
					}
				}}
				className={componentClasses}
				data-path={lottieUrlLarge}
			/>

			{!lottieUrlLarge && lottieUse &&
				<Placeholder
					icon={icons.animation}
					label={__('Lottie', '%g_namespace%')}
					isColumnLayout
				>
					{__('Add an animation using the sidebar options.', '%g_namespace%')}
				</Placeholder>
			}
		</>
	);
};
