// Created by David Gwyer
// https://github.com/dgwyer/server-side-render-x
/**
 * External dependencies
 */
import { isEqual, debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component, RawHTML, Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { Placeholder, Spinner } from '@wordpress/components';

export function rendererPath(block, attributes = null, urlQueryArgs = {}) {
	return addQueryArgs(`/wp/v2/block-renderer/${block}`, {
		context: 'edit',
		...(null !== attributes ? { attributes } : {}),
		...urlQueryArgs,
	});
}

/**
 * An update of the built-in ServerSideRender that keeps the current state when loading the new one.
 * 
 * @param {object} props           - ServerSideRender options.
 * @param {string} props.block     - Name of the block to render (should include the namespace!).
 * @param {array} props.attributes - Attributes to pass to the rendered item.
 */
export class ServerSideRender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			response: null,
			prevResponse: null,
		};
	}

	componentDidMount() {
		this.isStillMounted = true;
		this.fetch(this.props);
		// Only debounce once the initial fetch occurs to ensure that the first
		// renders show data as soon as possible.
		this.fetch = debounce(this.fetch, 500);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	componentDidUpdate(prevProps) {
		if (!isEqual(prevProps, this.props)) {
			this.fetch(this.props);
		}
	}

	fetch(props) {
		if (!this.isStillMounted) {
			return;
		}
		if (null !== this.state.response) {
			//this.setState({ response: null, prevResponse: this.state.response });
			this.setState(state => (
				{
					response: null,
					prevResponse: state.response
				}
			));
		}
		const { block, attributes = null, urlQueryArgs = {} } = props;

		const path = rendererPath(block, attributes, urlQueryArgs);
		// Store the latest fetch request so that when we process it, we can
		// check if it is the current request, to avoid race conditions on slow networks.
		const fetchRequest = (this.currentFetchRequest = apiFetch({ path })
			.then((response) => {
				if (
					this.isStillMounted &&
					fetchRequest === this.currentFetchRequest &&
					response
				) {
					this.setState({ response: response.rendered });
				}
			})
			.catch((error) => {
				if (
					this.isStillMounted &&
					fetchRequest === this.currentFetchRequest
				) {
					this.setState({
						response: {
							error: true,
							errorMsg: error.message,
						},
					});
				}
			}));
		return;
	}

	render() {

		const { right, top, unit } = this.props.spinnerLocation;
		const response = this.state.response;
		const prevResponse = this.state.prevResponse;
		let prevResponseHTML = "";
		if (prevResponse !== null) {
			prevResponseHTML = `<div style="position:relative;"><div style="z-index:10000;position:absolute;right:${right}${unit};top:${top}${unit}"><span class="components-spinner"></span></div>${prevResponse}</div>`;
		}

		const {
			className,
			EmptyResponsePlaceholder,
			ErrorResponsePlaceholder,
		} = this.props;

		if (response === '') {
			return (
				<EmptyResponsePlaceholder
					response={response}
					{...this.props}
				/>
			);
		} else if (!response) {
			return (
				<Fragment>
					<RawHTML key="html" className={className}>
						{prevResponseHTML}
					</RawHTML>
				</Fragment>
			);
		} else if (response.error) {
			return (
				<ErrorResponsePlaceholder
					response={response}
					{...this.props}
				/>
			);
		}

		return (
			<RawHTML key="html" className={className}>
				{response}
			</RawHTML>
		);
	}
}

ServerSideRender.defaultProps = {
	spinnerLocation: { right: 0, top: 10, unit: 'px' },
	EmptyResponsePlaceholder: ({ className }) => (
		<Placeholder className={className}>
			{__('Block rendered as empty.')}
		</Placeholder>
	),
	ErrorResponsePlaceholder: ({ response, className }) => {
		const errorMessage = sprintf(
			// translators: %s: error message describing the problem
			__('Error loading block: %s'),
			response.errorMsg
		);
		return (
			<Placeholder className={className}>{errorMessage}</Placeholder>
		);
	},
	LoadingResponsePlaceholder: ({ className }) => {
		return (
			<Placeholder className={className}>
				<Spinner />
			</Placeholder>
		);
	},
};

export default ServerSideRender;
