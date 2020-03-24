declare const IS_TEST: boolean;
declare const IS_ELECTRON: any;
declare const IS_ELECTRON_MAIN: boolean;
declare const IS_ELECTRON_RENDERER: boolean;
declare const IS_NODE: boolean;
/**
 * Detects browser main thread  **NOT** web worker or service worker
 */
declare const IS_BROWSER: boolean;
declare const IS_WEBWORKER: boolean;
declare const IS_ENV_WITH_DOM: boolean;
export { IS_TEST as isTest, IS_ELECTRON as isElectron, IS_ELECTRON_MAIN as isElectronMain, IS_ELECTRON_RENDERER as isElectronRenderer, IS_NODE as isNode, IS_BROWSER as isBrowser, IS_WEBWORKER as isWebWorker, IS_ENV_WITH_DOM as isEnvWithDom };
