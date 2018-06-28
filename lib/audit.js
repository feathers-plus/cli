
const chalk = require('chalk');
const clui = require('clui');
const inquirer = require('inquirer');
const { cwd, exit } = require('process');
const { join } = require('path');

const { checkServices, logCheckService } = require('@feathers-plus/cli-audit');
const { directoryExists } = require('./utils');

const Spinner = clui.Spinner;

module.exports = function audit() {
  if (!directoryExists('.git')) {
    console.log(chalk.red('Current directory is not a git repository.'));
    exit();
  }

  const testFolderMsg = [
    'The following test folder structures are supported:',
    '  n/a feathers-cli  : All test programs are all in dir,',
    '                      i.e. project/tests',
    '  feathers-plus-cli : Each dir contains a __tests__ folder,',
    '                      e.g. project/src/services/user/__tests__',
    '  n/a inline        : Dirs contain both source & test programs,',
    '                      e.g. project/src/servicess/user',
    '',
    'What structure does this project use?'
  ].join('\n');

  console.log('The Mocha test program for foo-bar.baz.js must be named foo-bar.baz.test.js .');

  const questions = [
    {
      name: 'testFolder',
      type: 'list',
      message: testFolderMsg,
      default: 'feathers-plus-cli',
      choices: ['feathers-cli', 'feathers-plus-cli', 'inline'],
    },
    {
      name: 'path',
      type: 'input',
      message: 'Enter the path to Feathers `services` folder:',
      default: 'src/services',
      validate(value) {
        return value.length ? true : 'Please enter the path to the Feathers `services` folder.';
      }
    },
  ];

  inquirer.prompt(questions)
    .then(data => {
      const serviceDir = join(cwd(), 'services');

      const status = new Spinner('Analyzing project.');
      status.start();
      const results = checkServices(serviceDir);  // todo TEMP
      status.stop();
    });
};
