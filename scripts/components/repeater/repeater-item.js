/**
 * A simple repeater item.
 *
 * @param {object} props                               - RepeaterItem options.
 * @param {React.Component?} [props.icon]              - Icon to signify the item.
 * @param {(React.Component|string)?} props.title      - Title/label of the item.
 * @param {(React.Component|string)?} [props.subtitle] - Subtitle to display under the title/label.
 * @param {function} props.onRemove                    - If provided, runs a custom remove item functionality instead of the default.
 * @param {string?} [props.additionalLabelClass]       - If provided, adds extra classes to the item main label.
 * @param {RepeaterItem[]} props.children              - Child items, usually additional options.
 * @param {boolean} [props.hideRemove=false]           - If `true`, the default remove button is hidden.
 * @param {React.Component?} [props.preIcon]           - Element to show left of the icon.
 */
export const RepeaterItem = (props) => {
	return <div {...props}>{props.children}</div>;
};
