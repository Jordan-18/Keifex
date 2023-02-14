const {Helpers} = require('../../../helpers/helpers');
const Helper = new Helpers();
const { Op } = require('sequelize');
const {validationResult} = require('express-validator');
const Auth = require('../models/model');

class Controllers{
    index = async(req, res) => {
        try {
            const {page, search, limit, offset} = Helper.GetPaginate(req)
            const response = await Auth.findAndCountAll({
                where : {
                    auth_name: { [Op.like]: '%'+search+'%'}
                },  
                offset: offset,
                limit : limit,
                order : [
                    ['auth_name', 'ASC']
                ]
            })
            
            res.status(200).json(
                Helper.ResponseFormatter(
                    res.statusCode,
                    "Auth Data",
                    response, 
                    page, 
                    req
                )
            )
        } catch (error) {
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
        }
    }
    edit = async(req, res)=> {
        try {
            const {page, search, limit, offset} = Helper.GetPaginate(req)
            const response = await Auth.findAndCountAll({
                where : {
                    auth_id : req.params.id,
                    auth_name: { [Op.like]: '%'+search+'%'}
                },  
                offset: offset,
                limit : limit,
                order : [
                    ['auth_name', 'ASC']
                ]
            })
            
            res.status(200).json(
                Helper.ResponseFormatter(
                    res.statusCode,
                    "Auth Data",
                    response, 
                    page,
                    req
                )
            )
        } catch (error) {
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
        }
    }
    store = async(req, res)=> {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(505).json(Helper.ResponseFormatter(res.statusCode,'Errors',errors));
            }else{
                await Auth.create(req.body)
                    .then(function(news, created){
                        if(!news){
                            res.status(500).json(Helper.ResponseFormatter(res.statusCode,"Auth Input Errors"));
                        }else{
                            res.status(201).json(Helper.ResponseFormatter(res.statusCode,"New Auth Data Created"));
                        }
                })
            }
        } catch (error) {
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
        }
    }
    update = async(req, res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(505).json(Helper.ResponseFormatter(res.statusCode,'Errors',errors));
            }else{
                Auth.findOne({
                    where : {
                        auth_id : req.params.id
                    }
                }).then(async function(Auths){
                    if(Auths){
                        await Auth.update(req.body,{
                            where : {
                                auth_id : req.params.id
                            }
                        }).then(function(newData, createData){
                            if(!newData){
                                res.status(505).json(Helper.ResponseFormatter(res.statusCode,'Errors',newData));
                            }else{
                                res.status(201).json(Helper.ResponseFormatter(
                                    res.statusCode,
                                    'Updated Data',
                                ));
                            }
                        })
                    }else{
                        res.status(404).json(Helper.ResponseFormatter(res.statusCode,'Data Not Found'));
                    }
                })
            }
        } catch (error) {
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
        }
    }
    delete = async(req, res)=>{
        try {
            const response = await Auth.findOne({
                where : {
                    auth_id : req.params.id
                }
            }).then(async function(Auths){
                if(Auths){
                    await Auth.destroy({
                        where : {
                            auth_id : req.params.id
                        }
                    }).then(function(deletedData){
                        if(!deletedData){
                            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Errors',deletedData));
                        }else{
                            res.json(Helper.ResponseFormatter(res.statusCode,"Data Has Deleted"));
                        }
                    })
                }else{
                    res.status(404).json(Helper.ResponseFormatter(res.statusCode,'Data Not Found'));
                }
            })
        } catch (error) {
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
        }
    } 
}

module.exports = Controllers