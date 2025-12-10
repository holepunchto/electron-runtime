const fs = require('fs')
const { pathToFileURL, fileURLToPath } = require('url')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')
const Module = require('module')
const resolveFilename = Module._resolveFilename
Module._resolveFilename = function (request, parent, isMain, options) {
  if (typeof request === 'string' && request.startsWith('file:')) request = fileURLToPath(request)
  return resolveFilename.call(this, request, parent, isMain, options)
}
require.extensions['.bundle'] = function (module, filename) {
  module.exports = evaluate(Bundle.from(fs.readFileSync(filename)).mount(pathToFileURL(filename + '/')))
}
const argv = process.type === 'renderer' ? process.argv.filter(([ch]) => ch !== '-') : process.argv
const entry = argv[1]
require(entry)
