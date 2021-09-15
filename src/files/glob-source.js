'use strict'

const fsp = require('fs').promises
const fs = require('fs')
const glob = require('it-glob')
const Path = require('path')
const errCode = require('err-code')

/**
 * Create an async iterator that yields paths that match requested glob pattern
 *
 * @param {string} pattern - Glob pattern to match
 * @param {Object} [options] - Optional options
 * @param {string} [options.cwd] - The directory to start matching the pattern in
 * @param {boolean} [options.hidden] - Include .dot files in matched paths
 * @param {boolean} [options.followSymlinks] - follow symlinks
 * @param {boolean} [options.preserveMode] - preserve mode
 * @param {boolean} [options.preserveMtime] - preserve mtime
 * @param {number} [options.mode] - mode to use - if preserveMode is true this will be ignored
 * @param {import('ipfs-unixfs').MtimeLike} [options.mtime] - mtime to use - if preserveMtime is true this will be ignored
 * @yields {Object} File objects in the form `{ path: String, content: AsyncIterator<Buffer> }`
 */
module.exports = async function * globSource (pattern, options) {
  options = options || {}

  if (typeof pattern !== 'string') {
    throw errCode(
      new Error('Pattern must be a string'),
      'ERR_INVALID_PATH',
      { pattern }
    )
  }

  let cwd = options.cwd

  if (!cwd) {
    if (Path.isAbsolute(pattern)) {
      cwd = Path.dirname(pattern)
      pattern = pattern.replace(cwd + Path.sep, '')
    } else {
      cwd = process.cwd()
    }
  }

  if (pattern.startsWith('.' + Path.sep)) {
    pattern = pattern.replace('.' + Path.sep, '')
  }

  const globOptions = Object.assign({}, pattern, {
    cwd,
    nodir: false,
    realpath: false,
    absolute: true,
    dot: Boolean(options.hidden),
    follow: options.followSymlinks != null ? options.followSymlinks : true
  })

  for await (const p of glob(cwd, pattern, globOptions)) {
    const stat = await fsp.stat(p)

    let mode = options.mode

    if (options.preserveMode) {
      mode = stat.mode
    }

    let mtime = options.mtime

    if (options.preserveMtime) {
      mtime = stat.mtime
    }

    yield {
      path: toPosix(p.replace(cwd, '')),
      content: stat.isFile() ? fs.createReadStream(p) : undefined,
      mode,
      mtime
    }
  }
}

/**
 * @param {string} path
 */
const toPosix = path => path.replace(/\\/g, '/')
