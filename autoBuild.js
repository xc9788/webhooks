'use strict'

const _             = require('lodash')
const http          = require('http')
const exec          = require('child_process').exec
const createHandler = require('github-webhook-handler')
const config        = require('./config.js')

const handler = createHandler({ path: config.path, secret: config.secret })

http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(6666)

handler.on('push', (event) => {
  let pusherName = event.payload.pusher.name
  let repositoryName = event.payload.repository.name
  let branchName = _.split(event.payload.ref, '/').pop()

  let project = _.find(config.hooks, { repository: 'docs' })

  if (project.lockBranch && project.lockBranch != 'master') {
    return console.info('Rejected %s a push event for %s to %s, INFO: branch not match', pusherName, repositoryName, branchName)
  }

  if (project.lockUser && project.lockUser != 'cx') {
    return console.info('Rejected %s a push event for %s to %s, INFO: pusher not match', pusherName, repositoryName, branchName)
  }

  console.info('Received %s a push event for %s to %s', pusherName, repositoryName, branchName)

  runCommand(project.shell)
})

handler.on('error', (err) => { console.error('Error:', err.message) })

let runCommand = (shell) => {
  // filter danger string rm 
  if (shell.indexOf('rm') >= 0) {
    return console.log('shell is danger')
  }

  // exec shell
  exec(shell, (error, stdout, stderr) => {
    if (error) {
      return console.log(`exec error: ${error}`)
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  });
}
