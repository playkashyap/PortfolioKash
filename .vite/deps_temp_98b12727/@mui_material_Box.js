import "./chunk-DFJ4TRTQ.js";
import "./chunk-OUJW3BMF.js";
import "./chunk-TQTB2ZWT.js";
import {
  ClassNameGenerator_default,
  createBox,
  createTheme_default,
  identifier_default,
  init_esm,
  init_esm2,
  init_identifier
} from "./chunk-BCWOERXC.js";
import "./chunk-4XWBUGSW.js";
import {
  require_prop_types
} from "./chunk-FJ2DDJHN.js";
import "./chunk-INE522DN.js";
import "./chunk-FLAVOKRJ.js";
import {
  __toESM
} from "./chunk-AC2VUBZ6.js";

// node_modules/@mui/material/Box/Box.js
init_esm2();
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/className/index.js
init_esm();

// node_modules/@mui/material/Box/Box.js
init_identifier();
var defaultTheme = createTheme_default();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme,
  defaultClassName: "MuiBox-root",
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;
export {
  Box_default as default
};
//# sourceMappingURL=@mui_material_Box.js.map
