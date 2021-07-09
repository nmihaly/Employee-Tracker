const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

db.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + db.threadId)
    promptUser();
});

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
    const sql = `SELECT employee.first_name, employee.last_name, 
    department.name AS Department 
    FROM employee JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    ORDER BY employee.id;`;
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser();
})
};

function viewRoles() {
    const sql = `SELECT employee.first_name, employee.last_name, 
    role.title AS Title 
    FROM employee JOIN role ON employee.role_id = role.id;`;
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser();
})
};

function viewEmployees() {
    const sql = `SELECT employee.first_name, employee.last_name, 
    department.name AS Department 
    FROM employee JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    ORDER BY employee.id;`;
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
                promptUser();
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
        db.query(
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

// Select Role for Add/Update Employee Prompt
var roleArr = [];
function selectRole() {
    const sql = `SELECT * FROM role`
  db.query(sql, function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

// Select Manager for Add Employee Prompt
var managersArr = [];
function selectManager() {
    const sql = `SELECT first_name, last_name FROM employee WHERE manager_id IS NULL`
  db.query(sql, function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
          },
          {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
          },
          {
              name: "choice",
              type: "rawlist",
              message: "Whats their managers name?",
              choices: selectManager()
          }
    ]).then(function (answer) {
        const roleId = selectRole().indexOf(answer.role) + 1
        const managerId = selectManager().indexOf(answer.choice) + 1
        db.query(`INSERT INTO employee SET ?`, 
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(answer)
            promptUser()
        })
  
    })
}

function updateRole() {
    const sql = `SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;`
    connection.query(sql, function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
        ]).then(function(answer) {
            var roleId = selectRole().indexOf(answer.role) + 1
            db.query("UPDATE employee SET WHERE ?", 
            {
              last_name: answer.lastName
               
            }, 
            {
              role_id: roleId
               
            }, 
            function(err){
                if (err) throw err
                console.table(answer)
                promptUser()
            })
      
        });
      });
    
      }