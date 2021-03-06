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

// view departments function
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

// view roles function
const viewRoles = () => {
    const sql = `SELECT roles.*, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table('Roles', results);
    });
    console.log('----------');
    employeeTracker();
}

// view employees function
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

// add department function
const addDepartment = () => {
    inquirer.prompt(
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What department would you like to add?'
        }
    ).then((answer) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        const params = answer.newDepartment
        db.query(sql, params, (err, res) => {
            if (err) return err;
            console.log('\n');
            console.log('Department added');
            console.log('----------');
            employeeTracker();
        });
    });
}

// add role function
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
            type: 'list',
            message: 'What department would you like to add this role to?',
            choices: ['1 Manager', '2 Front of House', '3 Back of House']
        }
    ]).then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
        const params = [answer.newRole, answer.newSalary, answer.newRoleDept.slice(0,2)]; 
        db.query(sql, params, (err, results) => {
            if (err) return err;
            console.log('\n');
            console.log('Role added');
            console.log('----------');
            employeeTracker();
        });
    });
}

// add employee function
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
            type: 'list',
            message: "Who is the new employee's manager?",
            choices: ['1 Kathy Martin', '2 Ronny Lora'] // possible to display managers as an array but return a number?
        }
    ]).then((answer) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`
        const params = [answer.newFirstName, answer.newLastName, answer.newEmpRole, answer.newEmpManager.slice(0,2)]
        db.query(sql, params, (err, results) => {
            if (err) throw (err);
            console.log('\n');
            console.log('New employee added!');
            console.log('----------');
            employeeTracker();
        });
    });
}

// edit employee function
const editEmployee = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, data) => {
      if (err) throw err;
      const employeeList = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id}));
      
      inquirer.prompt([
          {
            name: "empName",
            type: "list",
            message: "Which employee file would you like to update?",
            choices: employeeList
          }
      ]).then((answer) => {
          const employee = answer.name;
          const params = [];
          params.push(employee);

          const sql = `SELECT * FROM roles`;
          db.query(sql, (err, data) => {
              if (err) throw err;
              const roleList = data.map(({ id, title }) => ({ name: title, value: id }));
              
              inquirer.prompt([
                  {
                      name: 'roleName',
                      type: "list",
                      message: "What is the employee's new role?",
                      choices: roleList
                  }
              ]).then((answer) => {
                  const newRole = answer.roleList;
                  params.push(newRole);

                  const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                  db.query(sql, params, (err, result) => {
                      if (err) throw err;
                      console.log('\n');
                        console.log('Employee updated!');
                        console.log('----------');
                        employeeTracker();
                  })
              })
          })
      })
  })
}