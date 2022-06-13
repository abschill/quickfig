export function useJSON(
	input: string
): NodeRequire {
	return JSON.parse(input);
}
