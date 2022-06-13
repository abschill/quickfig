export function useINI(
	input: string
) {
	const INI_REG_GROUP = /^\s*\[(.+?)\]\s*$/;
	const INI_REG_PROP = /^\s*([^#].*?)\s*=\s*(.*?)\s*$/;
	const args = {};
	const lines = input?.split('\n');
	let group;
	let match;

	for(let i = 0, len = lines?.length; i !== len; i++) {
		if(match = lines[i]?.match(INI_REG_GROUP))
			args[match[1]] = group = args[match[1]] || {};
		else if(group && (match = lines[i]?.match(INI_REG_PROP)))
			group[match[1]] = match[2];
	}

	return args;
}
