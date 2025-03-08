const fs = require('fs')
const { pathToFileURL } = require('url')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')

const isMac = process.platform === 'darwin'
const dir = (isMac ? '../../../../../../../' : '../../../../../../')

require.extensions['.bundle'] = function (module, filename) {
  module.exports = evaluate(Bundle.from(fs.readFileSync(filename)).mount(pathToFileURL(filename + '/')))
}

try {
  require(dir + 'boot.bundle')
} catch {
  try {
    require(dir + 'boot.cjs')
  } catch {
    require(dir + 'boot.js')
  }
}
