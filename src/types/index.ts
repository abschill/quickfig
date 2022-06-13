import { useXML } from './xml';
import { useJSON } from './json';
import { useTOML } from './toml';
import { useYAML } from './yaml';
import { useJSModule } from './json';

export type ParseType = {
	name: string;
	validExtensions: string[];
	parser: (a: any) => object;
}

export const ParseTypes: ParseType[] = [
	{
		name: 'yaml',
		validExtensions: ['yml', 'yaml'],
		parser: useYAML
	},
	{
		name: 'json',
		validExtensions: ['json', 'jsonp'],
		parser: useJSON
	},
	{
		name: 'js',
		validExtensions: ['js', 'esm', 'cjs'],
		parser: useJSModule
	},
	{
		name: 'xml',
		validExtensions: ['xml'],
		parser: useXML
	},
	{
		name: 'toml',
		validExtensions: ['toml'],
		parser: useTOML
	}
]

export type ParserOptions = {
	allowedTypes ?: string[];
	baseTag ?: string;
	basePath ?: string;
	pattern	?: string;
	cleanResponse ?: boolean;
}
