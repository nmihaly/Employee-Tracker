const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


const promptUser = () => {
 inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]
        }
    ])
        .then((answer) => {
            switch (answer.choices) {
                case 'view all departments':
                    viewDept();
                    break;

                case 'View all Roles':
                    viewRoles();
                    break;

                case 'View all Employees':
                    viewEmployees();
                    break;

                case 'Add Department':
                    addDept();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;
            }
        })
    }

function viewDept()  {
    const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser();
})
};

function viewRoles() {
    const sql = `SELECT role.title, role.id, department.name, role.salary`;
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser();
})
};

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title FROM role_id AS title, department.name, employee.first_name & employee.last_name FROM manager_id AS Manager`;
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser();
})
};

function addDept() {
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
       db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })

};

function addRole() {
    const sql = `SELECT role.title AS Title, role.salary AS Salary FROM role`;
    db.query(sql, (err, res) => {
    inquirer.prompt([
    {
        name: "Title",
        type: "input",
        message: "What is the roles Title?"
      },
      {
        name: "Salary",
        type: "input",
        message: "What is the Salary?"
      } 

    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
              promptUser();

            }
            )
        })
    })
}



