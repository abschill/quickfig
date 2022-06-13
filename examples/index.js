const { useConfig } = require('../build');

const { log } = console;
const base = { baseTag: 'config' };

// parse xml only
const xmlConfig = useConfig({
	pattern: '__fixtures__/*.xml',
	allowedTypes: ['xml'],
	...base
});
log('\nxml example:');
log(xmlConfig);

// parse toml only
const tomlConfig = useConfig({
	pattern: '__fixtures__/*.toml',
	allowedTypes: ['toml'],
	...base
});
log('\ntoml example:');
log(tomlConfig);

const multiConfig = useConfig({
	pattern: '__fixtures__/*.js*',
	allowedTypes: ['json', 'js'],
	cleanResponse: false, // we want to store the path metadata since we want more than one config option we need to remember where they each came
	...base
});
log('\nmulti example (raw):');
log(multiConfig);

const anyMatchFromType = useConfig({
	basePath: '__fixtures__', // optional start path in lieu of a glob
	allowedTypes: ['json'], // can combine with a type + base tag and ignore pattern completely
	...base
});
log('\ntyped example:');
log(anyMatchFromType);

const anyMatchFromMulti = useConfig({
	basePath: '__fixtures__',
	allowedTypes: ['json', 'xml', 'toml'],
	...base
});
log('\ntyped multi-example:');
log(anyMatchFromMulti);
