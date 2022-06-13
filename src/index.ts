import { resolve } from 'path';
import { sync } from 'glob';
import { readFileSync } from 'fs';
import {
	ParserOptions,
	ParseTypes
} from './types';

export function useConfig(
	options ?: ParserOptions
) {
	const {
		basePath = process.cwd(),
		cleanResponse = true,
		pattern = '*.*',
		baseTag = null,
		allowedTypes = ['xml', 'yaml', 'js', 'json', 'toml']
	} = options;

	const keyring = [];
	const files = sync(pattern, { cwd: basePath });
	const parserTypes = allowedTypes.map(t => ParseTypes.filter(pt => pt.validExtensions.includes(t))).flat();
	parserTypes.forEach(pt => {
		const fileFilter = files.filter(f => pt.validExtensions.filter(ve => f.split('.').pop() === ve).length > 0);
		if(fileFilter.length === 0) {
			return;
		}
		const mappedFiles = fileFilter.map(f => {
			const p = resolve(basePath, f);
			const content = pt.name === 'js' ? pt.parser(p) : pt.parser(readFileSync(p, 'utf-8'));
			return baseTag ? {
				path: p,
				type: pt,
				content: content[baseTag]
			} : {
				path: p,
				type: pt,
				content
			}
		});
		keyring.push(mappedFiles);
	});
	const flat = keyring.flat();
	if(cleanResponse) {
		return flat.length === 1 ? flat[0].content : flat.map(f => f.content);
	}
	return flat.length === 1 ? flat[0] : flat;
}
