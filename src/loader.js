import { helpers } from "@eik/common";
import * as utils from "./utils.js";
import {
	standardImport,
	dynamicImport,
	sideEffectsImport,
} from "./builders.js";

const dictionary = new Map();
let cold = true;

/**
 * @typedef {object} ImportMap
 * @property {Record<string, string>} imports
 */

/**
 * @param {string} source
 */
export default async function loader(source) {
	const options = this.getOptions();
	const callback = this.async();

	if (cold) {
		/** @type {string} */
		const pPath = options.path ? options.path : process.cwd();
		/** @type {import("./utils.js").ImportMap[]} */
		const pMaps = Array.isArray(options.maps) ? options.maps : [options.maps];
		/** @type {string[]} */
		const pUrls = Array.isArray(options.urls) ? options.urls : [options.urls];

		// Filter out any empty (undefined, null) values in the option arrays
		const urls = pUrls.filter((item) => {
			if (item) return true;
			return false;
		});

		const maps = pMaps.filter((item) => {
			if (item) return true;
			return false;
		});

		// Load eik config from eik.json or package.json
		const eikConfig = await helpers.getDefaults(pPath);

		// Merge map from eik config and the plugin options and Fetch all import maps over http
		const fetchedMaps = await helpers.fetchImportMaps([
			...eikConfig.map,
			...urls,
		]);

		// Validate each import map and push each import statement into a dictionary
		maps
			.concat(fetchedMaps)
			.map((item) => utils.validate(item))
			.forEach((item) => {
				item.forEach((obj) => {
					dictionary.set(obj.key, obj.value);
				});
			});

		// Loading of config and import maps should only happen once
		cold = false;
	}

	new Promise((resolve) => {
		resolve({
			dictionary,
			source,
		});
	})
		.then(standardImport)
		.then(dynamicImport)
		.then(sideEffectsImport)
		.then((obj) => {
			callback(null, obj.source);
		});
}
