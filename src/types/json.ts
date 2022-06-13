export function useJSON(
	input: string
): NodeRequire {
	return JSON.parse(input);
}

export function useJSModule(
	path: string
): NodeRequire {
	return require(path);
}
