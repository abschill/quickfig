# quickfig
![](logo.png)
## configuration format normalizer

parse n config types in a single library/application


## supported formats
js, json, yaml, toml, xml


## optional arguments

- `allowedTypes` list of valid types to parse (from supported formats)
- `baseTag` the tag to destructure from as your config base
- `pattern` the glob pattern to match
- `cleanResponse` defaults to true, and determines if it just returns the config content in the object or the path as well as a key.
it will return a list of matching files, with their paths and content in a javascript object, or a single object if only one file is resolved.

[examples](examples/index.js)
