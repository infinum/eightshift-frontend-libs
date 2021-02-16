/**
 * Use this hook to filter the component options based on the options defined in parent component
 *
 * Step 1:
 * Inside the parent component define the options you want to show.
 * Example:
 *	"options": {
 *		"heading": {
 *			"colors": [
 *				"richBlack",
 *				"white"
 *			],
 *			"sizes": [
 *				"xl",
 *				"l"
 *			]
 *		}
 * 	}
 *
 * Step 2:
 * Inside the parents component options.js file where you render the component
 * add the options you defined in parent manifest to the the componentNameOptions attribute
 * Example:
 * <HeadingOptions
 * 	{...attributes}
 * 	headingOptions={manifest.options.heading}
 * 	setAttributes={setAttributes}
 * />
 *
 * Step 3:
 * Inside the components options.js file add the helper function.
 *
 * Requires WP => 5.3
 *
 * @param {array} attributes Attributes from the parent component.
 * @param {array} componentName Component name from the used component.
 * @param {array} options Options array from the component.
 *
 * @return object
 *
 */
export const filterComponentOptions = (attributes, componentName, options) => {

	if (!attributes[`${componentName}Options`]) {
		return;
	}

	Object.keys(options).forEach(
		(key) => {
			const values = options[key];

			const limitedValues = attributes[`${componentName}Options`][key];

			if(!limitedValues) {
				return;
			}

			options[key] = values.filter(entry => limitedValues.includes(entry.value ?? entry));

		}
	);
}
