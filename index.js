const db = require('./Config/connection');
const inquirer = require('inquirer');
// const consoleTable = require('console.table');
// const figlet = require('figlet');
// const app = express();


// figlet('Employee  \n  Manager');

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//========================================== Opening Prompt ================================================

function opening() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'setup',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit'
        ]
    }])
        .then(results => {
            switch (results.setup) {

                case 'View All Employees':
                    viewEmploy()
                    break;

                case 'Add Employee':
                    addEmploy()
                    break;

                case 'Update Employee Role':
                    updateRole()
                    break;

                case 'View All Roles':
                    viewRoles()
                    break;

                case 'Add Role':
                    addRole()
                    break;

                case 'View All Departments':
                    viewDepts()
                    break;

                case 'Add Department':
                    addDept()
                    break;

                case 'Exit':
                    db.end()
                    break;
            }
        })
}

//======================================= Functions for Selected Options =================================

// View All Employees
const viewEmploy = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('You are viewing all Employees');
        console.table(results);
        opening();
    })
}



// Add Employee
const addEmploy = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'firstName'
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'lastName'
        },
        {
            type: 'type',
            message: 'What is the role ID for the employee?',
            name: 'roleSel'
        },

    ])
        .then(results => {
            db.query('INSERT INTO employee SET ?',
                {
                    first_name: results.firstName,
                    last_name: results.lastName,
                    role_id: parseInt(results.roleSel)
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`${results.firstName} ${results.lastName} has been added!`);
                    opening();
                })
        })
}




// Update Employee Role
const updateRole = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        
        inquirer.prompt([
            {
                type: 'input',
                message: `What is the ID of the employee you wish to update?`,
                name: 'employId'
            },
            {
                type: 'input',
                message: 'What is their new role ID for the employee?',
                name: 'roleId'
            }
        ])
            .then(results => {
                let employ = parseInt(results.employId);
                let role = parseInt(results.roleId);

                db.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employ}`, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                db.query(`SELECT * FROM employee`, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.table(results);
                    console.log(`Employee's role has been updated`);
                    opening();
                })
            })
    })
}

// View All Roles
const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('You are viewing all roles');
        console.table(results);
        opening();
    })
}

// Add Role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new role?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the salary for the new role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department ID for the new role?',
            name: 'roleDepart'
        }
    ])
        .then(results => {
            db.query('INSERT INTO role SET ?',
                {
                    title: results.newRole,
                    salary: parseInt(results.salary),
                    department_id: parseInt(results.roleDepart)
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`${results.newRole} has been added`);
                    opening();
                }
            )
        })
}

// View All Departments
const viewDepts = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('You are viewing all departments');
        console.table(results);
        opening();
    })
}

// Add Department
const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'depart'
        }
    ])
        .then(results => {
            db.query(
                "INSERT INTO department SET ?",
                {
                    department_name: results.depart
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`${results.depart} department has been added`);
                    opening();
                }
            )
        })
}

opening()