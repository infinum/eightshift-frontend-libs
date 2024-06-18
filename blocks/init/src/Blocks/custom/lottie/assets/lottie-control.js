import lottie from 'lottie-web';
import { cleanObject } from '../../../assets/scripts/helpers/cleanObject';
/**
 * Class is used to handle Lottie animation parameters and settings that are set per breakpoint.
 */
export class LottieControl {
	constructor({
		lottieElement,
		lottieContainerSelector,
		breakpoints = {},
		lottieIsHiddenClass = 'is-hidden',
	}) {
		this.lottieElement = lottieElement;
		this.lottieContainerSelector = lottieContainerSelector;

		// Store breakpoints sorted from the largest to the smallest.
		this.breakpoints = Object.entries(breakpoints).reverse();

		// Storage of parameters needed for Lottie Animation and Containers.
		this.lottieParams = {};
		this.lottieContainerParams = {};
		this.lottieAnimations = {};
		this.lottieContainers = {};
		this.currentLottie = {};
		this.IS_HIDDEN_CLASS = lottieIsHiddenClass;
	}

	/**
	 * Triggers when window width matches one of media's breakpoints.
	 *
	 * @param {object} e - Match media event.
	 * @param {number} index - Index of a breakpoint in this.breakpoint object.
	 */
	onMatchMedia = (e, index) => {
		this.setBreakpointValues(e, index);
	};

	/**
	 * Set all the data needed for the current breakpoint.
	 *
	 * @param {object} e - Match media event.
	 * @param {number} index - Index of a breakpoint in this.breakpoint object.
	 */
	setBreakpointValues = (e, index) => {
		const breakpointIndex = e.matches ? (index - 1) : index;
		const [breakpointName] = Object.values(this.breakpoints)[breakpointIndex];
		this.setAnimation(breakpointName);
	};

	/**
	 * Fill up all the data for each breakpoint.
	 */
	setParamsToAllBreakpoints = () => {
		if (!this.breakpoints.length) return;

		// Setting default values that will be used to fill out the gaps.
		const [[startBreakpoint]] = this.breakpoints;
		let lottieRespParams = this.lottieParams[startBreakpoint] || {};
		let containerRespParams = this.lottieContainerParams[startBreakpoint] || {};

		this.breakpoints.forEach(([breakpointName]) => {
			this.lottieParams[breakpointName] = {
				...lottieRespParams,
				...this.lottieParams[breakpointName],
			};
			this.lottieContainerParams[breakpointName] = {
				...containerRespParams,
				...this.lottieContainerParams[breakpointName],
			};

			lottieRespParams = this.lottieParams[breakpointName];
			containerRespParams = this.lottieContainerParams[breakpointName];
		});
	};

	/**
	 * Extract data from data attributes and set them to breakpoints.
	 */
	prepareLottieParams = () => {
		const lottieContainers = this.lottieElement.querySelectorAll(this.lottieContainerSelector);

		if (lottieContainers.length === 0) return;

		const {
			loop,
			path,
			viewportOffsetFactor,
			elementOffsetFactor,
			timelineOffsetFactor,
		} = lottieContainers[0].dataset;

		// Fallback values that will be inherited for each breakpoint.
		let containerParamsFallback = {
			viewportOffsetFactor,
			elementOffsetFactor,
			timelineOffsetFactor,
		};

		let lottieParamsFallback = {
			loop,
			path,
		};

		[...lottieContainers].forEach((lottieContainer) => {
			const {
				breakpoint,
				loop,
				path,
				viewportOffsetFactor,
				elementOffsetFactor,
				timelineOffsetFactor,
			} = lottieContainer.dataset;

			if (!breakpoint) return;

			// Container storage per breakpoint.
			this.lottieContainers[breakpoint] = lottieContainer;

			// Container parameters storage per breakpoint.
			this.lottieContainerParams[breakpoint] = {
				...containerParamsFallback,
				...cleanObject({
					viewportOffsetFactor,
					elementOffsetFactor,
					timelineOffsetFactor,
				}),
			};

			// Lottie animation parameters storage per breakpoint.
			this.lottieParams[breakpoint] = {
				...lottieParamsFallback,
				...cleanObject({
					container: lottieContainer,
					path,
					renderer: 'svg',
					progressiveLoad: true,
					loop: loop === 'true',
				}),
			};

			containerParamsFallback = this.lottieContainerParams[breakpoint];
			lottieParamsFallback = this.lottieParams[breakpoint];
		});

		this.setParamsToAllBreakpoints();
	};

	/**
	 * Detect the current breakpoint and return it.
	 */
	detectBreakpoint = () => {
		let [breakpoint] = this.breakpoints[0];
		this.breakpoints.forEach(([breakpointName, value]) => {
			const mediaBreakpoint = window.matchMedia(`(max-width: ${value}px)`);
			if (mediaBreakpoint.matches) {
				breakpoint = breakpointName;
			}
		});

		return breakpoint;
	};

	/**
	 * Lottie animation control is being handled via custom events on each lottie container.
	 *
	 * activateBreakpointAnimation - Show and activate animation depending on the breakpoint.
	 * deactivateBreakpointAnimation - Hide and deactivate animation depending on the breakpoint.
	 */
	activateBreakpointAnimation = () => {
		this.currentLottie.container.classList.remove(this.IS_HIDDEN_CLASS);
		const containerEvent = new Event('start');
		this.currentLottie.container.dispatchEvent(containerEvent);
	};

	deactivateBreakpointAnimation = () => {
		this.currentLottie.container.classList.add(this.IS_HIDDEN_CLASS);
		const containerEvent = new Event('stop');
		this.currentLottie.container.dispatchEvent(containerEvent);
	};

	/**
	 * Set animation parameters and load animation depending on the breakpoint.
	 *
	 * @param {string} breakpointName - The name of the current breakpoint.
	 */
	setAnimation = (breakpointName) => {
		if (Object.keys(this.currentLottie).length) {
			this.deactivateBreakpointAnimation();
		}

		this.currentLottie = {
			animation: this.lottieAnimations[breakpointName],
			container: this.lottieParams[breakpointName]?.container,
			params: this.lottieParams[breakpointName],
			containerParams: this.lottieContainerParams[breakpointName],
		};

		if (
			!this.lottieAnimations[breakpointName] &&
			!this.lottieParams[breakpointName]?.container.querySelectorAll('svg').length
		) {
			this.lottieAnimations[breakpointName] = lottie.loadAnimation(this.lottieParams[breakpointName]);
			this.currentLottie.animation = this.lottieAnimations[breakpointName];
		}

		this.activateBreakpointAnimation();
	};

	/**
	 * Set the initial animation based on the detected breakpoint.
	 */
	setInitialAnimation = () => {
		const breakpointName = this.detectBreakpoint();
		this.setAnimation(breakpointName);
	};

	/**
	 * Initialize the LottieControl instance.
	 */
	init() {
		this.prepareLottieParams();
		this.setInitialAnimation();

		// Setting the event listener when media matches one of the breakpoints.
		Object.values(this.breakpoints).forEach(([, value], index) => {
			if (index !== 0) {
				const media = window.matchMedia(`(min-width: ${value + 1}px)`);
				media.addEventListener('change', (e) => this.onMatchMedia(e, index));
			}
		});
	}
}
