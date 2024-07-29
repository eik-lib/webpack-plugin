export const standardImport = (flags = "sgm") =>
  new RegExp(
    "(import)\\s*([\\w{},\\n\\s\\[\\]\\*\\.]+?)\\s*(from)\\s*['\"]([\\w@\\-\\./]+?)['\"]",
    flags,
  );

export const dynamicImport = (flags = "gm") =>
  new RegExp("(import)[(]['\"](.+?)['\"][)]", flags);

export const sideEffectsImport = (flags = "gm") =>
  new RegExp("(import)\\s*['\"](.+?)['\"]", flags);
