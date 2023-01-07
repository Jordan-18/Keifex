const Template = require('../models/TemplateModel')
const {ResponseFormatter} = require('../../../helpers/ResponseFormatter');


const index = async(req, res) => {
    try {
        const response = await Template.findAll();
        res.status(200).json(ResponseFormatter(res.statusCode,"Template Data",response));
    } catch (error) {
        res.status(500).json(ResponseFormatter(res.statusCode,'Error',error));
    }
}

const edit = async(req, res)=> {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    index
}