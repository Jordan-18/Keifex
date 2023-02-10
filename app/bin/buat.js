#!/usr/bin/env node
const fs = require('fs');
const name = process.argv[2];

const source = 'app/modules/Template'; const destination = 'app/modules/'+name;

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
            })
        })

    })
    console.log(`Successfully, Thanks for Create Module use US`);
})