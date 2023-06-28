'use strict'
const { once } = require('events')
const { join, resolve } = require('path')
const { rename, rm } = require('fs/promises')
const { spawn } = require('child_process')

exports.default = async function () {
  const dist = join(__dirname, 'dist')

  if (process.platform === 'darwin') {
    const suffix = process.argv === 'x64' ? '' : '-' + process.arch
    const mac = join(dist, 'mac' + suffix)
    const platarch = join(dist, 'darwin-' + process.arch)
    try { await rm(platarch, { recursive: true }) } catch { /* ignore */ }
    await rename(mac, platarch, { recursive: true })
  }

  if (process.platform === 'linux') {
    const unpacked = join(dist, 'linux' + (process.arch !== 'x64' ? '-' + process.arch + '-' : '-') + 'unpacked')
    const platarch = join(dist, 'linux-' + process.arch)
    try { await rm(platarch, { recursive: true }) } catch { /* ignore */ }
    await rename(unpacked, platarch, { recursive: true })
  }

}
