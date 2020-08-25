require('es6-promise').polyfill();
require('isomorphic-fetch');
// need to polyfill fetch -- this is node code
export { wrapPageElement, wrapRootElement } from './gatsby-browser';
