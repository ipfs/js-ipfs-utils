/// <reference types="node" />
import { ReadStream } from "fs";
/**
* Create an async iterator that yields paths that match requested file paths.
*
* @param {Iterable|AsyncIterable|String} paths File system path(s) to glob from
* @param {Object} [options] Optional options
* @param {Boolean} [options.recursive] Recursively glob all paths in directories
* @param {Boolean} [options.hidden] Include .dot files in matched paths
* @param {Array<String>} [options.ignore] Glob paths to ignore
* @param {Boolean} [options.followSymlinks] follow symlinks
* @param {Boolean} [options.preserveMode] preserve mode
* @param {Boolean} [options.preserveMtime] preserve mtime
* @param {Boolean} [options.mode] mode to use - if preserveMode is true this will be ignored
* @param {Boolean} [options.mtime] mtime to use - if preserveMtime is true this will be ignored
* @yields {{ path: String, content: AsyncIterator<Buffer> }} File objects in the form `{ path: String, content: AsyncIterator<Buffer> }`
*/
declare function globSource(paths: Iterable<string> | AsyncIterable<string> | string, options: any): AsyncGenerator<{
    path: string;
    content?: ReadStream;
    mode: number;
    mtime: number;
}>;
export = globSource;
