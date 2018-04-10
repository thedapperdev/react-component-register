const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')
const Register = require('./lib/component-register').default
const Path = require('path')
const getProcessPath = path => Path.join(process.cwd(), path)
let reg = new Register(getProcessPath('src/components'))

// Path.join(Path.resolve('.'), 'components')

program
  .version('0.1.0')
  .description('Component Register')

// program
//   .command('set-component-folder <path>')
//   .alias('f')
//   .description('set folder for component register')
//   .action(componentsPath => 
//     reg = new Register(getProcessPath(componentsPath)))

program
  .command('* <componentName>')
  .alias('add')
  .alias('a')
  .description('Add a component')
  .action(componentName => reg.createComponent(componentName))

program.parse(process.argv)