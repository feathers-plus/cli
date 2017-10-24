
const chalk = require('chalk');
const clui = require('clui');
const inquirer = require('inquirer');
const { cwd, exit } = require('process');
const { join } = require('path');

const { checkServices, logCheckService } = require('@feathers-x/feathers-plus-cli-audit');
const { directoryExists } = require('./utils');

const Spinner = clui.Spinner;

module.exports = function audit() {
  if (!directoryExists('.git')) {
    console.log(chalk.red('Current directory is not a git repository.'));
    exit();
  }

  const questions = [
    {
      name: 'path',
      type: 'input',
      message: 'Enter path to Feathers services folder:',
      default: 'src/services',
      validate(value) {
        return value.length ? true : 'Please enter your username or e-mail address';
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
