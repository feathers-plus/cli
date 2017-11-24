#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const commander = require('commander');
const figlet = require('figlet');
const { argv } = require('process');

const audit = require('./audit');

const program = commander;

clear();
console.log(
  chalk.yellow(figlet.textSync('Feathers+', { horizontalLayout: 'full' }))
);

const args = argv;
args[2] = args[2] || '-h';

program
  .version('0.0.1')
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
  .description('Generate something.')
  .action(what => {
    console.log(`Generate ${what}`);
  })

program.parse(args);

//export NODE_PATH=$NODE_PATH:/home/johnsz/.nvm/versions/node/v8.6.0/lib/node_modules
//which
//readlink
/*
Marshall asked me if he could speak to Dave and you, and I agreed. He and I have the same issues about Feathers, we spoke to Dave in concert, we both did not enjoy the feathers-ecosystem plan, we both pulled our repos into feathers-plus together. 3 people did 95% of the work in the last year, and 2 of them have pulled their repos. Its disingenuous of you to act like nothing was/is wrong.
Marshall and I communicate regularly. Your transparent attempts to split us reflect on you,
as does your verbal bullying throughout this matter.
 */

