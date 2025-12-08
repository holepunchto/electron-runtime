const fs = require('fs')
const { pathToFileURL } = require('url')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')

const isMac = process.platform === 'darwin'
const isWindows = process.platform === 'win32'
const dir = (isMac ? '../../../../../../../' : '../../../../../../')

require.extensions['.bundle'] = function (module, filename) {
  module.exports = evaluate(Bundle.from(fs.readFileSync(filename)).mount(pathToFileURL(filename + '/')))
}

const rtiFlagIx = process.argv.indexOf('--rti')
const RTI = rtiFlagIx > -1 && process.argv[rtiFlagIx + 1]
const state = RTI ? null : JSON.parse(process.argv.slice(isWindows ? -2 : -1)[0])

class API {
  static RTI = RTI ? JSON.parse(RTI) : state.rti // runtime information
}

global.Pear = new API()

require(dir + API.RTI.APPID + '.bundle')