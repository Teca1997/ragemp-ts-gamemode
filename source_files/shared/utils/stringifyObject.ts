type StringifiedObject<T> = string & { __stringifiedObjectTag: T };

export function stringifyObject<T>(obj: T): StringifiedObject<T> {
	return JSON.stringify(obj) as StringifiedObject<T>;
}

export function parseStringifiedObject<T>(str: StringifiedObject<T>): T {
	return JSON.parse(str);
}
