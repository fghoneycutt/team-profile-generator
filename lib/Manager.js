const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole(){
        return "manager";
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
module.exports = Manager;

// {
//     type: "text",
//     name: "office",
//     message: "Enter manager's office number: ",
//     validate: (input) => {
//       if (input) {
//         return true;
//       } else {
//         console.log("Please enter manager's office number.");
//         return false;
//       }
//     }
//   },