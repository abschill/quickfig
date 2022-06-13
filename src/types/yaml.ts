import { parse } from 'yaml';

export function useYAML(
	input: string
) {
	return parse(input);
}
