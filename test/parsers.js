import tap from "tap";
import {
  standardImport,
  dynamicImport,
  sideEffectsImport,
} from "../src/parsers.cjs";

// Standard examples from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

tap.test(
  '.standardImport() - import defaultExport from "module-name";',
  (t) => {
    const rx = standardImport("sm");
    const str = 'import defaultExport from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], "import", 'should be the "import" group');
    t.equal(grp[2], "defaultExport", 'should be the "export" group');
    t.equal(grp[4], "module-name", 'should be the "module name" group');
    t.end();
  },
);

tap.test('.standardImport() - import * as name from "module-name";', (t) => {
  const rx = standardImport("sm");
  const str = 'import * as name from "module-name";';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "* as name", 'should be the "export" group');
  t.equal(grp[4], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test('.standardImport() - import { export1 } from "module-name";', (t) => {
  const rx = standardImport("sm");
  const str = 'import { export1 } from "module-name";';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "{ export1 }", 'should be the "export" group');
  t.equal(grp[4], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(
  '.standardImport() - import { export1 as alias1 } from "module-name";',
  (t) => {
    const rx = standardImport("sm");
    const str = 'import { export1 as alias1 } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], "import", 'should be the "import" group');
    t.equal(grp[2], "{ export1 as alias1 }", 'should be the "export" group');
    t.equal(grp[4], "module-name", 'should be the "module name" group');
    t.end();
  },
);

tap.test(
  '.standardImport() - import { export1 , export2 } from "module-name";',
  (t) => {
    const rx = standardImport("sm");
    const str = 'import { export1 , export2 } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], "import", 'should be the "import" group');
    t.equal(grp[2], "{ export1 , export2 }", 'should be the "export" group');
    t.equal(grp[4], "module-name", 'should be the "module name" group');
    t.end();
  },
);

tap.test(
  '.standardImport() - import { export1 , export2 as alias2 , [...] } from "module-name";',
  (t) => {
    const rx = standardImport("sm");
    const str =
      'import { export1 , export2 as alias2 , [...] } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], "import", 'should be the "import" group');
    t.equal(
      grp[2],
      "{ export1 , export2 as alias2 , [...] }",
      'should be the "export" group',
    );
    t.equal(grp[4], "module-name", 'should be the "module name" group');
    t.end();
  },
);

tap.test(
  '.standardImport() - import defaultExport, { export1 [ , [...] ] } from "module-name";',
  (t) => {
    const rx = standardImport("sm");
    const str =
      'import defaultExport, { export1 [ , [...] ] } from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], "import", 'should be the "import" group');
    t.equal(
      grp[2],
      "defaultExport, { export1 [ , [...] ] }",
      'should be the "export" group',
    );
    t.equal(grp[4], "module-name", 'should be the "module name" group');
    t.end();
  },
);

tap.test(
  '.standardImport() - import defaultExport, * as name from "module-name";',
  (t) => {
    const rx = standardImport("sm");
    const str = 'import defaultExport, * as name from "module-name";';
    const grp = str.match(rx);

    t.equal(grp[1], "import", 'should be the "import" group');
    t.equal(grp[2], "defaultExport, * as name", 'should be the "export" group');
    t.equal(grp[4], "module-name", 'should be the "module name" group');
    t.end();
  },
);

tap.test('.dynamicImport() - var promise = import("module-name");', (t) => {
  const rx = dynamicImport("m");
  const str = 'var promise = import("module-name");';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test('.sideEffectsImport() - import "module-name";', (t) => {
  const rx = sideEffectsImport("m");
  const str = 'import "module-name";';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

// Different formating structures

tap.test(".standardImport() - No spacing", (t) => {
  const rx = standardImport("sm");
  const str = 'import{export1}from"module-name";';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "{export1}", 'should be the "export" group');
  t.equal(grp[4], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".standardImport() - Single qoutes", (t) => {
  const rx = standardImport("sm");
  const str = "import { export1 } from 'module-name';";
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "{ export1 }", 'should be the "export" group');
  t.equal(grp[4], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".standardImport() - Missing ending semicolon", (t) => {
  const rx = standardImport("sm");
  const str = 'import { export1 } from "module-name"';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "{ export1 }", 'should be the "export" group');
  t.equal(grp[4], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test('.standardImport() - Multiline "export" values', (t) => {
  const rx = standardImport("sm");
  const str = `import {
        export1,
        export2,
        export3,
    } from "module-name";`;
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.matchSnapshot(grp[2], 'should be the "export" group');
  t.equal(grp[4], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".standardImport() - Multiple import statements on new lines", (t) => {
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

  t.equal(grp[0][1], "import", 'should be the "import" group');
  t.equal(
    grp[0][2],
    "{ export1 }",
    'should be the "export" group of the 1st import',
  );
  t.equal(
    grp[0][4],
    "module-a",
    'should be the "module name" group of the 1st import',
  );

  t.equal(grp[1][1], "import", 'should be the "import" group');
  t.equal(
    grp[1][2],
    "{export2}",
    'should be the "export" group of the 2nd import',
  );
  t.equal(
    grp[1][4],
    "module-b",
    'should be the "module name" group of the 2nd import',
  );

  t.equal(grp[2][1], "import", 'should be the "import" group');
  t.matchSnapshot(grp[2][2], 'should be the "export" group');
  t.equal(
    grp[2][4],
    "module-c",
    'should be the "module name" group of the 3rd import',
  );
  t.end();
});

tap.test(".standardImport() - Multiple import statements concatinated", (t) => {
  const rx = standardImport();
  const str = `
        import{ export1 }from "module-a";import {export2} from"module-b"import {
            export3,
            export4,
        } from "module-c";
        `;
  const grp = [...str.matchAll(rx)];

  t.equal(grp[0][1], "import", 'should be the "import" group');
  t.equal(
    grp[0][2],
    "{ export1 }",
    'should be the "export" group of the 1st import',
  );
  t.equal(
    grp[0][4],
    "module-a",
    'should be the "module name" group of the 1st import',
  );

  t.equal(grp[1][1], "import", 'should be the "import" group');
  t.equal(
    grp[1][2],
    "{export2}",
    'should be the "export" group of the 2nd import',
  );
  t.equal(
    grp[1][4],
    "module-b",
    'should be the "module name" group of the 2nd import',
  );

  t.equal(grp[2][1], "import", 'should be the "import" group');
  t.matchSnapshot(grp[2][2], 'should be the "export" group');
  t.equal(
    grp[2][4],
    "module-c",
    'should be the "module name" group of the 3rd import',
  );
  t.end();
});

tap.test(".standardImport() - is lazy", (t) => {
  const rx = standardImport();
  const str =
    'imported to know which is which from "f asfasdf asdfasdf asdfasdf adsfasdf"';
  const grp = str.match(rx);
  t.equal(grp, null, `should not match ${str}`);
  t.end();
});

tap.test(".standardImport() - importStar case", (t) => {
  const rx = standardImport("sm");
  const str =
    'importStar:hf,__importDefault:bf,__classPrivateFieldGet:vf,__classPrivateFieldSet:gf,__classPrivateFieldIn:yf}=ho.default;function vo(e){return e}function go(e,t){t===void 0&&(t=vo);var r=[],n=!1,o={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return r.length?r[r.length-1]:e},useMedium:function(i){var a=t(i,n);return r.push(a),function(){r=r.filter(function(l){return l!==a})}},assignSyncMedium:function(i){for(n=!0;r.length;){var a=r;r=[],a.forEach(i)}r={push:function(l){return i(l)},filter:function(){return r}}},assignMedium:function(i){n=!0;var a=[];if(r.length){var l=r;r=[],l.forEach(i),a=r}var s=function(){var u=a;a=[],u.forEach(i)},c=function(){return Promise.resolve().then(s)};c(),r={push:function(u){a.push(u),c()},filter:function(u){return a=a.filter(u),r}}}};return o}function Ze(e,t){return t===void 0&&(t=vo),go(e,t)}function br(e){e===void 0&&(e={});var t=go(null);return t.options=bo({async:!0,ssr:!1},e),t}var Ct=Ze({},function(e){var t=e.target,r=e.currentTarget;return{target:t,currentTarget:r}}),Pt=Ze(),yo=Ze(),xo=br({async:!0});var Ha=[],vr=O.forwardRef(function(t,r){var n,o=O.useState(),i=o[0],a=o[1],l=O.useRef(),s=O.useRef(!1),c=O.useRef(null),u=t.children,f=t.disabled,d=t.noFocusGuards,m=t.persistentFocus,p=t.crossFrame,h=t.autoFocus,v=t.allowTextSelection,g=t.group,y=t.className,w=t.whiteList,E=t.hasPositiveIndices,A=t.shards,I=A===void 0?Ha:A,q=t.as,D=q===void 0?"div":q,N=t.lockProps,S=N===void 0?{}:N,$=t.sideCar,K=t.returnFocus,W=t.focusOptions,M=t.onActivation,V=t.onDeactivation,Ee=O.useState({}),L=Ee[0],Bt=O.useCallback(function(){c.current=c.current||document&&document.activeElement,l.current&&M&&M(l.current),s.current=!0},[M]),jt=O.useCallback(function(){s.current=!1,V&&V(l.current)},[V]);Ma(function(){f||(c.current=null)},[]);var De=O.useCallback(function(z){var ue=c.current;if(ue&&ue.focus){var Wt=typeof K=="function"?K(ue):K;if(Wt){var $r=typeof Wt=="object"?Wt:void 0;c.current=null,z?Promise.resolve().then(function(){return ue.focus($r)}):ue.focus($r)}}},[K]),it=O.useCallback(function(z){s.current&&Ct.useMedium(z)},[]),at=Pt.useMedium,lt=O.useCallback(function(z){l.current!==z&&(l.current=z,a(z))},[]),st=pe((n={},n[wt]=f&&"disabled",n[Xe]=g,n),S),T=d!==!0,U=T&&d!=="tail",ce=pr([r,lt]);return O.createElement(O.Fragment,null,T&&[O.createElement("div",{key:"guard-first","data-focus-guard":!0,tabIndex:f?-1:0,style:Ae}),E?O.createElement("div",{key:"guard-nearest","data-focus-guard":!0,tabIndex:f?-1:1,style:Ae}):null],!f&&O.createElement($,{id:L,sideCar:xo,observed:i,disabled:f,persistentFocus:m,crossFrame:p,autoFocus:h,whiteList:w,shards:I,onActivation:Bt,onDeactivation:jt,returnFocus:De,focusOptions:W}),O.createElement(D,pe({ref:ce},st,{className:y,onBlur:at,onFocus:it}),u),U&&O.createElement("div",{"data-focus-guard":!0,tabIndex:f?-1:0,style:Ae}))});vr.propTypes={};vr.defaultProps={children:void 0,disabled:!1,returnFocus:!1,focusOptions:void 0,noFocusGuards:!1,autoFocus:!0,persistentFocus:!1,crossFrame:!0,hasPositiveIndices:void 0,allowTextSelection:void 0,group:void 0,className:void 0,whiteList:void 0,shards:void 0,as:"div",lockProps:{},onActivation:void 0,onDeactivation:void 0};var gr=vr;import*as jo from"react"';
  const grp = str.match(rx);

  t.not(grp, null, `should match ${str}`);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "*as jo", 'should be the "export" group');
  t.equal(grp[4], "react", 'should be the "module name" group');
  t.end();
});

tap.test(".dynamicImport() - Single qoutes", (t) => {
  const rx = dynamicImport("m");
  const str = "var promise = import('module-name');";
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".dynamicImport() - No ending semicolon", (t) => {
  const rx = dynamicImport("m");
  const str = 'var promise = import("module-name")';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".dynamicImport() - With async await", (t) => {
  const rx = dynamicImport("m");
  const str = 'var promise = await import("module-name");';
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".dynamicImport() - As promise chain", (t) => {
  const rx = dynamicImport("m");
  const str = `import('module-name').then((module) => {
      // Do something with the module.
    });`;
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".dynamicImport() - Multiple imports", (t) => {
  const rx = dynamicImport();
  const str = `
        var a = import("module-a")
        let b = await import("module-b");
        import('module-c').then((module) => {
            // Do something with the module.
        });
    `;
  const grp = [...str.matchAll(rx)];

  t.equal(grp[0][1], "import", 'should be the "import" group');
  t.equal(
    grp[0][2],
    "module-a",
    'should be the "module name" group of the 1st import',
  );

  t.equal(grp[1][1], "import", 'should be the "import" group');
  t.equal(
    grp[1][2],
    "module-b",
    'should be the "module name" group of the 2nd import',
  );

  t.equal(grp[2][1], "import", 'should be the "import" group');
  t.equal(
    grp[2][2],
    "module-c",
    'should be the "module name" group of the 3rd import',
  );
  t.end();
});

tap.test('.sideEffectsImport() - Single qoutes";', (t) => {
  const rx = sideEffectsImport("m");
  const str = "import 'module-name';";
  const grp = str.match(rx);

  t.equal(grp[1], "import", 'should be the "import" group');
  t.equal(grp[2], "module-name", 'should be the "module name" group');
  t.end();
});

tap.test(".sideEffectsImport() - Multiple imports", (t) => {
  const rx = sideEffectsImport();
  const str = `
        import 'module-a';import 'module-b'
        import "module-c";
    `;
  const grp = [...str.matchAll(rx)];

  t.equal(grp[0][1], "import", 'should be the "import" group');
  t.equal(
    grp[0][2],
    "module-a",
    'should be the "module name" group of the 1st import',
  );

  t.equal(grp[1][1], "import", 'should be the "import" group');
  t.equal(
    grp[1][2],
    "module-b",
    'should be the "module name" group of the 2nd import',
  );

  t.equal(grp[2][1], "import", 'should be the "import" group');
  t.equal(
    grp[2][2],
    "module-c",
    'should be the "module name" group of the 3rd import',
  );
  t.end();
});
