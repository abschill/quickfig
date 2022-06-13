const { useConfig } = require('./build');

console.log(useConfig({
    configPath: '__fixtures__',
    types: [
	'xml'
    ],
    baseTag: 'config'
}));
