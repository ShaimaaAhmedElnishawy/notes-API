// Handle incoming HTTP requests , and send responses back to the client

const authService = require('../services/authService');

const register = async (req,res)=>{
    try{
        const {name , email , password} = req.body;
        const result = await authService.register(name , email , password);
        res.status(201).json({
            success:true , 
            message:'registered successfully' , 
            data:result
        });
    }catch(error){
        res.status(400).json({
            success:false , 
            message:error.message
        });
    }
};

const login = async (req, res)=>{
    try{
        const {email , password} = req.body;
        const result = await authService.login(email , password);
        res.status(200).json({
            success:true , 
            message:'logged in successfully' , 
            data:result
        });
    } catch(error){
        res.status(401).json({
            success:false , 
            message:error.message
        });
    }
};

module.exports = {
    register,
    login
};