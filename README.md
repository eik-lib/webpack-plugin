# @eik/webpack-plugin

Plugin to rewrite bare imports to URLs as defined in import maps

WebPack [Eik](https://eik.dev/) plugin to support the use of import maps to map "bare" import specifiers in ES modules.

## Installation

```bash
npm install @eik/webpack-plugin
```

## Usage

```js
export default {
	experiments: {
		outputModule: true,
	},
	entry: "/src/input.js",
	mode: "production",
	output: {
		environment: {
			module: true,
		},
		filename: "bundle.js",
		path: "/out/",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "@eik/webpack-plugin",
					options: {
						path: "/path/to/eik-json-folder",
					},
				},
			},
		],
	},
};
```

## Description

This plugin transforms "bare" import specifiers to absolute URL specifiers in
ES modules. The module refered to by the "bare" import specifier will be
treated as external and its source will not be included in the bundle but
refered to by URL.

The plugin will attempt to read import map URLs from `eik.json` if present.

The path to the location of an `eik.json` file can be specified with the `path` option.

```js
export default {
	//...
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "@eik/webpack-plugin",
					options: {
						path: "/path/to/eik-json-folder",
					},
				},
			},
		],
	},
};
```

The plugin can also be told which URLs to load import maps from directly using the `urls` option.

```js
export default {
	//...
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "@eik/webpack-plugin",
					options: {
						urls: ["http://myserver/import-map"],
					},
				},
			},
		],
	},
};
```

Additionally, individual mappings can be specified using the `maps` option.

```js
export default {
	//...
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "@eik/webpack-plugin",
					options: {
						maps: [
							{
								imports: {
									"lit-element": "https://cdn.eik.dev/lit-element/v2",
								},
							},
						],
					},
				},
			},
		],
	},
};
```

If several of these options are used, `maps` takes precedence over `urls` which takes precedence over values loaded from an `eik.json` file.

ie. in the following example

```js
export default {
	//...
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "@eik/webpack-plugin",
					options: {
						path: "/path/to/eik-json-folder",
						urls: ["http://myserver/import-map"],
						maps: [
							{
								imports: {
									"lit-element": "https://cdn.eik.dev/lit-element/v2",
								},
							},
						],
					},
				},
			},
		],
	},
};
```

Any import map URLs in `eik.json` will be loaded first, then merged with (and overridden if necessary by) the result of fetching from `http://myserver/import-map` before finally being merged with (and overriden if necessary by) specific mappings defined in `maps`. (In this case `lit-element`)

### Plugin result

Bundles will have bare imports mapped to absolute URLs.

Ie. Something like this...

```js
import { LitElement, html, css } from "lit-element";
```

Will be mapped to something like this...

```js
import { LitElement, html, css } from "https://cdn.eik.dev/lit-element/v2";
```

## Options

This plugin takes the following options:

| option | default        | type     | required | details                                 |
| ------ | -------------- | -------- | -------- | --------------------------------------- |
| path   | `cwd/eik.json` | `string` | `false`  | Path to eik.json file.                  |
| urls   | `[]`           | `array`  | `false`  | Array of import map URLs to fetch from. |
| maps   | `[]`           | `array`  | `false`  | Array of import map as objects.         |

## Note on ESM with WebPack

This plugin will only apply import maps to ESM modules. Due to this its more or less given that the source of your build must be ESM and that your build output is ESM. WebPack does **not** by default output ESM so this needs to be configured.

You enable ESM output in WebPack as follows ([reference](https://webpack.js.org/configuration/output/#outputmodule)):

```js
export default {
	//...
	experiments: {
		outputModule: true,
	},
	output: {
		environment: {
			module: true,
		},
	},
};
```

## License

See license file.
