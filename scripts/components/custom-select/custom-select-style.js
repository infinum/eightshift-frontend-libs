/**
 * Determines the CustomSelect border style.
 *
 * - `MATCH_WP` - matches the WP Admin theme color.
 * - `BLACK` - black.
 * - `DEFAULT` - 80% gray.
 */
 export const CustomSelectStyle = {
	MATCH_WP: 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))',
	BLACK: 'hsla(0, 0%, 0%, 1)',
	DEFAULT: 'hsla(0, 0%, 80%, 1)',
	WP_INPUTS: 'hsla(0, 0%, 46%, 1)',
};
