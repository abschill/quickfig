import { join } from 'path';
import {
	readdirSync,
	readFileSync
} from 'fs';
import {
	useXML,
	useJSON,
	useINI,
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
		name: 'javascript',
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
	},
	{
		name: 'ini',
		validExtensions: ['ini', ''],
		parser: useINI
	}
]


export type ParserOptions = {
	allowedTypes ?: ParseType['name'][];
	baseTag ?: string;
	configPath ?: string;
}

const useDir = (name: string) => readdirSync(name);

export function useConfig(
	options ?: ParserOptions
) {
	const acc = [];
	const { configPath = process.cwd(), types = ['json'] } = {...options};
	const files = useDir(configPath);
	const parserTypes = types.map(t => ParseTypes.filter(pt => pt.name === t).shift());
	files.forEach(file => {
		if(types.includes(file.split('.')?.pop())) {
			const fpath = join(configPath, file);
			const matcher = types.filter(t => file.includes(t)).shift();
			if(parserTypes.map(pt => pt.name).includes(matcher)) {
				const parsedType = parserTypes.filter(pt => pt.name === matcher).shift();
				const contentString = readFileSync(fpath, 'utf-8');
				let data;
				if(parsedType.name !== 'javascript') {
					data = parsedType.parser(contentString);
				}
				else {
					data = parsedType.parser(fpath);
				}
				if(options.baseTag && (parsedType.name !== 'ini')) return acc.push(data[options.baseTag]);
				return acc.push(data);
			}
		}
	});
	return acc;
}
