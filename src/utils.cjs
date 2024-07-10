const { request } = require("undici");

const isBare = (str) => {
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
module.exports.isBare = isBare;

const isString = (str) => typeof str === "string";
module.exports.isString = isString;

const validate = (map) =>
  Object.keys(map.imports).map((key) => {
    const value = map.imports[key];

    if (isBare(value)) {
      throw Error(
        `Import specifier can NOT be mapped to a bare import statement. Import specifier "${key}" is being wrongly mapped to "${value}"`,
      );
    }

    return { key, value };
  });
module.exports.validate = validate;

const fetchImportMaps = async (urls = []) => {
  try {
    const maps = urls.map(async (map) => {
      const { statusCode, body } = await request(map, { maxRedirections: 2 });

      if (statusCode === 404) {
        throw new Error("Import map could not be found on server");
      } else if (statusCode >= 400 && statusCode < 500) {
        throw new Error("Server rejected client request");
      } else if (statusCode >= 500) {
        throw new Error("Server error");
      }

      return body.json();
    });
    return await Promise.all(maps);
  } catch (err) {
    throw new Error(
      `Unable to load import map file from server: ${err.message}`,
    );
  }
};
module.exports.fetchImportMaps = fetchImportMaps;
