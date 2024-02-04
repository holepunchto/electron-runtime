const fs = require('fs')
const runBundle = require('node-bare-bundle')

const isMac = process.platform === 'darwin'
const dir = (isMac ? '../../../../../../../' : '../../../../../../')

require.extensions['.bundle'] = function (mod, filename) {
  mod.exports = runBundle(fs.readFileSync(filename))
}

try {
  require(dir + 'boot.bundle')
} catch {
  require(dir + 'boot.js')
}
