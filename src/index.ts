import { resolve } from 'path';
import {
	readdirSync,
	readFileSync
} from 'fs';
import {
	useXML,
	useJSON,
	useTOML,
	useYAML,
	useJSModule
} from './types';

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
	configPath ?: string;
	setEnv	?: boolean;
}

const useDir = (name: string) => readdirSync(name);

export function useConfig(
	options ?: ParserOptions
) {
	const path = options.configPath || process.cwd();
	const keyring = [];
	const files = useDir(path);
	const parserTypes = options.allowedTypes.map(t => ParseTypes.filter(pt => pt.validExtensions.includes(t))).flat();
	parserTypes.forEach(pt => {
		const fileFilter = files.filter(f => pt.validExtensions.filter(ve => f.split('.').pop() === ve).length > 0);
		if(fileFilter.length === 0) {
			return;
		}
		const mappedFiles = fileFilter.map(f => {
			const p = resolve(path, f);
			const content = pt.name === 'js' ? pt.parser(p) : pt.parser(readFileSync(p, 'utf-8'));
			if(!options.baseTag) {
				return {
					path: p,
					content
				}
			}
			return {
				path: p,
				content: content[options.baseTag]
			}
		});
		keyring.push(mappedFiles);
	});
	return keyring.flat();
}
