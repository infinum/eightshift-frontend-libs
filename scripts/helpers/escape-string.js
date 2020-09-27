export const escapeString = {
	escapeString(string) {
		return string.replace(/([;&,.+*~':"!^#$%@[\]()=>|])/g, '\\$1');
	},
};
