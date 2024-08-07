import * as parsers from "./parsers.js";

const RX_SIDE_EFFECTS_IMPORT = parsers.sideEffectsImport();
const RX_STANDARD_IMPORT = parsers.standardImport();
const RX_DYNAMIC_IMPORT = parsers.dynamicImport();

/**
 * @typedef {object} BuilderParams
 * @property {Map<string, string>} [dictionary]
 * @property {string} [source]
 */

/**
 * @param {BuilderParams} params
 * @returns {BuilderParams}
 */
export const standardImport = ({ dictionary = new Map(), source = "" }) => {
	const result = source.replace(
		RX_STANDARD_IMPORT,
		(replacer, g1, g2, g3, g4) => {
			const dep = dictionary.get(g4) || g4;
			return `${g1} ${g2} ${g3} '${dep}'`;
		},
	);

	return {
		source: result,
		dictionary,
	};
};

/**
 * @param {BuilderParams} params
 * @returns {BuilderParams}
 */
export const dynamicImport = ({ dictionary = new Map(), source = "" }) => {
	const result = source.replace(RX_DYNAMIC_IMPORT, (replacer, g1, g2) => {
		const dep = dictionary.get(g2) || g2;
		return `${g1}('${dep}')`;
	});

	return {
		source: result,
		dictionary,
	};
};

/**
 * @param {BuilderParams} params
 * @returns {BuilderParams}
 */
export const sideEffectsImport = ({ dictionary = new Map(), source = "" }) => {
	const result = source.replace(RX_SIDE_EFFECTS_IMPORT, (replacer, g1, g2) => {
		const dep = dictionary.get(g2) || g2;
		return `${g1} '${dep}'`;
	});

	return {
		source: result,
		dictionary,
	};
};
