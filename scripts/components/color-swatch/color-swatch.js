import React, { useState, useRef, useEffect } from 'react';
import { ColorSwatch as EsUicColorSwatch } from '@eightshift/ui-components';

/**
 * @since 8.0.0
 *
 * @deprecated Use `ColorSwatch` from `@eightshift/ui-components` instead.
 *
 * A simple color swatch to show a color, gradient, transparent (checkerboard) or none.
 *
 * @param {object} props - ColorSwatch options.
 * @param {string?} [props.color] - Color to show. Can be either `null`/empty for "nothing" icon, `transparent` to show a checkerboard, or anything that can be sent to the css `background` property.
 * @param {boolean} [props.additionalClasses] - Additional classes to pass through to the swatch.
 */
export const ColorSwatch = (props) => {
	const { color, additionalClasses } = props;

	return <EsUicColorSwatch color={color} className={additionalClasses} />;
};
