/**
 * Whether or not a string looks like a bare import.
 * @param {string} str
 * @returns {boolean}
 */
export const isBare = (str) => {
	if (
		str.startsWith("/") ||
		str.startsWith("./") ||
		str.startsWith("../") ||
		str.substr(0, 7) === "http://" ||
		str.substr(0, 8) === "https://"
	) {
		return false;
	}
	return true;
};

/**
 * Runs typeof
 * @param {any} str
 * @returns {boolean}
 */
export const isString = (str) => typeof str === "string";

/**
 * @typedef {object} ImportMap
 * @property {Record<string, string>} imports
 */

/**
 * @param {ImportMap} map
 * @returns {Array<{ key: string; value: string; }>}
 */
export const validate = (map) =>
	Object.keys(map.imports).map((key) => {
		const value = map.imports[key];

		if (isBare(value)) {
			throw Error(
				`Import specifier can NOT be mapped to a bare import statement. Import specifier "${key}" is being wrongly mapped to "${value}"`,
			);
		}

		return { key, value };
	});
