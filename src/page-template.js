const fs = require('fs')

function employee(passedVariables) {
    let variable
    ({name, id, email, officeNumber, github, school} = passedVariables)

    if (officeNumber) {
        variable = `Office Number: ${officeNumber}`
    } else if(github) {
        variable = `GitHub: <a href="https://github.com/${github}"> ${github}</a>`
    } else {
        variable = `School: ${school}`
    }

    return `

    <div class="col-4 mt-4">
    <div class="card h-100">
        <div class="card-header" >
         <h2>${name}</h2>
            <h5>${passedVariables.constructor.name}</h5><i class="material-icons">workspace_premium</i>
        </div>

        <div class="card-body">
            <p class="id">ID: ${id}</p>
            <p class="email">Email: <a href="mailto:${email}">${email}</a></p>  
            <div class="variable">${variable}</div>
        </div>

    </div>
</div>
    `
}

function qnty(objectArray) {

    let array = '' 
    console.log(objectArray)

    for (i = 0; i < objectArray.length; i++) {
        array += employee(objectArray[i])
    }
    return array;
}

module.exports = function (objectArray) {

    let page = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
    crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
    
    <header>
        <nav class="navbar" id="navbar">
            <span class="navbar-brand mb-0 h1 w-100 text-center" id="navbar-text">Team Profiles</span>
        </nav>
    </header>
    
        <main>
        <div class="container">
        <div class="row justify-content-center" id="team-cards">
            ${qnty(objectArray)}
    
        </main>
    
    </body>
    
    </html>
    ` 

    new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', page, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Success'
            });
        });
    });
}