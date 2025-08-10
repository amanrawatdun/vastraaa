const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const secret = process.env.JWT_SECRET;

const setUser = async ({_id , email , isAdmin})=>{

    const token =await jwt.sign({_id  ,email , isAdmin} , secret , {expiresIn:'7d'} );
    return token
}

const getUser =async (token)=>{
 
    const user =await jwt.verify(token , secret);

    return user;
}

module.exports={
    setUser,
    getUser
}
