/**
 * Helper to set and unset cookies.
 */
export const cookies = {

	/**
	 * Set a cookie value
	 *
	 * @param {string} key   - Unique cookie key.
	 * @param {string} value - Cookie value.
	 * @param {number} time  - Number denoting the expiration of the cookie.
	 * @param {string} path  - URL path that must exist in the requested URL in order to send the Cookie header.
	 * @param {string} domain  - Domain name of the server that set the cookie.
	 * @param {boolean} secure - A secure cookie is only sent to the server with an encrypted request over the HTTPS protocol.
	 * @param {string} sameSite - A SameSite cookie prevents the browser from sending this cookie along with cross-site requests
	 *
	 * @access public
	 *
	 * @returns {boolean}
	 *
	 * Usage:
	 * ```js
	 * cookies.setCookie('gdpr', '2', cookies.setOneDay(), '/', '.example.com', true, 'Strict');
	 * ```
	 */
	setCookie(key, value, time, path, domain, secure = false, sameSite = 'Lax') {
		const expires = new Date();
		expires.setTime(expires.getTime() + (time));

		let pathValue = '';
		let domainValue = '';

		if (typeof path !== 'undefined') {
			pathValue = `;path=${path}`;
		}

		if (typeof domain !== 'undefined') {
			domainValue = `;domain=${domain}`;
		}

		const cookieParts = [
			`${key}=${value}`,
			`expires=${expires.toUTCString()}`,
			`secure=${secure}`,
			`SameSite=${sameSite}`,
			pathValue,
			domainValue,
		];

		try {
			document.cookie = cookieParts.join('; ');

			return true;
		} catch (e) {
			console.error("Failed to set cookie:", e);

			return false;
		}
	},

	/**
	 * Get a cookie
	 *
	 * @param {string} key Unique cookie key.
	 *
	 * @return Cookie value or null if the cookie doesn't exist.
	 *
	 * Usage:
	 * ```js
	 * cookies.getCookie('gdpr');
	 * ```
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
