const { useConfig } = require('../build');

const base = { configPath: '__fixtures__', baseTag: 'config' };

// parse xml only
const xmlConfig = useConfig({
	allowedTypes: ['xml'],
	...base
});

console.log(xmlConfig);

// parse toml only
const tomlConfig = useConfig({
	allowedTypes: ['toml'],
	...base
});

console.log(tomlConfig);

const multiConfig = useConfig({
	allowedTypes: ['json', 'js'],
	...base
});

console.log(multiConfig);
