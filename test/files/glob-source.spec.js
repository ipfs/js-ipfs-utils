'use strict'

/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const globSource = require('../../src/files/glob-source')
const all = require('it-all')
const path = require('path')
const {
  isNode
} = require('../../src/env')
const fs = require('fs')

chai.use(dirtyChai)
chai.use(chaiAsPromised)
const expect = chai.expect

describe('glob-source', () => {
  it('single file, relative path', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.relative(process.cwd(), path.join(__dirname, '..', 'fixtures', 'file-0.html'))))

    expect(result.length).to.equal(1)
    expect(result[0].path).to.equal('/file-0.html')
  })

  it('single file, absolute path', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(process.cwd(), path.join(__dirname, '..', 'fixtures', 'file-0.html'))))

    expect(result.length).to.equal(1)
    expect(result[0].path).to.equal('/file-0.html')
  })

  it('directory, relative path', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.relative(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir')), {
      recursive: true
    }))

    expect(result).to.have.lengthOf(4)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[1].path', '/dir/file-1.txt')
    expect(result).to.have.nested.property('[2].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[3].path', '/dir/file-3.css')
  })

  it('directory, hidden files', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir')), {
      recursive: true,
      hidden: true
    }))

    expect(result).to.have.lengthOf(5)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[1].path', '/dir/.hidden.txt')
    expect(result).to.have.nested.property('[2].path', '/dir/file-1.txt')
    expect(result).to.have.nested.property('[3].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[4].path', '/dir/file-3.css')
  })

  it('directory, ignore files', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir')), {
      recursive: true,
      ignore: ['**/file-1.txt']
    }))

    expect(result).to.have.lengthOf(3)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[1].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[2].path', '/dir/file-3.css')
  })

  it('multiple paths', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource([
      path.relative(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir', 'file-1.txt')),
      path.relative(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir', 'file-2.js'))
    ]))

    expect(result).to.have.lengthOf(2)
    expect(result).to.have.nested.property('[0].path', '/file-1.txt')
    expect(result).to.have.nested.property('[1].path', '/file-2.js')
  })

  it('requires recursive flag for directory', async function () {
    if (!isNode) {
      return this.skip()
    }

    await expect(all(globSource(path.resolve(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir'))))).to.be.rejectedWith(/recursive option not set/)
  })

  it('preserves mode for directories', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir')), {
      preserveMode: true,
      recursive: true
    }))

    expect(result).to.have.lengthOf(4)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[0].mode', fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir'))).mode)
    expect(result).to.have.nested.property('[1].path', '/dir/file-1.txt')
    expect(result).to.have.nested.property('[1].mode', fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir', 'file-1.txt'))).mode)
    expect(result).to.have.nested.property('[2].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[2].mode', fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir', 'file-2.js'))).mode)
    expect(result).to.have.nested.property('[3].path', '/dir/file-3.css')
    expect(result).to.have.nested.property('[3].mode', fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir', 'file-3.css'))).mode)
  })

  it('overrides mode for directories', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir')), {
      recursive: true,
      mode: 5
    }))

    expect(result).to.have.lengthOf(4)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[0].mode', 5)
    expect(result).to.have.nested.property('[1].path', '/dir/file-1.txt')
    expect(result).to.have.nested.property('[1].mode', 5)
    expect(result).to.have.nested.property('[2].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[2].mode', 5)
    expect(result).to.have.nested.property('[3].path', '/dir/file-3.css')
    expect(result).to.have.nested.property('[3].mode', 5)
  })

  it('preserves mtime for directories', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir')), {
      preserveMtime: true,
      recursive: true
    }))

    expect(result).to.have.lengthOf(4)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[0].mtime', parseInt(fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir'))).mtimeMs / 1000))
    expect(result).to.have.nested.property('[1].path', '/dir/file-1.txt')
    expect(result).to.have.nested.property('[1].mtime', parseInt(fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir', 'file-1.txt'))).mtimeMs / 1000))
    expect(result).to.have.nested.property('[2].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[2].mtime', parseInt(fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir', 'file-2.js'))).mtimeMs / 1000))
    expect(result).to.have.nested.property('[3].path', '/dir/file-3.css')
    expect(result).to.have.nested.property('[3].mtime', parseInt(fs.statSync(path.resolve(path.join(__dirname, '..', 'fixtures', 'dir', 'file-3.css'))).mtimeMs / 1000))
  })

  it('overrides mtime for directories', async function () {
    if (!isNode) {
      return this.skip()
    }

    const result = await all(globSource(path.resolve(process.cwd(), path.join(__dirname, '..', 'fixtures', 'dir')), {
      recursive: true,
      mtime: 5
    }))

    expect(result).to.have.lengthOf(4)
    expect(result).to.have.nested.property('[0].path', '/dir')
    expect(result).to.have.nested.property('[0].mtime', 5)
    expect(result).to.have.nested.property('[1].path', '/dir/file-1.txt')
    expect(result).to.have.nested.property('[1].mtime', 5)
    expect(result).to.have.nested.property('[2].path', '/dir/file-2.js')
    expect(result).to.have.nested.property('[2].mtime', 5)
    expect(result).to.have.nested.property('[3].path', '/dir/file-3.css')
    expect(result).to.have.nested.property('[3].mtime', 5)
  })
})
