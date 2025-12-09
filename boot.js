const fs = require('fs')
const { pathToFileURL } = require('url')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')

require.extensions['.bundle'] = function (module, filename) {
  module.exports = evaluate(Bundle.from(fs.readFileSync(filename)).mount(pathToFileURL(filename + '/')))
}

require(process.argv[1])