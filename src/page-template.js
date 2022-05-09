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
    <div class="card">
                <div class="card-head">
                    <div class="card-name"> ${name} </div>
                    <div class="card-title"> ${passedVariables.constructor.name} </div>
                </div>
                <div class="card-body">
                    <div class="id">ID: ${id}</div>
                    <div class="email">Email: <a href="mailto:${email}">${email}</a></div>
                    <div class="variable">${variable}</div>
                </div>
            </div>
    `
}

function qnty(objectArray) {

    let ret = '' 
    console.log(objectArray)

    for (i = 0; i < objectArray.length; i++) {
        ret += employee(objectArray[i])
    }
    return ret;
}

module.exports = function (objectArray) {

    let page = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generator</title>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <body>
    
        <header>
            Team Profile
        </header>
    
        <main>
            
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