'use strict'

const childProcess = require('child_process')

module.exports = {
  runExecCommand: (shell) => {
    // 过滤危险操作rm
    if (shell.indexOf('rm') >= 0) {
      return console.info('shell is danger')
    }
    childProcess.exec(shell, (error, stdout, stderr) => {
      if (error) {
        return console.info(`exec error: ${error}`)
      }
      console.info(`stdout: ${stdout}`)
      console.info(`stderr: ${stderr}`)
    })
  }
}