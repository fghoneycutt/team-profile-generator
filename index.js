const inquirer = require('inquirer');
const fs = require("fs");
//employee functions
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require("./src/page-template.js");
//empty array to hold entered employee info
var employees = [];
//build the manager first, as that will come first every time the application is run
function buildManager(){
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "text",
            name: "name",
            message: "Enter manager's name: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter manager's name");
                    return false;
                }
            },
        },
        {
            type: "text",
            name: "id",
            message: "Enter manager's employee ID: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter manager's employee ID.");
                    return false;
                }
            },
        },
        {
            type: "text",
            name: "email",
            message: "Enter manager's email address: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter manager's email address");
                    return false;
                }
            },
        },
        {
            type: "text",
            name: "office",
            message: "Enter manager's office number: ",
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter manager's office number.");
                    return false;
                }
            },
        }
    ])
    //create a new manager in the employees array, then choose next action
    .then(managerData => {
        employees.push(new Manager (managerData.name, managerData.id, managerData.email, managerData.office));
    })
    .then(chooseAction);
}
function chooseAction() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "Add an engineer",
            "Add an intern",
            "Finish building my team"
        ]
    })
    .then(({action}) => {
        if (action === "Add an engineer"){
            buildEmployee("engineer");
        } else if (action === "Add an intern"){
            buildEmployee("intern")
        } else if (action === "Finish building my team"){
            buildPage();
        }
    })
}
function buildEmployee(role){
    //questions applicable to both types of employee
    inquirer.prompt([
      {
        type: "text",
        name: "name",
        message: `Enter ${role}'s name: `,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter ${role}'s name.`);
            return false;
          }
        },
      },
      {
        type: "text",
        name: "id",
        message: `Enter ${role}'s ID: `,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter ${role}'s ID.`);
            return false;
          }
        },
      },
      {
        type: "text",
        name: "email",
        message: `Enter ${role}'s email: `,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter ${role}'s email.`);
            return false;
          }
        },
      },
    ])
    //role-specific questions depending on type of employee chosen
    .then(employeeData => {
        if (role === "engineer"){
            inquirer.prompt([
                {
                    type: "text",
                    name: "github",
                    message: "Enter engineer's GitHub profile: ",
                    validate: (input) => {
                        if(input){
                            return true;
                        } else {
                            console.log("Please enter engineer's GitHub profile.");
                            return false;
                        }
                    }
                }
            ])
            .then(github => {
                employeeData = {...employeeData,...github};
                employees.push(new Engineer (employeeData.name, employeeData.id, employeeData.email, employeeData.github));
            })
            .then(chooseAction);
        }
        if (role === "intern"){
            inquirer
              .prompt([
                {
                  type: "text",
                  name: "school",
                  message: "Enter intern's school: ",
                  validate: (input) => {
                    if (input) {
                      return true;
                    } else {
                      console.log("Please enter intern's school.");
                      return false;
                    }
                  },
                },
              ])
              .then((school) => {
                employeeData = { ...employeeData, ...school };
                employees.push(new Intern (employeeData.name, employeeData.id, employeeData.email, employeeData.school));
              })
              .then(chooseAction);
        }
    })
}
//create html file with entered data
function writeToFile(data){
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/team.html', data, err => {
            if (err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: "File Created!"
            })
        })
    })
}
//initialize app
buildManager();
function buildPage(){
    page = generatePage(employees);
    writeToFile(page);
}