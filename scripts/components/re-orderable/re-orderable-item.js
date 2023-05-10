
/**
 * A re-orderable item.
 *
 * @param {object} props                               - ReOrderableItem options.
 * @param {React.Component?} [props.icon]              - Icon to signify the item.
 * @param {(React.Component|string)?} props.title      - Title/label of the item.
 * @param {(React.Component|string)?} [props.subtitle] - Subtitle to display under the title/label.
 * @param {function} props.onRemove                    - If provided, runs a custom remove item functionality instead of the default.
 * @param {string?} [props.additionalLabelClass]       - If provided, adds extra classes to the item main label.
 * @param {React.component} props.children             - Child items, usually additional options.
 * @param {boolean} [props.hideRemove=false]           - If `true`, the default remove button is hidden.
 * @param {React.Component?} [props.preIcon]           - Element to show left of the icon.
 * @param {React.Component?} [props.postIcon]          - Element to show to the right of the re-order grabber.
 */
export const ReOrderableItem = (props) => {
	return (
		<div {...props}>
			{props.children}
		</div>
	);
};
