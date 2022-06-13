const { useConfig } = require('./build');

console.log(useConfig({
    dir: '__fixtures__',
    types: [
	'xml'
    ],
    baseTag: 'config'
}));
