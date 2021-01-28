export function	escapeString(string) {
	return string.replace(/([;&,.+*~':"!^#$%@[\]()=>|])/g, '\\$1');
}
