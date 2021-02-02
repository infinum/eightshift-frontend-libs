/**
 * Returns height of the element measured by height of its children.
 *
 * @param {object} element DOM element
 *
 * @return Combined height of the children elements
 */
export function elementChildrenHeight(element) {
	let height = 0;
	[...element.children].forEach((child) => {
		height += child.offsetHeight;
	});

	return height;
}
