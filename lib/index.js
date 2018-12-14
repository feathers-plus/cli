#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const commander = require('commander');
const figlet = require('figlet');
const yeoman = require('yeoman-environment');
const { argv, cwd } = require('process');
const { parse } = require('path');

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
console.log('');
console.log('With contributions from: j2L4e, NickBolles, lukeburpee, Matt & Marshall');
console.log('');
console.log('New features recently added:');
console.log([
  '- ',
  chalk.yellow.bold('generate app'),
  ': new prompts for test environments and seeding data.'
].join(''));
console.log([
  '- ',
  chalk.yellow.bold('generate fakes'),
  ': generate fake data for your services. Very powerful.'
].join(''));
console.log([
  '- ',
  chalk.yellow.bold('generate hook'),
  ': generate a hook for one or more services.'
].join(''));
console.log([
  '- ',
  chalk.yellow.bold('generate test'),
  ': generate a test for a hook, service or authentication.'
].join(''));

console.log('');
console.log([
  'Migrating app in dir ',
  chalk.yellow.bold(parse(cwd()).base),
  ' to latest cli+ version:',
].join(''));
console.log([
  '- ',
  'Run ',
  chalk.red.bold('npm update'),
  '.',
].join(''));
console.log('');

// todo Check node version is 10+

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
  });

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
  });

program
  .command('*')
  .action(() => program.help());

program.parse(args);
