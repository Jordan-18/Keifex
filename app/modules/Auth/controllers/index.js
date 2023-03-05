const Helper = require('../../../helpers/helpers');
const {validationResult} = require('express-validator');
const Auth = require('../models/model');
const User = require('../../User/models/model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');dotenv.config();

const Login = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',errors));
        }else{
            const {user_name, user_password} = req.body;
            const user = await User.findOne({
                where:{
                    user_name: user_name
                }
            });
            if(user){
                const ValidationPassword = await bcryptjs.compare(user_password, user.user_password);
                if(ValidationPassword){
                    Auth.create({ auth_user_id: user.user_id,auth_ip_address : req.ip})
                    const token = jwt.sign({ user_name }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

                    res.setHeader('Authorization', `Bearer ${token}`);
                    
                    res.status(200).json(Helper.ResponseFormatter(res.statusCode,'Login Successfully', token));
                }else{
                    res.status(401).json(Helper.ResponseFormatter(res.statusCode,'Invalid username or password'));
                }
            }else{
                res.status(404).json(Helper.ResponseFormatter(res.statusCode,'User Not Found'));
            }
        }
    } catch (error) {
        res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
    }
}
const Register = async(req, res)=> {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',errors));
        }else{
            const {user_name, user_email, user_password} = req.body;
            User.findOne({
                where:{
                    user_name: user_name,
                    user_email: user_email
                }
            }).then(async function(user){
                if(user){
                    res.status(200).json(Helper.ResponseFormatter(res.statusCode,"Name is Already Taken"));
                }else{
                    var salt = bcryptjs.genSaltSync(10);
                    let hashpassword = await bcryptjs.hash(user_password,salt);

                    let data = {
                        ...req.body,
                        user_password: hashpassword
                    }

                    await User.create(data).then(function(newUser, createuser){
                        if(!newUser){
                            res.status(500).json(Helper.ResponseFormatter(res.statusCode,"Registered Failed"));
                        }else{
                            res.status(200).json(Helper.ResponseFormatter(res.statusCode,"Registered Succesfully"));
                        }
                    })
                }
            })
        }
    } catch (error) {
        res.status(500).json(Helper.ResponseFormatter(res.statusCode,'Error',error));
    }
}

module.exports = {
    Login,
    Register,
}