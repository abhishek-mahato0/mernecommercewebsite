const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    shippingInfo:{
            fullname:{
                type:String,
                required:true
                },
            city:{
                    type:String,
                    required:true
                    },
            phone:{
                    type:Number,
                    required:true
                        },
            address:{
                type:String,
                required:true
                },
    },
    cart:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            name:{
                type:String,
                required:true
                },
            img:{
                    type:String,
                    required:true
                    },
            price:{
                    type:Number,
                    required:true
                   },
            qty:{
                type:Number,
                required:true
            },
        }
        
    ],
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"processing"

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:String,
        default:new Date()
    }

})

const Orders = mongoose.model("Order", orderSchema);
module.exports = Orders