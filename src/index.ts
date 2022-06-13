import {
	readdirSync,
	readFileSync
} from 'fs';
import {
	join,
	resolve
} from 'path';
import {
	useXML,
	useJSON,
	useINI,
	useTOML,
	useYAML,
	useJSModule
} from './types';

export type FileType = 'yml' | 'toml' | 'yaml' | 'xml' | 'json' | 'js' | 'ini' | string;

export type ParserOptions = {
	baseTag ?: string;
	dir ?: string;
	types ?: FileType[];
}

const useDir = (name: string) => readdirSync(name);

function make(
	matcher: FileType,
	path: string,
	resolved: any
) {
	return {
		type: matcher,
		path,
		resolved
	};
}

function _resolve(
	file: string,
	matcher: FileType,
	fpath: string,
	acc: any[],
	options: ParserOptions
) {
	if(file.includes(matcher)) {
		const contentString = readFileSync(fpath, 'utf-8');
		switch(matcher) {
			case 'xml':
				if(options.baseTag) return acc.push(make(matcher, fpath, useXML(contentString)[options.baseTag]));
				return acc.push(make(matcher, fpath, useXML(contentString)));
			case 'json':
				if(options.baseTag) return acc.push(make(matcher, fpath, useJSON(contentString)[options.baseTag]));
				return acc.push(make(matcher, fpath, useJSON(contentString)));
			case 'js':
				if(options.baseTag) return acc.push(make(matcher, fpath, useJSModule(resolve(process.cwd(), fpath))[options.baseTag]));
				return acc.push(useJSModule(resolve(process.cwd(), fpath)));
			case 'toml':
				if(options.baseTag) return acc.push(make(matcher, fpath, useTOML(contentString)[options.baseTag]));
				return acc.push(make(matcher, fpath, useTOML(contentString)));
			case 'yaml':
			case 'yml':
				if(options.baseTag) return acc.push(make(matcher, fpath, useYAML(contentString)[options.baseTag]));
				return acc.push(make(matcher, fpath, useYAML(contentString)));
			case 'ini':
				// no options root feature in ini configs
				return acc.push(make(matcher, fpath, useINI(contentString)));
			default:
				break;
		}
	}
}

export function useConfig(
	options ?: ParserOptions
) {
	const discoveredConfigs = [];
	const { dir = process.cwd(), types = ['json'] } = {...options};
	const files = useDir(dir);
	files.forEach(file => {
		if(types.includes(file.split('.')?.pop())) {
			const fpath = join(dir, file);
			const matchedType = types.filter(t => file.includes(t)).shift();
			_resolve(file, matchedType, fpath, discoveredConfigs, options);
		}
	});
	return discoveredConfigs;
}
