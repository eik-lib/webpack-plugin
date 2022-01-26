import tap from 'tap';
import { standardImport, dynamicImport, sideEffectsImport } from '../src/parsers.cjs';

// Standard examples from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

tap.test('.standardImport() - import defaultExport from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import defaultExport from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'defaultExport', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import * as name from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import * as name from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '* as name', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import { export1 } from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import { export1 } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{ export1 }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import { export1 as alias1 } from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import { export1 as alias1 } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{ export1 as alias1 }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import { export1 , export2 } from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import { export1 , export2 } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{ export1 , export2 }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import { export1 , export2 as alias2 , [...] } from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import { export1 , export2 as alias2 , [...] } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{ export1 , export2 as alias2 , [...] }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import defaultExport, { export1 [ , [...] ] } from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import defaultExport, { export1 [ , [...] ] } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'defaultExport, { export1 [ , [...] ] }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - import defaultExport, * as name from "module-name";', (t) => {
    const rx = standardImport('sm');
    const str = 'import defaultExport, * as name from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'defaultExport, * as name', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.dynamicImport() - var promise = import("module-name");', (t) => {
    const rx = dynamicImport('m');
    const str = 'var promise = import("module-name");';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.sideEffectsImport() - import "module-name";', (t) => {
    const rx = sideEffectsImport('m');
    const str = 'import "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

// Different formating structures

tap.test('.standardImport() - No spacing', (t) => {
    const rx = standardImport('sm');
    const str = 'import{export1}from"module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{export1}', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - Single qoutes', (t) => {
    const rx = standardImport('sm');
    const str = 'import { export1 } from \'module-name\';';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{ export1 }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - Missing ending semicolon', (t) => {
    const rx = standardImport('sm');
    const str = 'import { export1 } from "module-name"';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], '{ export1 }', 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - Multiline "export" values', (t) => {
    const rx = standardImport('sm');
    const str = `import {
        export1,
        export2,
        export3,
    } from "module-name";`;
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.matchSnapshot(grp[2], 'should be the "export" group');
    t.equal(grp[4], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.standardImport() - Multiple import statements on new lines', (t) => {
    const rx = standardImport();
    const str = `
        import{ export1 }from "module-a";
        import {export2} from"module-b"
        import { 
            export3,
            export4,
        } from "module-c";
        `;
    const grp = [...str.matchAll(rx)];

    t.equal(grp[0][1], 'import', 'should be the "import" group');
    t.equal(grp[0][2], '{ export1 }', 'should be the "export" group of the 1st import');
    t.equal(grp[0][4], 'module-a', 'should be the "module name" group of the 1st import');

    t.equal(grp[1][1], 'import', 'should be the "import" group');
    t.equal(grp[1][2], '{export2}', 'should be the "export" group of the 2nd import');
    t.equal(grp[1][4], 'module-b', 'should be the "module name" group of the 2nd import');

    t.equal(grp[2][1], 'import', 'should be the "import" group');
    t.matchSnapshot(grp[2][2], 'should be the "export" group');
    t.equal(grp[2][4], 'module-c', 'should be the "module name" group of the 3rd import');
    t.end();
});

tap.test('.standardImport() - Multiple import statements concatinated', (t) => {
    const rx = standardImport();
    const str = `
        import{ export1 }from "module-a";import {export2} from"module-b"import { 
            export3,
            export4,
        } from "module-c";
        `;
    const grp = [...str.matchAll(rx)];

    t.equal(grp[0][1], 'import', 'should be the "import" group');
    t.equal(grp[0][2], '{ export1 }', 'should be the "export" group of the 1st import');
    t.equal(grp[0][4], 'module-a', 'should be the "module name" group of the 1st import');

    t.equal(grp[1][1], 'import', 'should be the "import" group');
    t.equal(grp[1][2], '{export2}', 'should be the "export" group of the 2nd import');
    t.equal(grp[1][4], 'module-b', 'should be the "module name" group of the 2nd import');

    t.equal(grp[2][1], 'import', 'should be the "import" group');
    t.matchSnapshot(grp[2][2], 'should be the "export" group');
    t.equal(grp[2][4], 'module-c', 'should be the "module name" group of the 3rd import');
    t.end();
});

tap.test('.dynamicImport() - Single qoutes', (t) => {
    const rx = dynamicImport('m');
    const str = 'var promise = import(\'module-name\');';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.dynamicImport() - No ending semicolon', (t) => {
    const rx = dynamicImport('m');
    const str = 'var promise = import("module-name")';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.dynamicImport() - With async await', (t) => {
    const rx = dynamicImport('m');
    const str = 'var promise = await import("module-name");';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.dynamicImport() - As promise chain', (t) => {
    const rx = dynamicImport('m');
    const str = `import('module-name').then((module) => {
      // Do something with the module.
    });`;
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.dynamicImport() - Multiple imports', (t) => {
    const rx = dynamicImport();
    const str = `
        var a = import("module-a")
        let b = await import("module-b");
        import('module-c').then((module) => {
            // Do something with the module.
        });
    `;
    const grp = [...str.matchAll(rx)];

    t.equal(grp[0][1], 'import', 'should be the "import" group');
    t.equal(grp[0][2], 'module-a', 'should be the "module name" group of the 1st import');

    t.equal(grp[1][1], 'import', 'should be the "import" group');
    t.equal(grp[1][2], 'module-b', 'should be the "module name" group of the 2nd import');

    t.equal(grp[2][1], 'import', 'should be the "import" group');
    t.equal(grp[2][2], 'module-c', 'should be the "module name" group of the 3rd import');
    t.end();
});

tap.test('.sideEffectsImport() - Single qoutes";', (t) => {
    const rx = sideEffectsImport('m');
    const str = 'import \'module-name\';';
    const grp = str.match(rx);

    t.equal(grp[1], 'import', 'should be the "import" group');
    t.equal(grp[2], 'module-name', 'should be the "module name" group');
    t.end();
});

tap.test('.sideEffectsImport() - Multiple imports', (t) => {
    const rx = sideEffectsImport();
    const str = `
        import 'module-a';import 'module-b'
        import "module-c";
    `;
    const grp = [...str.matchAll(rx)];

    t.equal(grp[0][1], 'import', 'should be the "import" group');
    t.equal(grp[0][2], 'module-a', 'should be the "module name" group of the 1st import');

    t.equal(grp[1][1], 'import', 'should be the "import" group');
    t.equal(grp[1][2], 'module-b', 'should be the "module name" group of the 2nd import');

    t.equal(grp[2][1], 'import', 'should be the "import" group');
    t.equal(grp[2][2], 'module-c', 'should be the "module name" group of the 3rd import');
    t.end();
});
