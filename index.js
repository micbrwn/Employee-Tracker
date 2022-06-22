const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
// const app = express();


figlet('Employee  \n  Manager');

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
        type: 'List',
        message: 'What would you like to do?',
        name: 'setup',
        choices: [
            'View All Employess',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department'
        ]
}])
        .then(response => {
            switch(response.setup) {

                case 'View All Employess':
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
            }
        })
}

//======================================= Functions for Selected Options =================================

// View All Employees
function viewEmploy() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('You are viewing all Employees');
        cTable(results);
        opening();
    })
}

// Add Employee
function addEmploy() {

}

// Update Employee Role
function updateRole() {

}

// View All Roles
function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log('You are viewing all roles');
        cTable(results);
        opening();
    })
}

// Add Role
function addRole() {

}

// View All Departments
function viewDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log('You are viewing all departments');
        cTable(results);
        opening();
    })
}

// Add Department
function addDept() {

}

opening()