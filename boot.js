const fs = require('fs')
const { pathToFileURL } = require('url')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')
require.extensions['.bundle'] = function (module, filename) {
  module.exports = evaluate(Bundle.from(fs.readFileSync(filename)).mount(pathToFileURL(filename + '/')))
}
const argv = process.type === 'renderer' ? process.argv.filter(([ch]) => ch !== '-') : process.argv
const entry = argv[1]
require(entry)
