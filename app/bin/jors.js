#!/usr/bin/env node

const { program } = require('commander');
// const fs = require('fs');
// console.log('tes1');
console.log(process.argv[2]);

program
    .command('greet <name>')
    .description('greet the given name')
    .action(function (name) {
        console.log(`Hello, ${name}!`);
        // const source = 'app/modules/Template';
        // const destination = 'app/modules/'+name;

        // fs.mkdirSync(destination, {recursive:true})

        // fs.readdir(source, (err, files) =>{
        //     if(err){
        //         return console.log('Unable Scan This Directory, Error Message:'+err);
        //     }
        //     files.forEach(file =>{
        //         const sourcePath = `${source}/${file}`;
        //         const destPath = `${destination}/${file}`;

        //         fs.copyFile(sourcePath, destPath, err => {
        //             if(err){
        //                 return console.log('Unable to copy this, Error Message:'+err);
        //             }
        //         })
        //     })
        // })

    })