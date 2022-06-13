const files = ['index.js', 'index.xml'];

const newFiles = files.reduce((acc, cv) => {
	return {...acc, foo: cv};
}, {})

console.log(newFiles)
