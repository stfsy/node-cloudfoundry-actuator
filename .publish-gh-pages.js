// dirty but simple pushing to gh pages
const execSync = require('child_process').execSync
const spawnSync = require('child_process').spawnSync
const exit = require('process').exit
const resolve = require('path').resolve
const fs = require('fs-promise')

const docsPath = resolve('docs')
const docsGit = resolve('docs/.git')

const version = require('./package.json').version
const repository = require('./package.json').repository.url

const executeCommand = (command, args) => {
    const result = spawnSync(command, args, { cwd: docsPath, encoding: 'utf8' })

    if (result.status === 0) {
        console.log(result.stdout)
    } else {
        console.log(result.stderr)
        exit(result.status)
    }
}

fs.removeSync(docsPath)
fs.mkdir(docsPath)
executeCommand('git', ['init'])
executeCommand('git', ['remote', 'add', 'origin', repository + '.git'])
executeCommand('git', ['checkout', '-b', '--orphan', 'gh-pages'])
execSync('npm run docs', {encoding: 'utf8'})
executeCommand('git', ['add', '.'])
executeCommand('git', ['commit', '-m', 'chore(docs): add docs for v' + version + ''])
executeCommand('git', ['push', 'origin', 'gh-pages'])
fs.removeSync(docsGit)