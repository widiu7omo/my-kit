export function isJson(str: string) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
export function getInvocationMessage(str: string) {
	const exp = /\binvocation:\s+(.*)$/;
	// const regExp = new RegExp(exp, 'gm');
	const matches = str.match(exp);
	if (matches && matches.length > 1) {
		return matches[1];
	} else {
		return str;
	}
}
