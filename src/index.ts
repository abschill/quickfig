import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import {
	useXML,
	useJSON,
	useINI,
	useTOML,
	useYAML
} from './types';

const useDir = (name: string) => readdirSync(name);

function _checkType(
	file: string,
	matcher: string,
	fpath: string,
	acc: any[]
) {
	if(file.includes(matcher)) {
		const contentString = readFileSync(fpath, 'utf-8');
		switch(matcher) {
			case 'xml':
				acc.push(useXML(contentString));
				break;
			case 'json':
				acc.push(useJSON(contentString));
				break;
			case 'toml':
				acc.push(useTOML(contentString));
				break;
			case 'yaml':
			case 'yml':
				acc.push(useYAML(contentString));
			case 'ini':
				acc.push(useINI(contentString));
			default:
				break;
		}
	}
	return;
}

export function useConfig(
	options ?: {
		types ?: string[];
		dir ?: string // directory to look in for a valid match
	}
) {
	const discoveredConfigs = [];
	const { dir = process.cwd(), types = ['json'] } = {...options};
	const files = useDir(dir);
	files.forEach(file => {

		if(types.includes(file.split('.')?.pop())) {
			const fpath = join(dir, file);
			const matchedType = types.filter(t => file.includes(t)).shift();
			_checkType(file, matchedType, fpath, discoveredConfigs);
		}
	});
	return discoveredConfigs;
}
