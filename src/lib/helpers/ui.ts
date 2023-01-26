export const classNames = (...classNames: string[]) => {
	return classNames.join(' ');
};
export const arrayToObject = (object: unknown[], arrayKeys: string[]) => {
	const result: any = {};
	for (let i = 0; i < arrayKeys.length; i++) {
		result[arrayKeys[i]] = object[i];
	}
	return result;
};
