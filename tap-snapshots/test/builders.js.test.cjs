/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/builders.js TAP .dynamicImport() - Replace module name > should replaced matched values with dictionary values 1`] = `

        var a = import('./REPLACED-A.js')
        let b = await import('module-b');
        import('./REPLACED-C.js').then((module) => {
            // Do something with the module.
        });
    
`

exports[`test/builders.js TAP .sideEffectsImport() - Replace module name > should replaced matched values with dictionary values 1`] = `

        import './REPLACED-A.js';import 'module-b'
        import './REPLACED-C.js';
    
`

exports[`test/builders.js TAP .standardImport() - Replace module name > should replaced matched values with dictionary values 1`] = `

        import { export1 } from './REPLACED-A.js';
        import {export2} from 'module-b';
        import { 
            export3,
            export4,
        } from './REPLACED-C.js';
        
`
