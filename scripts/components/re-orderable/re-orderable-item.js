/**
 * A re-orderable item.
 *
 * @param {object} props                               - ReOrderableItem options.
 * @param {React.Component?} [props.icon]              - Icon to signify the item.
 * @param {(React.Component|string)?} props.title      - Title/label of the item.
 * @param {(React.Component|string)?} [props.subtitle] - Subtitle to display under the title/label.
 * @param {string?} [props.additionalLabelClass]       - If provided, adds extra classes to the item main label.
 * @param {React.component} props.children             - Child items, usually additional options.
 * @param {React.Component?} [props.preIcon]           - Element to show left of the icon.
 * @param {React.Component?} [props.postIcon]          - Element to show to the right of the re-order grabber.
 * @param {string?} [props.firstItemClass]             - Class(es) to apply if the element is the first item on the list.
 * @param {string?} [props.lastItemClass]              - Class(es) to apply if the element is the last item on the list.
 * @param {string?} [props.itemClass]                  - Class(es) to apply to the element.
 * @param {string?} [props.innerClass]                  - Class(es) to apply to the inner element.
 */
export const ReOrderableItem = (props) => {
	return <div {...props}>{props.children}</div>;
};
