const standardImport = (flags = 'sgm') => new RegExp('(import)\\s*([\\w{},\\n\\s\\[\\]\\*\\.]+?)\\s*(from)\\s*[\'"]([\\w@\\-\\./]+?)[\'"]', flags);
module.exports.standardImport = standardImport;

const dynamicImport = (flags = 'gm') => new RegExp('(import)[(][\'"](.+?)[\'"][)]', flags);
module.exports.dynamicImport = dynamicImport;

const sideEffectsImport = (flags = 'gm') => new RegExp('(import)\\s*[\'"](.+?)[\'"]', flags);
module.exports.sideEffectsImport = sideEffectsImport;
