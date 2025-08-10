const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setUser } = require('../middleware/checkAuth');

//Register a new User
const registerUser = async (req ,res)=>{
    const {name , email , password , isAdmin } = req.body;

    const userExists = await User.findOne({email});

    if(userExists) return res.status(400).json({message :'User already exist'})

    const user = await User.create({
        name ,
        email ,
        password,
        isAdmin
    });

    const token =await setUser(user)
    console.log(token)

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token
        })
    }else{
        res.status(400).json({message:'Invalid user data'});
    }
};


const loginUser = async (req , res)=>{
    const {email , password} = req.body;

    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        const token =await setUser(user)
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:token
        })
    }else{
        res.status(401).json({message:'Invalid email or pasword'});
    }
};



module.exports ={
    registerUser,
    loginUser,

}