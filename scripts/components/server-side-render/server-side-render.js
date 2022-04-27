// Created by David Gwyer
// https://github.com/dgwyer/server-side-render-x
/**
 * External dependencies
 */
import _ from 'lodash';
import { icons } from '@eightshift/frontend-libs/scripts';

/**
 * WordPress dependencies
 */
import { Component, RawHTML } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { Placeholder } from '@wordpress/components';

export function rendererPath(block, attributes = null, urlQueryArgs = {}) {
	return addQueryArgs(`/wp/v2/block-renderer/${block}`, {
		context: 'edit',
		...(null !== attributes ? { attributes } : {}),
		...urlQueryArgs,
	});
}

const Loader = () => {
	return (
		<div className="es-ssr-spinner-overlay">
			<svg className="es-ssr-spinner-overlay__spinner" viewBox="0 0 50 50">
				<circle className="es-ssr-spinner-overlay__spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="6"></circle>
				<circle className="es-ssr-spinner-overlay__spinner-path-2" cx="25" cy="25" r="20" fill="none" strokeWidth="3"></circle>
			</svg>
		</div>
	);
};

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
		this.fetch = _.debounce(this.fetch, 500);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps, this.props)) {
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
		const spinner = `
			   <div class="es-ssr-spinner-overlay">
				   <svg class="es-ssr-spinner-overlay__spinner" viewBox="0 0 50 50">
					   <circle class="es-ssr-spinner-overlay__spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="6"></circle>
					   <circle class="es-ssr-spinner-overlay__spinner-path-2" cx="25" cy="25" r="20" fill="none" stroke-width="3"></circle>
				   </svg>
			   </div>
		   `;

		const response = this.state.response;
		const prevResponse = this.state.prevResponse;
		let prevResponseHTML = spinner;
		if (prevResponse !== null) {
			prevResponseHTML = `<div>${prevResponse}</div>${spinner}`;
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
				<RawHTML key="html" className={className}>
					{prevResponseHTML}
				</RawHTML>
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
	EmptyResponsePlaceholder: ({ className }) => (
		<Placeholder icon={icons.errorCircle} className={className}>
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
			<Placeholder icon={icons.errorCircle} className={className}>{errorMessage}</Placeholder>
		);
	},
	LoadingResponsePlaceholder: ({ className }) => {
		return (
			<Placeholder icon={icons.errorCircle} className={className}>
				<Loader />
			</Placeholder>
		);
	},
};

export default ServerSideRender;
