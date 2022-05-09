const inquirer = require("inquirer");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const renderPage = require("../src/page-template")

class Team {
    constructor() {
        this.member = [];
    }

    async developTeam() {
        await this.Manager();
        await this.nextOption();
    }

    async Manager() {
        await inquirer
            .prompt([
                {
                    type: `input`,
                    name: `name`,
                    message: `Imput Mngr name`,
                },
                {
                    type: `input`,
                    name: `id`,
                    message: `Imput Mngr ID`,
                },
                {
                    type: `input`,
                    name: `email`,
                    message: `Imput Mngr email`,
                },
                {
                    type: `input`,
                    name: `officeNumber`,
                    message: `Imput Mngr office number`,
                }
            ])

            .then((managerObject) => {
                this.member.push(new Manager(managerObject));
            });
    }
    async nextOption() {
        await inquirer.prompt({
            type: `list`,
            name: `choice`,
            message: `Options..`,
            choices: [`Include Engineer`, `Include Intern`, `Finit`],
        })
            .then(async ({ choice }) => { 
                console.log(choice)
                if (choice === 'Finit') {
                    console.log('Ok')
                    this.Team(this.member)
                    return 
                } else {
                    await this.Employee(choice)
                    this.nextOption()
                }
            })
    }

    async Employee(currentChoice) { 
        if (currentChoice === 'Include Engineer') {
            await this.Engineer()
        } else { 
            await this.Intern()
        }
    }

    async Engineer() {
        console.log('Rendering Engineer')
        await inquirer
            .prompt([
                {
                    type: `input`,
                    name: `name`,
                    message: `Input Engineer's name`,
                },
                {
                    type: `input`,
                    name: `id`,
                    message: `Input Engineer's ID`,
                },
                {
                    type: `input`,
                    name: `email`,
                    message: `Input Engineer's email`,
                },
                {
                    type: `input`,
                    name: `github`,
                    message: `Input Engineer's github`,
                },
            ])
            .then((engineerObject) => {
                this.member.push(new Engineer(engineerObject));
            });
    }

    async Intern() {
        console.log('Rendering Intern')
        await inquirer
            .prompt([
                {
                    type: `input`,
                    name: `name`,
                    message: `Input Intern's name`,
                },
                {
                    type: `input`,
                    name: `id`,
                    message: `Input Intern's ID`,
                },
                {
                    type: `input`,
                    name: `email`,
                    message: `Input Intern's email`,
                },
                {
                    type: `input`,
                    name: `school`,
                    message: `Input Intern's school`,
                },
            ])
            .then((internObject) => {
                this.member.push(new Intern(internObject));
            });
    }

    async Team(currentArray) {
        console.log(`Rendering Team`)
        //console.log(currentArray)
        renderPage(currentArray) 
    }
}

module.exports = Team;