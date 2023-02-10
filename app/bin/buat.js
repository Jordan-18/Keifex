#!/usr/bin/env node
const fs = require('fs');
function capitalize(s){ return s[0].toUpperCase() + s.slice(1);}
const name = capitalize(process.argv[2]);
const nameFile = name.toLowerCase();

const source = 'app/bin/Template'; 
const destination = 'app/modules/'+name;

fs.mkdirSync(destination, {recursive:true})

fs.readdir(source, (err, module) =>{
    if(err) return console.log('Unable Scan This Directory, Error Message:'+err);

    module.forEach(folder =>{
        const sourcePath = `${source}/${folder}`; const destPath = `${destination}/${folder}`;

        fs.mkdirSync(destPath, {recursive:true})

        fs.readdir(sourcePath, (err, file) => {
            const sourceFile = `${sourcePath}/${file}`; const destFile = `${destPath}/${file}`;

            if(err) return console.log('Unable Scan This Directory, Error Message:'+err);

            fs.copyFile(sourceFile, destFile, err => {
                if(err) return console.log('Unable to copy this, Error Message:'+err);

                fs.readFile(destFile, 'utf-8', (err, data) => {
                    if(err) return console.log('Error Message:'+err);
                    let modifiedData = data
                                        .replace(/template_/g, `${nameFile}_`)
                                        .replace(/Template/g, name)
                                        .replace(/template/g, name)
                    if(folder == 'routes'){
                        modifiedData = data.replace(/template/g, nameFile);
                    }

                    fs.writeFile(destFile, modifiedData, (err) => {
                        if(err) return console.log('Error Message:'+err);
                    })
                })
            })
        })

    })
    console.log(`Successfully, Thanks for Create Module use US`);
})