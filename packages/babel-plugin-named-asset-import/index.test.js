const pluginTester = require('babel-plugin-tester/pure');
const namedAssetImport = require('./index');

pluginTester.default({
  plugin: namedAssetImport,
  pluginOptions: {
    loaderMap: {
      svg: {
        InfernoComponent: '@svgr/webpack?-svgo![path]',
      },
    },
  },
  pluginName: 'named-asset-import',
  snapshot: false,
  tests: {
    defaultImport: {
      code: 'import logo from "logo";',
      output: 'import logo from "logo";',
    },
    namedImport: {
      code: 'import { logo } from "logo";',
      output: 'import { logo } from "logo";',
    },
    namedImportRenamed: {
      code: 'import { Url as logo1 } from "logo";',
      output: 'import { Url as logo1 } from "logo";',
    },
    svgDefaultImport: {
      code: 'import logo from "logo.svg";',
      output: 'import logo from "logo.svg";',
    },
    svgNamedImport: {
      code: 'import { logo } from "logo.svg";',
      output: 'import { logo } from "logo.svg";',
    },
    svgInfernoComponentNamedImport: {
      code: 'import { InfernoComponent as logo } from "logo.svg";',
      output:
        'import { InfernoComponent as logo } from "@svgr/webpack?-svgo!logo.svg";',
    },
    svgMultipleImport: {
      code:
        'import logo, { logoUrl , InfernoComponent as Logo } from "logo.svg";',
      output:
        'import logo from "logo.svg";\n' +
        'import { logoUrl } from "logo.svg";\n' +
        'import { InfernoComponent as Logo } from "@svgr/webpack?-svgo!logo.svg";',
    },
    defaultExport: {
      code: 'export default logo;',
      output: 'export default logo;',
    },
    constExport: {
      code: 'export const token = "token";',
      output: 'export const token = "token";',
    },
    classExport: {
      code: 'export class Logo {}',
      output: 'export class Logo {}',
    },
    namedExport: {
      code: 'export { logo } from "logo";',
      output: 'export { logo } from "logo";',
    },
    namedExportRenamed: {
      code: 'export { Url as logo } from "logo";',
      output: 'export { Url as logo } from "logo";',
    },
    allExport: {
      code: 'export * from "logo";',
      output: 'export * from "logo";',
    },
    svgNamedExport: {
      code: 'export { logo } from "logo.svg";',
      output: 'export { logo } from "logo.svg";',
    },
    svgAllExport: {
      code: 'export * from "logo.svg";',
      output: 'export * from "logo.svg";',
    },
    svgInfernoComponentNamedExport: {
      code: 'export { InfernoComponent as Logo } from "logo.svg";',
      output:
        'export { InfernoComponent as Logo } from "@svgr/webpack?-svgo!logo.svg";',
    },
    svgInfernoComponentExport: {
      code: 'export { InfernoComponent } from "logo.svg";',
      output: 'export { InfernoComponent } from "@svgr/webpack?-svgo!logo.svg";',
    },
    svgMultipleExport: {
      code: 'export { logoUrl , InfernoComponent as Logo } from "logo.svg";',
      output:
        'export { logoUrl } from "logo.svg";\n' +
        'export { InfernoComponent as Logo } from "@svgr/webpack?-svgo!logo.svg";',
    },
  },
});
