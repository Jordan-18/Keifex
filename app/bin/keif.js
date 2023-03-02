#!/usr/bin/env node
const fs = require('fs');
const Modules = 'app/modules';
if(process.argv[2] == undefined){
    console.log('give command');
    return 
}
if(process.argv[3] == undefined){
    console.log('Choose a module :');
    fs.readdir(Modules, (err, dir) => {
        console.log(dir);
    })
    return 
}

function capitalize(s){ return s[0].toUpperCase() + s.slice(1);}
const Command = process.argv[2]
const name = capitalize(process.argv[3])
const source = 'app/bin/Template'; 
const nameFile = name.toLowerCase(); 
const destination = 'app/modules/'+name;

switch (Command) {
    case 'buat':
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
        break;
    case 'hapus':
        console.log('function Delete not exists');
        break
    case 'migrate' :
        if(process.argv[3] == 'all'){
            console.log(process.argv[3]);
        }

        if(process.argv[3] != 'all'){
            if(process.argv[4] != undefined){
                const MigrateCommand = (process.argv[4]).toLowerCase()
                const query = require(destination+'/models/query')
            }else{
                console.log('give command Complately !!!');
                console.log('Like : up, down ...');
            }
        }
        

        break;
    default:
        console.log('function not exists');
        break;
}