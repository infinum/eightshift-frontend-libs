
/**
 * A simple repeater item.
 *
 * @param {object} props                             - SimpleRepeaterItem options.
 * @param {React.Component?} [props.icon]            - Icon to signify the item.
 * @param {React.Component?|string} props.title      - Title/label of the item.
 * @param {React.Component?|string} [props.subtitle] - Subtitle to display under the title/label.
 * @param {function} props.onRemove                  - If provided, runs a custom remove item functionality instead of the default.
 * @param {string?} [props.additionalLabelClass]     - If provided, adds extra classes to the item main label.
 * @param {array<SimpleRepeaterItem>} props.children - Child items, usually additional options.
 */
export const SimpleRepeaterItem = (props) => {
	const {
		icon,
		title,
		subtitle,
		onRemove,
		children,
		additionalLabelClass,
	} = props;

	return (
		<div icon={icon} title={title} subtitle={subtitle} onRemove={onRemove} additionalLabelClass={additionalLabelClass}>
			{children}
		</div>
	);
};
