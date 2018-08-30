#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const commander = require('commander');
const figlet = require('figlet');
const yeoman = require('yeoman-environment');
const { argv } = require('process');

const packageJson = require('../package.json');
const audit = require('./audit');

const program = commander;
const yeomanEnv = yeoman.createEnv();

const generators = {
  all: 'Regenerate entire application',
  app: 'Create a new Feathers application in the current folder',
  authentication: 'Set up authentication for the current application',
  connection: 'Initialize a new database connection',
  codelist: 'List custom code in generated modules',
  hook: 'Create a new hook',
  middleware: 'Create an Express middleware',
  options: 'Set options for generating the project',
  secret: 'Generate a new authentication secret',
  service: 'Generate a new service',
  graphql: 'Generate GraphQL service',
  fakes: 'Generate fake data',
  test: 'Generate a test for a hook, a service, or auth.'
  // plugin: 'Create a new Feathers plugin', // use feathersjs/cli
};

Object.keys(generators).forEach(name => {
  const generator = `@feathers-plus/generator-feathers-plus/generators/${name}`;
  yeomanEnv.register(require.resolve(generator), `${name}`);
});

const blanks16 = '                  ';
const genDesc = Object.keys(generators).sort()
  .map(name => `  ${name}:${blanks16.substr(0, 16 - name.length)}${generators[name]}`).join('\n');

clear();
console.log(
  chalk.yellow(figlet.textSync('Feathers+', { horizontalLayout: 'full' }))
);

// todo Check node version is 8+

const args = argv;
args[2] = args[2] || '-h';

program
  .version(packageJson.version)
  .description('The command line interface for managing Feathers applications.');

program
  .command('audit')
  .alias('a')
  .description('Audit the current project.')
  .action(() => {
    audit();
  })

program
  .command('generate <what>')
  .alias('g')
  .description(`(Re)generate code. <what> options:\n${genDesc}`)
  .action(what => {
    if (Object.keys(generators).indexOf(what) === -1) {
      program.help();
    } else {
      yeomanEnv.run(what, {});
    }
  })

program
  .command('*')
  .action(() => program.help());

program.parse(args);
