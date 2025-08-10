const { getUser } = require("./checkAuth");

const authMiddleware = async(req ,res ,next)=>{

    let token = req.headers.authorization?.split(' ')[1];
    
   
    if(token){
        try {
           
            const user = await getUser(token);
          
            req.user = user
            next();
        } catch (error) {
            res.status(401).json({message:'Not authorized , no token'});
        }
    }
};

const adminMiddleware = (req , res ,next)=>{
    
    if(req .user?.isAdmin){
        next();
    }else{
        res.status(403).json({message:'Admin access only'});
    }
};

module.exports ={
    authMiddleware,
    adminMiddleware
}
