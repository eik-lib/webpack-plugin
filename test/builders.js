import tap from "tap";
import {
  standardImport,
  dynamicImport,
  sideEffectsImport,
} from "../src/builders.cjs";

tap.test(".standardImport() - Replace module name", (t) => {
  const source = `
        import{ export1 }from "module-a";
        import {export2} from 'module-b';
        import { 
            export3,
            export4,
        } from "module-c";
        `;
  const dictionary = new Map([
    ["module-a", "./REPLACED-A.js"],
    ["module-c", "./REPLACED-C.js"],
  ]);

  const result = standardImport({
    dictionary,
    source,
  });

  t.matchSnapshot(
    result.source,
    "should replaced matched values with dictionary values",
  );
  t.end();
});

tap.test(".dynamicImport() - Replace module name", (t) => {
  const source = `
        var a = import("module-a")
        let b = await import("module-b");
        import('module-c').then((module) => {
            // Do something with the module.
        });
    `;
  const dictionary = new Map([
    ["module-a", "./REPLACED-A.js"],
    ["module-c", "./REPLACED-C.js"],
  ]);

  const result = dynamicImport({
    dictionary,
    source,
  });

  t.matchSnapshot(
    result.source,
    "should replaced matched values with dictionary values",
  );
  t.end();
});

tap.test(".sideEffectsImport() - Replace module name", (t) => {
  const source = `
        import 'module-a';import 'module-b'
        import "module-c";
    `;
  const dictionary = new Map([
    ["module-a", "./REPLACED-A.js"],
    ["module-c", "./REPLACED-C.js"],
  ]);

  const result = sideEffectsImport({
    dictionary,
    source,
  });

  t.matchSnapshot(
    result.source,
    "should replaced matched values with dictionary values",
  );
  t.end();
});
