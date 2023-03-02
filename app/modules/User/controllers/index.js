const Helper = require('../../../helpers/helpers');
const {validationResult} = require('express-validator');
const { Op } = require('sequelize');
const User = require('../models/model');

const Get = async(req, res) => {
    try {
        const {page, search, limit, offset} = Helper.GetPaginate(req)
        const response = await User.findAndCountAll({
            where : {
                user_name: { [Op.like]: '%'+search+'%'}
            },  
            offset: offset,
            limit : limit,
            order : [
                ['user_name', 'ASC']
            ]
        })
        
        res.status(200).json(
            Helper.ResponseFormatter(
                res.statusCode,
                "User Data",
                response, 
                page, 
                req
            )
        )
    } catch (error) {
        res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
    }
}
const Show = async(req, res)=> {
    try {
        const {page, search, limit, offset} = Helper.GetPaginate(req)
        const response = await User.findAndCountAll({
            where : {
                user_id : req.params.id,
                user_name: { [Op.like]: '%'+search+'%'}
            },  
            offset: offset,
            limit : limit,
            order : [
                ['user_name', 'ASC']
            ]
        })
        
        res.status(200).json(
            Helper.ResponseFormatter(
                res.statusCode,
                "User Data",
                response, 
                page,
                req
            )
        )
    } catch (error) {
        res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
    }
}
const Store = async(req, res)=> {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(505).json(Helper.ResponseFormatter(res.statusCode,'Errors',errors));
        }else{
            await User.create(req.body)
                .then(function(news, created){
                    if(!news){
                        res.status(500).json(Helper.ResponseFormatter(res.statusCode,"User Input Errors"));
                    }else{
                        res.status(201).json(Helper.ResponseFormatter(res.statusCode,"New User Data Created"));
                    }
            })
        }
    } catch (error) {
        res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
    }
}
const Update = async(req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(505).json(Helper.ResponseFormatter(res.statusCode,'Errors',errors));
        }else{
            User.findOne({
                where : {
                    user_id : req.params.id
                }
            }).then(async function(Users){
                if(Users){
                    await User.update(req.body,{
                        where : {
                            user_id : req.params.id
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
const Destroy = async(req, res)=>{
    try {
        const response = await User.findOne({
            where : {
                user_id : req.params.id
            }
        }).then(async function(Users){
            if(Users){
                await User.destroy({
                    where : {
                        user_id : req.params.id
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

module.exports = {
    Get,
    Show, 
    Store, 
    Update, 
    Destroy
}