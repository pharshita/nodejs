const chalk = require('chalk');
const validator = require('validator')
console.log(chalk.red.inverse('Hello world!')); 


const res = validator.isEmail("abc@abc.com")
console.log(res ? chalk.green(res) : chalk.red(res))