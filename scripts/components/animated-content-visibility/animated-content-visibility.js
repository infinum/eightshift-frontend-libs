import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @since 8.0.0
 *
 * A component that allows animated mounting/unmounting of inner components.
 *
 * @param {object} props                               - AnimatedContentVisibility options.
 * @param {boolean} [props.showIf]                     - When to show the content.
 * @param {string?} [props.additionalContainerClasses] - If passed, content is wrapped in a container with these classes.
 * @param {React.Component?} [props.children]          - Content to show.
 */
export const AnimatedContentVisibility = (props) => {
	const {
		showIf,
		additionalContainerClasses,
		children,
	} = props;

	return (
		<AnimatePresence>
			{showIf &&
				<motion.div
					initial={{
						y: -4,
						scaleY: 0.95,
						opacity: 0,
						transformOrigin: 'top center',
					}}
					animate={{
						y: 0,
						scaleY: 1,
						opacity: 1,
						transition: {
							type: 'spring',
							stiffness: 260,
							damping: 20,
							duration: 0.85,
						},
					}}
					exit={{
						y: -4,
						scaleY: 0.95,
						opacity: 0,
						transition: {
							duration: 0.25,
							ease: 'easeIn',
						}
					}}
				>
					{!additionalContainerClasses && children}

					{additionalContainerClasses &&
						<div className={additionalContainerClasses}>
							{children}
						</div>
					}
				</motion.div>
			}
		</AnimatePresence>
	);
};
