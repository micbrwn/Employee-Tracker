const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const Choices = require('inquirer/lib/objects/choices');

figlet('Employee \n \n Manager');

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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
    console.log(`Connected to the management_db database.`)
);



function opening() {
    return inquirer.prompt({
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
    })
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

function viewEmploy() {

}

function addEmploy() {

}

function updateRole() {

}

function viewRoles() {

}

function addRole() {

}

function viewDepts() {

}

function addDept() {

}