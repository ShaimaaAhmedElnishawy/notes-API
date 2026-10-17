// Handle the core business logic

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (name, email , password)=>{

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error('User already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    await newUser.save();
    return {
        id : newUser._id,
        name : newUser.name,
        email : newUser.email
    };
};

const login = async (email, password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('invalid email or password');
    }

    const isMatch = await bcrypt.compare(password ,user.password);
    if(!isMatch){
        throw new Error('invalid email or password');
    }

    const token = jwt.sign(
        {userId:user._id , email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );

    return {
        token , user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    };
   
};

module.exports = {
    register,
    login
}