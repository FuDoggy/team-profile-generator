const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeArray = [];

    inquirer.prompt([{

        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your employee ID number?: ",
        name: "id"
    },

    {
        type: "input",
        message: "What is your email address?: ",
        name: "email"
    },

    {
        type: "input",
        message: "What is your office number?: ",
        name: "officeNumber"
    }])

.then(response => {
    var managerData = (new Manager(response.name, response.id, response.email, response.officeNumber))
    employeeArray.push(managerData)
    console.log(employeeArray)
    addTeam();
})

function addTeam() {
    inquirer.prompt([
    {
        type: "list",
        message: "Which team member would you like to add?: ",
        name: "role",
        choices: ["Engineer", "Intern", "Done adding team members"]
    }])

    .then((data) => {
        switch (data.role) {
            case "Engineer":
                getEngineer();
                break;
            case "Intern":
                getIntern();
                break;
            default:
                addEmployees();
                break;
        }

        

})

    function getIntern() {
            inquirer.prompt([{
                type: "input",
                message: "What is the Intern's name?",
                name: "name"
            },

            {
                type: "input",
                message: "What is your Intern's ID number?: ",
                name: "id"
            },

            {
                type: "input",
                message: "What is the Intern's email address?: ",
                name: "email"
            },

            {
                type: "input",
                message: "What school does the Intern attend?: ",
                name: "school"
            }])

        .then(response => {
            var internData = (new Intern (response.name, response.id, response.email, response.school))
            employeeArray.push(internData)
            console.log(employeeArray)
            setTimeout(addTeam, 500)
        })
    
}

    function addEmployees() {
        fs.writeFile("team.html", render(employeeArray), function (error) {
            console.log(employeeArray)
            if (error) throw error
        })}

        function getEngineer() {
           
                
                inquirer.prompt([{
                    type: "input",
                    message: "What is the Engineer's name?",
                    name: "name"
                },
            {
                type: "input",
                message: "What is the Engineer's ID number?: ",
                name: "id"
            },
            {
                type: "input",
                message: "What is the Engineer's email address?: ",
                name: "email"
            },
            {
                type: "input",
                message: "What is the Engineer's GitHub address?: ",
                name: "github"
            }])
    
            .then(response => {
                var engineerData = new Engineer(response.name, response.id, response.email, response.github)
                employeeArray.push(engineerData)
                console.log(employeeArray)
                setTimeout(addTeam, 500)
                //push and pop to add to end of array
                //unshift and shift to add/remove from beginning of array
            })
        
    }}

    
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
