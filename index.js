const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
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
    .then(managerData => {
        console.log(managerData);
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
            console.log("reached finish");
        }
    })
}
function buildEmployee(role){
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
        name: "ID",
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
              })
              .then(chooseAction);
        }
    })
}
buildManager();