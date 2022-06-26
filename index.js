const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
// const app = express();


// figlet('Employee  \n  Manager');

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//============================================ Connect to Database ===========================================
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'management_db'
    },
    // console.log(`Connected to the management_db database.`)
);

db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the management_db.');
  });

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
        .then(response => {
            switch(response.setup) {

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
function viewEmploy() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('You are viewing all Employees');
        console.table(results);
        opening();
    })
}

// Add Employee
function addEmploy() {
   
}

// Update Employee Role
function updateRole() {
    // show all employees list
    // select employee with `map`
    // const employeeChoices = employees.map(({id, first_name, last_name}) => { 
    // name: `${}`
    // value: id
    // }) 
    //  inquirer.prompt ([
    // questions
    //  ]) 
    // .then(response => {
    // db.viewRoles()
    // const employeeRole = viewRoles,map(({id, title}))})
    //  name: title
    //  value: id
    //  another .prompt role for employee
    // 
}

// View All Roles
function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log('You are viewing all roles');
        console.table(results);
        opening();
    })
}

// Add Role
function addRole() {
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
    ]) .then(response => {
            db.query('INSERT INTO role SET ?',
            {
                title: response.newRole,
                salary: parseInt(response.salary),
                department_id: parseInt(response.roleDepart)
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`${response.newRole} has been added`);
            }
            )
    })
}

// View All Departments
function viewDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log('You are viewing all departments');
        console.table(results);
        opening();
    })
}

// Add Department
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'depart'
        }
    ]) .then(response => {
        db.query(
            "INSERT INTO department SET ?",
            {
                department_name: response.depart
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                    console.log(`${response.depart} department has been added`);
                    opening();
            }
            
        )
    })
}

opening()