'use strict'
const { join } = require('path')
const { symlinkSync } = require('fs')
exports.default = async function (context) {
  const { appOutDir } = context
  if (process.platform === 'darwin') {
    const dir = join(appOutDir, 'Holepunch Runtime.app', 'Contents')
    symlinkSync('../MacOS/Holepunch Runtime', join(dir, 'Frameworks/Holepunch Runtime Headless'))
  }
}
