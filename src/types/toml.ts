import { parse } from '@iarna/toml';

export function useTOML(
	input: string
) {
	return parse(input);
}
