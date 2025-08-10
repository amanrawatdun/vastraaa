const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String , required:true, 
    },
    brand:{
        type:String , required:true ,
    },
    description:{
        type:String 
    },
    category:{
        type:String ,
    },
    costPrice:{
        type:Number , required:true,
    },
    sellingPrice:{
        type:Number,
    },
    sizes:[{
        type:String ,
    }],
    stock:{
        type:Number , required:true , default:0
    },
    image:{
        url:{
            type:String,
         
        },
        public_id:{
            type:String,
        }
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true}
);

const Product = mongoose.model('Product' , productSchema);

module.exports = Product;
