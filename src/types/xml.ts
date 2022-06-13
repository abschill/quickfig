import { XMLValidator, XMLParser } from 'fast-xml-parser';

export function isValidXML(
	input: string
): boolean{
	return <boolean>XMLValidator.validate(input, {
		allowBooleanAttributes: true
	});
}

export function useXML(
	input: string
) {
	// todo - make cleaner error msg
	if(!isValidXML(input)) {
		throw 'invalid xml';
	}
	const parser = new XMLParser();
	return parser.parse(input);
}
