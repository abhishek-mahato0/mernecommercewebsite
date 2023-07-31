
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5
    },
    category:{
        type:String,
        required:true,
        default:"Cloth",
        min:5
    },
    desc:{
        type:String,
        required:true,
        min:10
    },
    price:{
        type:Number,
        required:true,
        max:1000000
    },
    stock:{
        type:Number,
        required:true,
        max:20,
        default:10
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },
    img:
           {
                type:String,
                required:true
            },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                min:1,
                max:5,
                default:5
            },
            comment:{
                type:String,
                min:5
            }            
        },
    ],
    totalreviews:{
        type:Number,
        default:0
    }
})

const Products = mongoose.model("Product", productSchema);
module.exports = Products