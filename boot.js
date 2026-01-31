const { isMac } = require('which-runtime')
if (isMac && !process.argv[1]) process.exit(0) // silent exit when "Re-open windows when logging in"
const fs = require('fs')
const path = require('path')
const { pathToFileURL } = require('url')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')
require.extensions['.bundle'] = function (module, filename) {
  module.exports = evaluate(Bundle.from(fs.readFileSync(filename)).mount(pathToFileURL(filename + '/')))
}
const argv = process.type === 'renderer' ? process.argv.filter(([ch]) => ch !== '-') : process.argv
const entry = path.resolve(argv[1])
require(entry)
