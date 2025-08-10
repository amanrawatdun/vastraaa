const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String ,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password , 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword , this.password);
}

const User = mongoose.model('User' , userSchema);

module.exports = User;