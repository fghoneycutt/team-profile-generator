const inquirer = require('inquirer');
function createTeam(){
    inquirer.prompt(
        {
            type: "text",
            name: "Manager Name",
            message: "Enter manager name: "
        },
        
    )
}
createTeam();