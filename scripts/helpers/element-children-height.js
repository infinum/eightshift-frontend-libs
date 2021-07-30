/**
 * Returns height of the element measured by height of its children.
 *
 * @param {object} element - DOM element
 *
 * @return {number} Combined height of the children elements
 *
 * Usage:
 * ```js
 * elementChildrenHeight('.js-item');
 * ```
 *
 * Output:
 * ```js
 * <div class="js-item" style="height: 100px"></div>
 * <div class="js-item" style="height: 100px"></div>
 * <div class="js-item" style="height: 100px"></div>
 * ```
 */
export function elementChildrenHeight(element) {
	let height = 0;
	[...element.children].forEach((child) => {
		height += child.offsetHeight;
	});

	return height;
}
