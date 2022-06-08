import {
	readdirSync
} from 'fs';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { parse as tomlParse } from 'toml';
import { parse as ymlParse } from 'yaml';

export function useConfig(
	dir: string // directory to look in for a valid match
) {
	console.log(readdirSync(dir));
}
