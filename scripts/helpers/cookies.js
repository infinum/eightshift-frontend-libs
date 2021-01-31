/**
 * Cookies helper
 */
export const cookies = {

	/**
	 * Set a cookie value
	 *
	 * @param {string} key Unique cookie key.
	 * @param {string} value Cookie value.
	 * @param {number} time Number denoting the expiration of the cookie.
	 * @param {string} path URL path that must exist in the requested URL in order to send the Cookie header.
	 */
	setCookie(key, value, time, path) {
		const expires = new Date();
		expires.setTime(expires.getTime() + (time));
		let pathValue = '';

		if (typeof path !== 'undefined') {
			pathValue = `path=${path};`;
		}

		document.cookie = `${key}=${value};${pathValue}expires=${expires.toUTCString()}`;
	},

	/**
	 * Get a cookie
	 *
	 * @param {string} key Unique cookie key.
	 *
	 * @return Cookie value or null if the cookie doesn't exist.
	 */
	getCookie(key) {
		const keyValue = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
		return keyValue ? keyValue[2] : null;
	},
	setHalfDay() {
		return 43200000;
	},
	setOneDay() {
		return 86400000;
	},
	setOneYear() {
		return 31540000000;
	},
	setHalfAnHour() {
		return 1800000;
	},
	setOneMonth() {
		return 2628000000;
	},
};
