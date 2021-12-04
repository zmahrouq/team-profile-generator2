const inquirer = require('inquirer');
const express = require('express');
const fs = require('fs')

const app = express()



// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

let engineers = []
let interns = []
let manager = ''

function getManager() {
    inquirer
        .prompt([
            {
                name: "teammanager_name",
                type: "input",
                message: "What's the name of your Team Manager?",
            },
            {
                name: "employee_id",
                type: "input",
                message: "What is your employee ID?",
            },
            {
                name: "email_address",
                type: "input",
                message: "What is your email address?",
            },
            {
                name: "office_number",
                type: "input",
                message: "What is your office number?",
            },
            

        ])
        .then((answer) => {
            manager = answer
            menu()
        })
}

getManager()


function menu(){
    inquirer.prompt([{
        name: "position",
        type: "input",
        message: "Engineer, intern, or quit?",
    },])
    .then((answer) => {
        if(answer.position.toLowerCase() === 'engineer'){
            getEngineer()
        } else if(answer.position.toLowerCase() === 'intern'){
            getIntern()
        } else if(answer.position.toLowerCase() === 'quit'){
            runServer()
        }else{
            console.log('invalid input')
            menu()
        }

    })
}

function getEngineer() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is your name?",
            },
            {
                name: "id",
                type: "input",
                message: "What is your employee ID?",
            },
            {
                name: "email",
                type: "input",
                message: "What is your email address?",
            },
            {
                name: "github",
                type: "input",
                message: "What is your Github username?",
            },
        ]).then((answers) => {
            engineers.push(answers)
            menu()
        })
}

function getIntern() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is your name?",
            },
            {
                name: "id",
                type: "input",
                message: "What is your employee ID?",
            },
            {
                name: "email",
                type: "input",
                message: "What is your email address?",
            },
            {
                name: "school",
                type: "input",
                message: "What is your School?",
            },
        ]).then((answers) => {
            interns.push(answers)
            menu()
        })
}



// const fs = require('fs');

function runServer() {
    app.set('view engine', 'ejs')
    app.use(express.static(__dirname + '/Assets'))

    app.listen(3000)
    console.log('listening on port 3000...')

    app.get('/', (req, res) => {
        res.render('index', { engineers: engineers, interns: interns, manager: manager })
    })
}

