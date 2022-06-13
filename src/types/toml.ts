import { parse } from 'toml';

export function useTOML(
	input: string
) {
	return parse(input);
}
