#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { argv, exit } = require('process');
const { promisify } = require('util');

const clui = require('clui');
const Spinner = clui.Spinner;

const { directoryExists } = require('./utils');

clear();
console.log(
  chalk.yellow(figlet.textSync('Feathers+', { horizontalLayout: 'full' }))
);

if (!directoryExists('.git')) {
  console.log(chalk.red('Current directory is not a git repository.'));
  exit();
}

const status = new Spinner('Analyzing project.');
//status.start();
//setTimeout(() => status.stop(), 2000);

const args = require('minimist')(argv);
console.log(args);

const questions = [
  {
    name: 'username',
    type: 'input',
    message: 'Enter your Github username or e-mail address:',
    validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your username or e-mail address';
      }
    }
  },
  {
    name: 'password',
    type: 'password',
    message: 'Enter your password:',
    validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your password';
      }
    }
  }
];

inquirer.prompt(questions)
  .then(data => console.log(data));


/*
const cli = require('commander');

cli
  .version('0.0.1')
  .description('The command line interface for managing FeathersJS applications.')
  */