const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// start database connetion and main
db.connect(err => {
    if (err) throw err;
    console.log('Database connected. Welcome to Employee Tracker!');
    employeeTracker();
});

// main function
function employeeTracker() {
    inquirer.prompt(
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', new inquirer.Separator(), 'Add Department', 'Add Role', 'Add Employee', 'Edit Employee', new inquirer.Separator()]
        }
    )
};