const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// start database connetion and main function
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
            choices: ['View Departments', 'View Roles', 'View Employees', new inquirer.Separator(), 'Add Department', 'Add Role', 'Add Employee', 'Edit Employee', new inquirer.Separator(), 'Exit', new inquirer.Separator()]
        }
    ).then((answer) => {
        switch (answer.action) {
            case "View Departments":
                viewDepartments();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "View Employees":
                viewEmployees();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Edit Employee":
                editEmployee();
                break;

            case "Exit":
                db.end();
                break;
        }
    })
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table('Departments', results);
    });
    console.log('----------');
    employeeTracker();
}

const viewRoles = () => {
    const sql = `SELECT * FROM roles`; // check formatting with assingment table needs job titles and departments
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table('Roles', results);
    });
    console.log('----------');
    employeeTracker();
}

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table('Employees', results);
    });
    console.log('----------');
    employeeTracker();
}

const addDepartment = () => {
    inquirer.prompt(
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What department would you like to add?'
        }
    ).then((answer) => {
        db.query(`INSERT INTO departments (name) VALUES ('${answer.newDepartment}');`, (err, res) => {
            if (err) return err;
            console.log('\n');
            console.log('Department added');
            console.log('----------');
            employeeTracker();
        });
    });
}

const addRole = () => {
    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'What type of role would you like to add?'
        },
        {
            name: 'newSalary',
            type: 'input',
            message: 'What is the salary for this role?'
        },
        {
            name: 'newRoleDept',
            type: 'input',
            message: 'What department would you like to add this role to?'
        }
    ]).then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
        const params = [answer.newRole, answer.newSalary, answer.newRoleDept]; 
        db.query(sql, params, (err, results) => {
            if (err) return err;
            console.log('\n');
            console.log('Role added');
            console.log('----------');
            employeeTracker();
        });
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'newFirstName',
            type: 'input',
            message: "What is the new employee's first name?"
        },
        {
            name: 'newLastName',
            type: 'input',
            message: "What is the new employee's last name?"
        },
        {
            name: 'newEmpRole',
            type: 'input',
            message: "What is the new employee's role?"
        },
        {
            name: 'newEmpManager',
            type: 'input',
            message: "Who is the new employee's manager?"
        }
    ]).then((answer) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`
        const params = [answer.newFirstName, answer.newLastName, answer.newEmpRole, answer.newEmpManager]
        db.query(sql, params, (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.log('New employee added!');
            console.log('----------');
            employeeTracker();
        });
    });
}