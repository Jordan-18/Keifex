const express = require('express');
const app = express();
const dotenv = require('dotenv');dotenv.config();
const fs = require('fs');
const listEndpoints = require('express-list-endpoints')
const path = './app/modules';
const Routes = []

app.get('/', async (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            route:listEndpoints(app)
        });
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
})

fs.readdir(path,(err, files) => {
    if (err) {
        console.error(`An error occurred: ${err}`);
        return;
    }
    files.forEach(file => {
        Routes[file] = require('../modules/'+file+'/routes/route.js')
        app.use(Routes[file])
    });
})

module.exports = app